import { RequestHandler } from 'express'
import { ExpressRequest } from '../config/express'

export const requireAuth: RequestHandler = async (
	req: ExpressRequest,
	res,
	next
) => {
	console.log(req.session)
	const { user } = req.session
	if (!user) {
		return res.status(401).json({
			msg: 'You are unauthorized to access this resource.',
			error_code: 'ERROR_UNAUTHORIZED',
		})
	}

	req.user = user

	next()
}
