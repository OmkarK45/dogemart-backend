import { Router } from 'express'

import { prisma } from '../config/db'
import { CustomResponse, ExpressRequest } from '../config/express'
import { createToken } from '../config/jwt'
import { requireAuth } from '../middlewares/AuthMiddleware'
import { hashPassword, verifyPassword } from '../utils/password'
import { HttpStatus } from '../utils/statusCodes'

const router = Router()

router.post('/login', async (req, res: CustomResponse) => {
	const { email, password } = req.body
	console.log(email, password)
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: {
					equals: email,
					mode: 'insensitive',
				},
			},
		})
		if (!user) {
			return res.status(404).json({
				code: 'NOT_FOUND',
				success: true,
				data: {
					message: 'No user with that email address. Please signup instead.',
				},
			})
		}
		const correctPassword = await verifyPassword(user.hashedPassword, password)
		console.log(correctPassword)

		if (!correctPassword) {
			return res.status(401).json({
				code: 'UNAUTHORIZED',
				success: true,
				data: {
					message: 'Password provided is incorrect.',
				},
			})
		}

		const userInfo = {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			created_at: user.created_at,
			update_at: user.update_at,
		}

		req.session.user = userInfo

		const token = createToken({
			...userInfo,
		})

		res.status(200).json({
			code: 'SUCCESS',
			success: true,
			data: {
				message: 'Login successful',
				user: userInfo,
				token,
			},
		})
	} catch (e: any) {
		console.log(
			`[Error] : File - AuthController, Function : /signin [post]`,
			e.message
		)
		res.json({
			success: false,
			code: HttpStatus.INTERNAL_SERVER_ERROR,
		})
	}
})

router.post('/signup', async (req, res: CustomResponse) => {
	const { name, email, password } = req.body
	try {
		const existingUser = await prisma.user.findUnique({
			where: { email },
		})

		if (existingUser) {
			return res.status(400).json({
				data: {
					message: 'User already exists',
				},
				success: true,
				code: 'CONFLICT',
			})
		}

		const savedUser = await prisma.user.create({
			data: {
				email,
				name,
				hashedPassword: await hashPassword(password),
			},
		})

		const userInfo = {
			id: savedUser.id,
			name: savedUser.name,
			email: savedUser.email,
			role: savedUser.role,
			created_at: savedUser.created_at,
			update_at: savedUser.update_at,
		}

		req.session.user = userInfo

		res.status(200).json({
			code: 'SUCCESS',
			success: true,
			data: {
				user: userInfo,
			},
		})
	} catch (e: any) {
		console.log(
			`[Error] : File - AuthController, Function : /signup [post]`,
			e.message
		)
		res.json({
			success: false,
			code: HttpStatus.INTERNAL_SERVER_ERROR,
		})
	}
})

router.get(
	'/user-info',
	requireAuth,
	async (req: ExpressRequest, res: CustomResponse) => {
		const user = req.user
		const currentUser = await prisma.user.findUnique({
			where: { email: user?.email },
			select: {
				cart: true,
				email: true,
				id: true,
				name: true,
				hashedPassword: false,
				role: true,
				wishlist: {
					take: 5,
				},
			},
			rejectOnNotFound: true,
		})
		res.json({
			code: 'SUCCESS',
			success: true,
			data: {
				user: currentUser,
			},
		})
	}
)

export { router as AuthController }
