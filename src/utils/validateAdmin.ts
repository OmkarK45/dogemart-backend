import { prisma } from '../config/db'

/**
 *
 * @param email - email of the user
 * @returns - true if the user is an admin
 */
export async function isAdmin(email: string) {
	const isAdmin = await prisma.user.findFirst({
		where: {
			email,
			role: 'ADMIN',
		},
		rejectOnNotFound: true,
	})
	if (isAdmin) {
		return true
	}
	return false
}
