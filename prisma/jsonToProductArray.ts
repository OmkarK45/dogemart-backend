import { Product } from '@prisma/client'
import fs, { write } from 'fs'
import _ from 'lodash'
import {
	getRandomColorsArray,
	getRandomDescription,
	getRandomProductFeaturesArray,
	getRandomReviewAndRating,
	getRandomSizeArray,
} from './productMetadata'

// const results = JSON.parse(fs.readFileSync('./men_jackets_coats.json', 'utf8'))[
// 	'products'
// ]

/**
 * {
      "id": "e3aeece5-64ab-4553-ba74-3ab5cb77a635",
      "title": "product_name15",
      "brand": "GENERIC_BRAND",
      "excerpt": "product_excerpt5",
      "description": "product_description5",
      "images": [
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
        "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg"
      ],
      "price": 31,
      "discount": 34,
      "slug": "product-71-doge-ilcmCM",
      "rating": 2.5,
      "stock": 75,
      "user_id": "b5fca53b-64c4-406c-a1aa-87213a88a62a",
      "created_at": "2021-11-18T15:08:42.959Z",
      "is_deleted": false,
      "sizes": [
        "L",
        "XXL",
        "M",
        "XL"
      ],
      "colors": [
        "black"
      ],
      "features": [
        "Shock absorbent TPU case with anti-fingerprint finish",
        "Colors are ink printed on the frosted shell surface",
        "Just your everyday smooth, comfy tee, a wardrobe staple"
      ],
      "reviews": [],
      "category_group": [],
      "_count": {
        "reviews": 0
      }
    },
 * */

function writeJsonProductToArray(jsonFileName: string, type: string) {
	const results = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'))[type]
	const products = results.map((product: any) => {
		return {
			title: product.name,
			brand: product.brandName,
			excerpt: '',
			description: getRandomDescription(),
			images: 'https://' + product.imageUrl,
			price: product.price.current.value,
			discount: Math.floor(Math.random() * 100),
			slug: product.name.replaceAll(' ', '-').toLowerCase(),
			rating: _.random(3, 5),
			stock: _.random(20, 1000),
			user_id: 'b5fca53b-64c4-406c-a1aa-87213a88a62a',
			sizes: getRandomSizeArray(),
			colors: getRandomColorsArray(),
			features: getRandomProductFeaturesArray(),
			category_group: {
				create: {
					category_id: 1,
				},
			},
		}
	})
	return products
}

var file = fs.createWriteStream('finalData.ts')

function writeArrayToFile() {
	const products = JSON.stringify(
		writeJsonProductToArray('./women_pants.json', 'products')
	)
	file.write(`export const menTrousers = ${products}` + '\n')
}
writeArrayToFile()
