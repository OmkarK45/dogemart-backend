import { Router } from 'express'
import { prisma } from '../config/db'
import { CustomResponse, ExpressRequest } from '../config/express'
import { requireAuth } from '../middlewares/AuthMiddleware'

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

			res.json({
				success: true,
				data: cart,
				code: 'SUCCESS',
			})
		} catch (e: any) {
			res.json({
				success: false,
				data: e.message,
				code: 'INTERNAL_ERROR',
			})
		}
	}
)

export { router as CartController }
