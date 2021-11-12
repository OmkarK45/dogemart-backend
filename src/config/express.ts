import { Request, Response } from 'express'
import { User } from '@prisma/client'
import {
	CartStatus,
	HttpStatus,
	ProductStatus,
	WishlistStatus,
} from '../utils/statusCodes'

export interface ExpressRequest extends Request {
	user?: Omit<User, 'hashedPassword'>
	currentUser?: Omit<User, 'hashedPassword'>
}

export interface ExpressContext {
	req: ExpressRequest
	res: Response
}

interface Json {
	success: boolean
	data?: any
	code:
		| keyof typeof HttpStatus
		| keyof typeof CartStatus
		| keyof typeof ProductStatus
		| keyof typeof WishlistStatus
}

type Send<T = Response> = (body?: Json) => T

export interface CustomResponse extends Response {
	json: Send<this>
}
