import { Router } from 'express'
import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'
import { prisma } from '../config/db'
import { CustomResponse, ExpressRequest } from '../config/express'
import { requireAuth } from '../middlewares/AuthMiddleware'
import { HttpStatus, ReviewStatus } from '../utils/statusCodes'

const router = Router()

// fetch reviews on a product
router.get(
	'/:productId',
	validateRequest({
		params: z.object({
			productId: z.string(),
		}),
	}),
	async (req, res: CustomResponse) => {
		const productId = req.params.productId
		try {
			const reviews = await prisma.review.findMany({
				where: { product: { id: productId } },
				include: { user: true },
			})
			res.json({
				code: ReviewStatus.REVIEW_FOUND,
				data: reviews,
				success: true,
			})
		} catch (e) {
			res.json({
				code: ReviewStatus.REVIEW_NOT_FOUND,
				success: false,
			})
		}
	}
)

// add a review on product
router.post(
	'/:productId/add',
	requireAuth,
	validateRequest({
		params: z.object({ productId: z.string() }),
		body: z.object({
			comment: z.string().max(500),
			rating: z.number().max(5).min(1),
		}),
	}),
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const productId = req.params.productId
		const { comment, rating } = req.body

		try {
			const productReviewCount = await prisma.review.count({
				where: { product: { id: productId } },
			})

			const isAlreadyReviewed = await prisma.review.findUnique({
				where: {
					product_id_user_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
				include: {
					product: {
						select: {
							rating: true,
						},
					},
				},
			})

			if (isAlreadyReviewed) {
				return res.json({
					code: ReviewStatus.ALREADY_REVIEWED,
					success: false,
					data: {
						message: 'You have already reviewed this product.',
					},
				})
			}

			const review = await prisma.review.create({
				data: {
					product: { connect: { id: productId } },
					user: { connect: { id: user?.id } },
					comment,
					rating,
				},
				include: {
					product: { select: { rating: true } },
				},
			})

			const previousRatings = review.product.rating

			const newAverageRating =
				(previousRatings + rating) / (productReviewCount + 1)

			await prisma.product.update({
				where: { id: productId },
				data: {
					rating: { set: newAverageRating },
				},
			})

			console.log('NEW AVERAGE RATING', newAverageRating)

			res.json({
				code: ReviewStatus.REVIEW_ADDED,
				data: review,
				success: true,
			})
		} catch (e) {
			res.json({
				code: ReviewStatus.REVIEW_NOT_ADDED,
				success: false,
			})
		}
	}
)

// Edit my review of a product
router.post(
	'/:productId/edit',
	requireAuth,
	validateRequest({
		params: z.object({ productId: z.string() }),
		body: z.object({
			comment: z.string().max(500),
			rating: z.number().max(5).min(1),
		}),
	}),
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const productId = req.params.productId
		const { comment, rating } = req.body

		try {
			const isOwnerOfReview = await prisma.review.findUnique({
				where: {
					product_id_user_id: {
						user_id: user!.id,
						product_id: productId,
					},
				},
			})

			if (!isOwnerOfReview) {
				return res.json({
					code: HttpStatus.FORBIDDEN,
					success: false,
					data: 'You cannot edit reviews which are not yours.',
				})
			}

			const review = await prisma.review.update({
				where: {
					product_id_user_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
				data: {
					comment,
					rating,
				},
			})
			res.json({
				code: ReviewStatus.REVIEW_EDITED,
				data: review,
				success: true,
			})
		} catch (e) {
			res.json({
				code: ReviewStatus.REVIEW_NOT_EDITED,
				success: false,
			})
		}
	}
)

// Delete my review of a product
router.post(
	'/:productId/delete',
	requireAuth,
	validateRequest({
		params: z.object({ productId: z.string() }),
	}),
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const productId = req.params.productId

		try {
			const isOwnerOfReview = await prisma.review.findUnique({
				where: {
					product_id_user_id: {
						user_id: user!.id,
						product_id: productId,
					},
				},
			})

			if (!isOwnerOfReview) {
				return res.json({
					code: HttpStatus.FORBIDDEN,
					success: false,
					data: 'You cannot delete reviews which are not yours.',
				})
			}

			await prisma.review.delete({
				where: {
					product_id_user_id: {
						product_id: productId,
						user_id: user!.id,
					},
				},
			})

			res.json({
				code: ReviewStatus.REVIEW_DELETED,
				data: { message: 'Review deleted successfully.' },
				success: true,
			})
		} catch (e) {
			res.json({
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false,
			})
		}
	}
)

export { router as ReviewController }
