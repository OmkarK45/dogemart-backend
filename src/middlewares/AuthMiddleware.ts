import { User } from '@prisma/client'
import { RequestHandler } from 'express'
import { ExpressRequest } from '../config/express'
import { decryptToken } from '../config/jwt'

export const requireAuth: RequestHandler = async (
	req: ExpressRequest,
	res,
	next
) => {
	console.log(req.cookies['token'])
	const token = req.cookies['token']
	if (!token) {
		return res.status(401).json({
			msg: 'You are unauthorized to access this resource.',
			error_code: 'ERROR_UNAUTHORIZED',
		})
	}
	const user = decryptToken<User>(token)
	console.log(user)

	req.user = user

	next()
}
