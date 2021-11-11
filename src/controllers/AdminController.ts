import { Router } from 'express'
import { prisma } from '../config/db'

import { CustomResponse, ExpressRequest } from '../config/express'
import { requireAuth } from '../middlewares/AuthMiddleware'
import {
	validateRequestBody,
	validateRequestParams,
	validateRequest,
} from 'zod-express-middleware'

import { z } from 'zod'
import { isAdmin } from '../utils/validateAdmin'

const router = Router()

const ProductAddInput = z.object({
	title: z.string(),
	description: z.string(),
	price: z.number(),
	stock: z.number(),
	images: z.array(z.string()),
	brand: z.string().optional(),
})
type ProductAddInputType = z.infer<typeof ProductAddInput>

router.post(
	'/create',
	requireAuth,
	validateRequestBody(ProductAddInput),
	async (req: ExpressRequest, res: CustomResponse) => {
		const input = req.body as ProductAddInputType
		const user = req.user

		try {
			if (user?.role === 'USER')
				throw new Error('Your role is not sufficient to do that.')

			const newProduct = await prisma.product.create({
				data: {
					title: input.title,
					description: input.description,
					price: input.price,
					stock: input.stock,
					images: input.images,
					excerpt: input.description.slice(0, 100),
					brand: input.brand,
					user: {
						connect: {
							id: user?.id,
						},
					},
				},
			})

			res.json({
				code: 'SUCCESS',
				success: true,
				data: {
					product: newProduct,
				},
			})
		} catch (e: any) {
			console.log(
				`[Error] : File - Product Controller, Function : /add [post]`,
				e.message
			)
			return res.status(500).json({
				code: 'INTERNAL_ERROR',
				success: false,
				data: e.message,
			})
		}
	}
)

const EditProductParams = z.object({ id: z.string() })
const EditProductBody = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	price: z.number().optional(),
	stock: z.number().optional(),
	images: z.array(z.string()).optional(),
})

router.post(
	'/edit/:id',
	requireAuth,
	validateRequest({
		body: EditProductBody,
		params: EditProductParams,
	}),
	async (req: ExpressRequest, res: CustomResponse) => {
		const productId = req.params.id
		const input = req.body as z.infer<typeof EditProductBody>

		try {
			const updatedProduct = await prisma.product.update({
				where: { id: productId },
				data: {
					title: input.title,
					description: input.description,
					stock: input.stock,
					images: input.images,
					price: input.price,
				},
			})
			if (!updatedProduct) {
				return res.json({
					code: 'NOT_FOUND',
					success: false,
					data: {
						message: 'Requested product was not found on the server',
					},
				})
			}
			res.status(200).json({
				code: 'SUCCESS',
				success: true,
				data: {
					product: updatedProduct,
				},
			})
		} catch (e: any) {
			console.log(
				`[Error] : File - Product Controller, Function : /add [post]`,
				e.message
			)
			return res.status(500).json({
				code: 'INTERNAL_ERROR',
				success: false,
			})
		}
	}
)

router.post(
	'/delete',
	requireAuth,
	validateRequest({
		body: z.object({
			id: z.string(),
		}),
	}),
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const { id } = req.body

		if (!user) {
			return res.json({
				code: 'UNAUTHORIZED',
				success: false,
				data: {
					message: 'You are allowed to do that.',
				},
			})
		}
		try {
			if (user.role !== 'ADMIN')
				throw new Error('You are not authorized to do that.')

			// Delete a product
			await prisma.product.delete({
				where: { id },
			})
		} catch (e: any) {
			console.log(
				`[Error] : File - Product Controller, Function : /add [post]`,
				e.message
			)
			return res.status(500).json({
				code: 'INTERNAL_ERROR',
				success: false,
				data: e.message,
			})
		}
	}
)

export { router as AdminController }
