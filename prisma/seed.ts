import { prisma } from '../src/config/db'
import { hashPassword } from '../src/utils/password'

const userData = [...Array(5).keys()].slice(1)
const productsData = [...Array(10).keys()].slice(1)
const categoriesData = [...Array(5).keys()].slice(1)

async function seedUsers() {
	for (const [u, i] of userData.entries()) {
		const user = await prisma.user.create({
			data: {
				email: `root_user${i + 1}@gmail.com`,
				name: `root_user${i}`,
				hashedPassword: await hashPassword('root_user'),
				role: 'USER',
			},
		})
		console.log(`👽 Created user with id: ${user.id}`)
	}
}

async function seedCategories() {
	for (const [c, i] of categoriesData.entries()) {
		const category = await prisma.category.create({
			data: {
				category_name: `category_name${i}`,
			},
		})
		console.log(`👽 Created category with id: ${category.id}`)
	}
}

async function seedProducts() {
	const allCategories = await prisma.category.findMany()
	const categoryIds = allCategories.map((category) => category.id)

	for (const [p, i] of productsData.entries()) {
		const product = await prisma.product.create({
			data: {
				title: `product_name${i + 10}`,
				description: `product_description${i}`,
				price: Math.floor(Math.random() * 100),
				stock: Math.floor(Math.random() * 100),
				excerpt: `product_excerpt${i}`,
				user: {
					connect: {
						email: 'root_user2@gmail.com',
					},
				},
			},
		})
		console.log(`👽 Created product with id: ${product.id}`)
	}
}

async function main() {
	console.log(`---🌿 STARTED SEEDING 🌿--- `)
	// seedUsers()
	// seedCategories()
	seedProducts()
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
