import { Request, Response } from 'express'
import { User } from '@prisma/client'

export interface ExpressRequest extends Request {
	user?: { id: string }
	currentUser?: User
}

export interface ExpressContext {
	req: ExpressRequest
	res: Response
}

interface Json {
	success: boolean
	data?: any
	code:
		| 'INTERNAL_ERROR'
		| 'SUCCESS'
		| 'UNAUTHORIZED'
		| 'NOT_FOUND'
		| 'BAD_REQUEST'
		| 'FORBIDDEN'
		| 'CONFLICT'
		| 'UNPROCESSABLE_ENTITY'
}

type Send<T = Response> = (body?: Json) => T

export interface CustomResponse extends Response {
	json: Send<this>
}
