import { prisma } from '../src/config/db'
import { hashPassword } from '../src/utils/password'
import {
	getRandomColorsArray,
	getRandomProductFeaturesArray,
	getRandomProductImagesArray,
	getRandomReviewAndRating,
	productImages,
} from './productMetadata'
import { generateSlugFromName } from '../src/utils/getSlug'
import _ from 'lodash'
import { menTrousers } from './finalData'

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
	for (const [p, i] of menTrousers.entries()) {
		const product = await prisma.product.create({
			data: {
				...i,
				category_group: {
					create: {
						category: {
							connect: {
								id: 9,
							},
						},
					},
				},
			},
		})
		console.log(`👽 Created product with id: ${product.id}`)
	}
}

// async function seedProducts() {
// 	const users = await prisma.user.findMany()
// 	const userIds = users.map((user) => user.id)
// 	const products = await prisma.product.findMany({})
// 	const productIds = products.map((product) => product.id)

// 	for (const [p, i] of productIds.entries()) {
// 		const product = await prisma.product.update({
// 			where: { id: i },
// 			data: {
// 				rating: Number((Math.random() * 4 + Math.random()).toFixed(1)),
// 				category_group: {
// 					create: {
// 						category: {
// 							connect: {
// 								category_name: 'category_name',
// 							},
// 						},
// 					},
// 				},
// 			},
// 		})
// 	}
// }

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
