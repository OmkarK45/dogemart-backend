import { Router } from 'express'
import { z } from 'zod'
import { validateRequestBody } from 'zod-express-middleware'
import { prisma } from '../config/db'
import { CustomResponse, ExpressRequest } from '../config/express'
import { requireAuth } from '../middlewares/AuthMiddleware'
import { CartStatus, HttpStatus, ProductStatus } from '../utils/statusCodes'

const router = Router()

// All are routes for user cart
router.get(
	'/',
	requireAuth,
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user

		try {
			const cart = await prisma.cart.findFirst({
				where: {
					user_id: user?.id,
				},
				include: {
					product: true,
				},
			})

			// Your cart is empty!
			res.json({
				success: true,
				data: cart,
				code: 'SUCCESS',
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
		const { productId, quantity } = req.body

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
			let cart
			cart = await prisma.cart.findFirst({
				where: {
					user_id: user?.id,
				},
			})

			if (!cart) {
				// create cart
				cart = await prisma.cart.create({
					data: {
						user: { connect: { id: user?.id } },
						product: { connect: { id: productId } },
						quantity: quantity,
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
				// update cart
				const updatedCart = await prisma.cart.update({
					where: { id: cart.id },
					data: {
						quantity: cart.quantity + quantity,
						product: { connect: { id: productId } },
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

			const cart = await prisma.cart.findFirst({
				where: {
					user_id: user?.id,
				},
			})

			if (!cart) {
				return res.json({
					success: false,
					data: { message: 'Your cart is empty.' },
					code: CartStatus.CART_NOT_FOUND,
				})
			}

			const productInCart = await prisma.cart.findFirst({
				where: {
					user_id: user?.id,
					product_id: productId,
				},
			})

			if (!productInCart) {
				return res.json({
					success: false,
					data: { message: 'Product was not found in cart' },
					code: CartStatus.CART_NOT_FOUND,
				})
			}

			const deletedProduct = await prisma.cart.update({
				where: {
					user_id_product_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
				data: {
					product: {
						disconnect: true,
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
