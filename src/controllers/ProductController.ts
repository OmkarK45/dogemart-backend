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
				reviews: true,
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
				reviews: true,
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
		const { skip, take } = req.query as { skip: string; take: string }

		try {
			const products = await prisma.product.findMany({
				where: {
					OR: [
						{ description: { contains: keyword, mode: 'insensitive' } },
						{ title: { contains: keyword, mode: 'insensitive' } },
						{ excerpt: { contains: keyword, mode: 'insensitive' } },
					],
				},
				include: {
					reviews: true,
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

router.get('/test/test', async (req, res: any) => {
	const query = req.query
	const page = parseInt(query.page as string) || 1
	const limit = parseInt(query.limit as string) || 2
	const last_page = req.query.last_page
	const startIndex = (page - 1) * limit
	const endIndex = page * limit
	const result = {} as any
	const totalCount = await prisma.product.count()
	const totalPage = Math.ceil(totalCount / limit)
	const currentPage = page || 0
	try {
		if (page < 0) {
			return res.status(400).json('Page value should not be negative')
		} else if (page === 1 && !last_page) {
			result.totalCount = totalCount
			result.totalPage = totalPage
			result.currentPage = currentPage
			result.next = {
				page: page + 1,
				limit: limit,
			}
			result.paginateData = await prisma.product.findMany({
				take: limit,
				skip: startIndex,
				orderBy: {
					id: 'desc',
				},
			})
			res.paginatedResult = result
			result.currentCountPerPage = Object.keys(result.paginateData).length
			result.range = currentPage * limit
			return result
			return res.status(200).json(result)
		} else if (endIndex < totalCount && !last_page) {
			result.totalCount = totalCount
			result.totalPage = totalPage
			result.currentPage = currentPage
			result.next = {
				page: page + 1,
				limit: limit,
			}
			result.paginateData = await prisma.product.findMany({
				take: limit,
				skip: startIndex,
				orderBy: {
					id: 'desc',
				},
			})
			res.paginatedResult = result
			result.currentCountPerPage = Object.keys(result.paginateData).length
			result.range = currentPage * limit
			return res.status(200).json(result)
		} else if (startIndex > 0 && !last_page) {
			result.totalCount = totalCount
			result.totalPage = totalPage
			result.currentPage = currentPage
			result.previous = {
				page: page - 1,
				limit: limit,
			}
			result.paginateData = await prisma.product.findMany({
				take: limit,
				skip: startIndex,
				orderBy: {
					id: 'desc',
				},
			})
			res.paginatedResult = result
			result.currentCountPerPage = Object.keys(result.paginateData).length
			result.range = currentPage * limit
			return res.status(200).json(result)
		} else if (last_page === 'true' && page === totalPage) {
			result.totalCount = totalCount
			result.totalPage = totalPage
			result.currentPage = totalPage
			result.last = {
				page: totalPage,
				limit: limit,
			}
			result.paginateData = await prisma.product.findMany({
				take: limit,
				skip: startIndex,
				orderBy: {
					id: 'desc',
				},
			})
			res.paginatedResult = result
			result.currentCountPerPage = Object.keys(result.paginateData).length
			result.range = totalCount
			return res.status(200).json(result)
		} else {
			return res.status(404).json({ error: 'Resource not found' })
		}
	} catch (err) {
		console.error('error', err)
		return res.status(500).json(err)
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

	const paginationArgs = generatePaginationResult({
		...args,
		totalCount,
	})
	res.json({
		paginationArgs,
		data,
	})
})

export { router as ProductController }
