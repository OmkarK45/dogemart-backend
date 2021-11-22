import { Router } from 'express'
import { CustomResponse, ExpressRequest } from '../config/express'

import { prisma } from '../config/db'
import { requireAuth } from '../middlewares/AuthMiddleware'
import { HttpStatus, WishlistStatus } from '../utils/statusCodes'
import { validateRequestBody } from 'zod-express-middleware'
import { z } from 'zod'
import {
	generatePaginationResult,
	getPaginationArgs,
} from '../utils/prismaPaginationArgs'

const router = Router()

// get user whishlist
router.get(
	'/',
	requireAuth,
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const args = getPaginationArgs(req)

		try {
			const totalCount = await prisma.wishlist.count({
				where: {
					user_id: user?.id,
				},
			})

			const wishlist = await prisma.wishlist.findMany({
				where: {
					user_id: user?.id,
				},
				include: {
					product: true,
				},
				skip: args.startIndex,
				take: args.limit,
			})

			const pageInfo = generatePaginationResult({
				...args,
				totalCount,
			})

			res.status(200).json({
				pageInfo,
				code: WishlistStatus.WISHLIST_FOUND,
				success: true,
				data: wishlist ? wishlist : [],
			})
		} catch (e: any) {
			res.status(500).json({
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false,
				data: {
					message: e.message,
				},
			})
		}
	}
)

const AddToWishlistInput = z.object({
	productId: z.string(),
})
// add a product to wishlist
router.post(
	'/add',
	requireAuth,
	validateRequestBody(AddToWishlistInput),
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const { productId, size, color } = req.body

		try {
			const isAlreadyInWishlist = await prisma.wishlist.findUnique({
				where: {
					user_id_product_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
			})

			if (isAlreadyInWishlist) {
				return res.json({
					data: {
						message: 'Product already in your wishlist.',
					},
					code: WishlistStatus.PRODUCT_ALREADY_IN_WISHLIST,
					success: true,
				})
			} else {
				const newWishlist = await prisma.wishlist.create({
					data: {
						product: { connect: { id: productId } },
						user: { connect: { id: user!.id } },
						wishlist_name: `${user?.id}-wishlist`,
						size,
						color,
					},
				})

				res.status(200).json({
					code: WishlistStatus.PRODUCT_ADDED_TO_WISHLIST,
					success: true,
					data: {
						wishlist: newWishlist,
					},
				})
			}
		} catch (e: any) {
			console.log(e.message)
			res.status(500).json({
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false,
				data: {
					message: e.message,
				},
			})
		}
	}
)

router.post(
	'/remove',
	requireAuth,
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const { productId } = req.body

		try {
			const product = await prisma.product.findUnique({
				where: { id: productId },
			})
			if (!product) throw new Error('Product not found')

			const wishlist = await prisma.wishlist.delete({
				where: {
					user_id_product_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
			})

			res.status(200).json({
				code: WishlistStatus.PRODUCT_REMOVED_FROM_WISHLIST,
				success: true,
				data: {
					wishlist,
				},
			})
		} catch (e: any) {
			console.log(e.message)
			res.status(500).json({
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false,
				data: {
					message: e.message,
				},
			})
		}
	}
)

export { router as WishlistController }
