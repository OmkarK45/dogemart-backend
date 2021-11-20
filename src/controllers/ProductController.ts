import { prisma } from '../config/db'
import { Router } from 'express'
import { CustomResponse } from '../config/express'
import {
	validateRequestBody,
	validateRequestParams,
} from 'zod-express-middleware'
import { z } from 'zod'
import { HttpStatus, ProductStatus } from '../utils/statusCodes'
import {
	generatePaginationResult,
	getPaginationArgs,
} from '../utils/prismaPaginationArgs'

// Handler to get all products

const router = Router()
// /api/products

router.get('/all', async (req, res: CustomResponse) => {
	const { orderBy } = req.query as {
		orderBy: 'asc' | 'desc'
		category: string
	}
	const args = getPaginationArgs(req)

	const totalCount = await prisma.product.count()

	const pageInfo = generatePaginationResult({
		...args,
		totalCount,
	})

	try {
		const data = await prisma.product.findMany({
			where: {},
			include: {
				_count: { select: { reviews: true } },
				reviews: { select: { rating: true } },
				category_group: {
					include: {
						category: true,
					},
				},
			},
			take: args.limit,
			skip: args.startIndex,
			orderBy: {
				created_at: orderBy ? orderBy : 'desc',
			},
		})

		res.json({
			pageInfo,
			code: 'SUCCESS',
			success: true,
			data,
		})
	} catch (e: any) {
		res.json({
			code: HttpStatus.INTERNAL_SERVER_ERROR,
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
				_count: { select: { reviews: true } },
				reviews: {
					include: {
						user: {
							select: {
								name: true,
							},
						},
					},
				},
				category_group: {
					include: {
						category: true,
					},
				},
			},
		})
		if (!product) {
			return res.json({
				code: ProductStatus.PRODUCT_NOT_FOUND,
			})
		}
		res.json({
			code: HttpStatus.SUCCESS,
			success: true,
			data: product,
		})
	} catch (e: any) {
		res.json({
			code: HttpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			data: e.message,
		})
	}
})

const SearchInput = z.object({
	keyword: z.string(),
})
// get search result
router.post(
	'/search',
	validateRequestBody(SearchInput),
	async (req, res: CustomResponse) => {
		const { keyword } = req.body
		const args = getPaginationArgs(req)

		const { skip, take } = req.query as { skip: string; take: string }

		try {
			const totalCount = await prisma.product.count({
				where: {
					OR: [
						{ description: { contains: keyword, mode: 'insensitive' } },
						{ title: { contains: keyword, mode: 'insensitive' } },
						{ excerpt: { contains: keyword, mode: 'insensitive' } },
					],
				},
			})

			const pageInfo = generatePaginationResult({
				...args,
				totalCount,
			})

			const products = await prisma.product.findMany({
				where: {
					OR: [
						{ description: { contains: keyword, mode: 'insensitive' } },
						{ title: { contains: keyword, mode: 'insensitive' } },
						{ excerpt: { contains: keyword, mode: 'insensitive' } },
						{ brand: { contains: keyword, mode: 'insensitive' } },
					],
				},
				include: {
					reviews: true,
					category_group: { include: { category: true } },
				},
				take: args.limit,
				skip: args.startIndex,
			})

			res.json({
				pageInfo,
				code: 'SUCCESS',
				success: true,
				data: products,
			})
		} catch (e: any) {
			res.json({
				code: HttpStatus.INTERNAL_SERVER_ERROR,
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
			code: HttpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			data: e.message,
		})
	}
})

router.get('/super/mega/test', async (req, res) => {
	const args = getPaginationArgs(req)
	const totalCount = await prisma.product.count()

	const data = await prisma.product.findMany({
		take: args.limit,
		skip: args.startIndex,
		orderBy: {
			id: 'desc',
		},
	})

	const pageInfo = generatePaginationResult({
		...args,
		totalCount,
	})

	res.json({
		pageInfo,
		data,
	})
})

export { router as ProductController }
