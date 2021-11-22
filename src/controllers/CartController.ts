import { Router } from 'express'
import { z } from 'zod'
import { validateRequestBody } from 'zod-express-middleware'
import { prisma } from '../config/db'
import { CustomResponse, ExpressRequest } from '../config/express'
import { requireAuth } from '../middlewares/AuthMiddleware'
import {
	generatePaginationResult,
	getPaginationArgs,
} from '../utils/prismaPaginationArgs'
import {
	CartStatus,
	HttpStatus,
	ProductStatus,
	WishlistStatus,
} from '../utils/statusCodes'

const router = Router()

// All are routes for user cart
router.get(
	'/',
	requireAuth,
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const args = getPaginationArgs(req)

		try {
			const totalCount = await prisma.cart.count({
				where: { user: { id: user?.id } },
			})

			const cart = await prisma.cart.findMany({
				where: { user_id: user?.id },
				include: { product: true },
				// This is not working as expected
				skip: args.startIndex,
				take: args.limit,
			})
			console.log(cart)
			const pageInfo = generatePaginationResult({
				...args,
				totalCount,
			})

			res.status(200).json({
				pageInfo,
				code: HttpStatus.SUCCESS,
				success: true,
				data: cart ? cart : [],
			})
		} catch (e: any) {
			res.json({
				success: false,
				data: e.message,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
			})
		}
	}
)

const AddToCartInput = z.object({
	productId: z.string(),
	quantity: z.number(),
})
// add product to cart
router.post(
	'/add',
	requireAuth,
	validateRequestBody(AddToCartInput),
	async (req: ExpressRequest, res: CustomResponse) => {
		// add product to cart
		const user = req.user
		const { productId, quantity, size, color } = req.body

		try {
			const product = await prisma.product.findFirst({
				where: { id: productId },
			})

			if (!product) {
				res.json({
					success: false,
					data: { message: 'Product was not found on the server' },
					code: ProductStatus.PRODUCTS_NOT_FOUND,
				})
			}

			const cart = await prisma.cart.findMany({
				where: {
					user_id: user?.id,
				},
			})

			if (!cart || cart.length === 0) {
				// create cart
				const cart = await prisma.cart.create({
					data: {
						user: { connect: { id: user?.id } },
						product: { connect: { id: productId } },
						quantity: quantity,
						size,
						color,
					},
				})

				res.json({
					success: true,
					data: cart,
					code: HttpStatus.SUCCESS,
				})
			} else {
				// check if product is already in cart
				const productInCart = await prisma.cart.findUnique({
					where: {
						user_id_product_id: {
							user_id: user!.id,
							product_id: productId,
						},
					},
				})

				if (productInCart) {
					return res.json({
						success: false,
						data: 'Product already in cart',
						code: CartStatus.PRODUCT_ALREADY_IN_CART,
					})
				}
				//create new cart item
				const updatedCart = await prisma.cart.create({
					data: {
						product: { connect: { id: productId } },
						user: { connect: { id: user?.id } },
						quantity,
						size,
						color,
					},
				})

				res.json({
					success: true,
					data: updatedCart,
					code: CartStatus.PRODUCT_ADDED_TO_CART,
				})
			}
		} catch (e: any) {
			res.json({
				success: false,
				data: e.message,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
			})
		}
	}
)

const RemoveProductInput = z.object({
	productId: z.string(),
})
// Remove product from cart
router.post(
	'/remove',
	requireAuth,
	validateRequestBody(RemoveProductInput),
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const { productId } = req.body

		try {
			const product = await prisma.product.findFirst({
				where: { id: productId },
			})

			if (!product) {
				return res.json({
					success: false,
					data: { message: 'Product was not found on the server' },
					code: ProductStatus.PRODUCT_NOT_FOUND,
				})
			}

			const cart = await prisma.cart.findMany({
				where: {
					user_id: user?.id,
				},
			})

			if (!cart || cart.length === 0) {
				return res.json({
					success: false,
					data: { message: 'Your cart is empty.' },
					code: CartStatus.CART_NOT_FOUND,
				})
			}

			const productInCart = await prisma.cart.findUnique({
				where: {
					user_id_product_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
			})

			if (!productInCart) {
				return res.json({
					success: false,
					data: { message: 'Product was not found in cart' },
					code: CartStatus.CART_NOT_FOUND,
				})
			}

			await prisma.cart.delete({
				where: {
					user_id_product_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
			})

			res.json({
				success: true,
				data: { message: 'Product has been removed from your cart.' },
				code: CartStatus.PRODUCT_REMOVED_FROM_CART,
			})
		} catch (e: any) {
			res.json({
				success: false,
				data: e.message,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
			})
		}
	}
)

export { router as CartController }
