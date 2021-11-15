import jwt from 'jsonwebtoken'

export type Payload = Record<string, unknown>

export function createToken(
	payload: Payload,
	options?: jwt.SignOptions
): string {
	try {
		const token = jwt.sign(payload, 'mysecret', {
			issuer: '@dogecorp/api',
			audience: ['@dogecorp/client'],
			expiresIn: '7d',
			...options,
		})
		return token
	} catch (error) {
		throw error
	}
}

export function decryptToken<T>(token: string): T {
	try {
		const isVerified = jwt.verify(token, 'mysecret')

		if (!isVerified) throw new Error('Token has been malformed.')

		const payload = jwt.decode(token)
		return payload as T
	} catch (error) {
		throw error
	}
}
