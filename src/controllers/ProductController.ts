import { prisma } from '../config/db'
import { Router } from 'express'
import { CustomResponse } from '../config/express'
import {
	validateRequestBody,
	validateRequestParams,
} from 'zod-express-middleware'
import { z } from 'zod'

// Handler to get all products

const router = Router()
// /api/products

router.get('/all', async (req, res: CustomResponse) => {
	const { skip, take, orderBy } = req.query as {
		skip: string
		take: string
		orderBy: 'asc' | 'desc'
		category: string
	}

	try {
		const products = await prisma.product.findMany({
			where: {},
			include: {
				_count: true,
				comments: true,
				ratings: true,
				category_group: {
					include: {
						category: true,
					},
				},
			},
			skip: skip ? parseInt(skip) : 0,
			take: take ? parseInt(take) : 10,
			orderBy: {
				created_at: orderBy ? orderBy : 'desc',
			},
		})
		res.json({
			code: 'SUCCESS',
			success: true,
			data: products,
		})
	} catch (e: any) {
		res.json({
			code: 'INTERNAL_ERROR',
			success: false,
			data: e.message,
		})
	}
})

const OneProductInput = z.object({
	id: z.string(),
})
router.get('/:id', validateRequestParams(OneProductInput), async (req, res) => {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id: req.params.id,
			},
			include: {
				comments: true,
				ratings: true,
				category_group: {
					include: {
						category: true,
					},
				},
			},
		})
		if (!product) throw new Error('Requested product not found on the server.')
		res.json({
			code: 'SUCCESS',
			success: true,
			data: product,
		})
	} catch (e: any) {
		res.json({
			code: 'INTERNAL_ERROR',
			success: false,
			data: e.message,
		})
	}
})

const SearchInput = z.object({
	keyword: z.string(),
})
// get search result
router.get(
	'/search',
	validateRequestBody(SearchInput),
	async (req, res: CustomResponse) => {
		const { keyword } = req.body
		const { skip, take } = req.query as { skip: string; take: string }

		try {
			const products = await prisma.product.findMany({
				where: {
					OR: [
						{ description: { contains: keyword.toLowerCase() } },
						{ title: { contains: keyword.toLowerCase() } },
						{ excerpt: { contains: keyword.toLowerCase() } },
					],
				},
				include: {
					comments: true,
					ratings: true,
					category_group: { include: { category: true } },
				},
				skip: skip ? parseInt(skip) : 0,
				take: take ? parseInt(take) : 10,
			})

			res.json({
				code: 'SUCCESS',
				success: true,
				data: products,
			})
		} catch (e: any) {
			res.json({
				code: 'INTERNAL_ERROR',
				success: false,
				data: e.message,
			})
		}
	}
)

router.get('/all/category', async (req, res: CustomResponse) => {
	const { category_name, take, skip } = req.query as {
		category_name: string
		take: string
		skip: string
	}

	try {
		const products = await prisma.category.findMany({
			where: { category_name },
			take: take ? parseInt(take) : 10,
			skip: skip ? parseInt(skip) : 0,
			include: {
				category_group: {
					include: { product: true },
				},
			},
		})

		res.json({
			code: 'SUCCESS',
			success: true,
			data: products,
		})
	} catch (e: any) {
		res.json({
			code: 'INTERNAL_ERROR',
			success: false,
			data: e.message,
		})
	}
})

export { router as ProductController }