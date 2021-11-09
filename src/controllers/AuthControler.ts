import { Router } from 'express'

import { prisma } from '../config/db'
import { CustomResponse } from '../config/express'
import { hashPassword, verifyPassword } from '../utils/password'

const router = Router()

router.post('/login', async (req, res: CustomResponse) => {
	const { email, password } = req.body
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
		}

		req.session.user = userInfo

		res.status(200).json({
			code: 'SUCCESS',
			success: true,
			data: {
				message: 'Login successful',
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
			code: 'INTERNAL_ERROR',
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
			code: 'INTERNAL_ERROR',
		})
	}
})

export { router }
