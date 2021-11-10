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
	name: z.string(),
	description: z.string(),
	price: z.number(),
	stocks: z.number(),
	images: z.array(z.string()),
	inStock: z.boolean(),
	category: z.object({
		id: z.string().optional(),
		name: z.string().optional(),
	}),
})
type ProductAddInputType = z.infer<typeof ProductAddInput>

router.post(
	'/add',
	requireAuth,
	validateRequestBody(ProductAddInput),
	async (req: ExpressRequest, res: CustomResponse) => {
		const input = req.body as ProductAddInputType
		const user = req.user

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
			const hasRights = await isAdmin(user?.email)
			if (!hasRights) {
				return res.json({
					code: 'UNAUTHORIZED',
					success: false,
					data: {
						message: 'You are allowed to do that.',
					},
				})
			}

			const newProduct = await prisma.product.create({
				data: {
					name: input.name,
					description: input.description,
					price: input.price,
					stocks: input.stocks,
					images: input.images,
					category: {
						connectOrCreate: {
							create: {
								name: input.category.name
									? input.category.name
									: 'DEFAULT_CATEGORY',
							},
							where: {
								id: input.category.id,
							},
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
			})
		}
	}
)

const EditProductParams = z.object({ id: z.string() })
const EditProductBody = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	price: z.number().optional(),
	stocks: z.number().optional(),
	images: z.array(z.string()).optional(),
	inStock: z.boolean().optional(),
	category: z
		.object({
			id: z.string().optional(),
			name: z.string().optional(),
		})
		.optional(),
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
					name: input.name,
					description: input.description,
					inStock: input.inStock,
					images: input.images,
					price: input.price,
					stocks: input.stocks,
					category: {
						update: {
							id: input.category?.id,
							name: input.category?.name,
						},
					},
				},
				include: {
					category: true,
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
			const hasRights = await isAdmin(user?.email)
			if (!hasRights) {
				return res.json({
					code: 'UNAUTHORIZED',
					success: false,
					data: {
						message: 'You are allowed to do that.',
					},
				})
			}
			// First remove from the cart of the user
			await prisma.cartProduct.delete({
				where: {
					productId: id,
				},
			})
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
			})
		}
	}
)

export { router as AdminController }
