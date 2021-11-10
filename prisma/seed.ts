import { prisma } from '../src/config/db'
import { hashPassword } from '../src/utils/password'

const userData = [...Array(5).keys()].slice(1)
const productsData = [...Array(10).keys()].slice(1)
const categoriesData = [...Array(5).keys()].slice(1)

async function seedUsers() {
	for (const [u, i] of userData.entries()) {
		const user = await prisma.user.create({
			data: {
				email: `root_user${i}@gmail.com`,
				name: `root_user${i}`,
				hashedPassword: await hashPassword('root_user'),
				role: 'USER',
			},
		})
		const cart = await prisma.cart.create({
			data: {
				userId: user.id,
			},
		})
		console.log(`👽 Created user with id: ${user.id}`)
	}
}

async function main() {
	console.log(`---🌿 STARTED SEEDING 🌿--- `)
	seedUsers()
	console.log(`---🌿 FINISHED SEEDING 🌿--- `)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
