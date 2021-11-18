import _ from 'lodash'

export const productImages = [
	'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
	'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
	'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
	'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
	'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
	'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
	'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg',
]

export function getRandomSizeArray() {
	const sizes = ['S', 'M', 'L', 'XL', 'XXL']
	const randomSizes = _.sampleSize(sizes, _.random(1, 4))
	return randomSizes
}

export function getRandomColorsArray() {
	const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white']
	const randomColors = _.sampleSize(colors, _.random(1, 4))
	return randomColors
}

export function getRandomProductFeaturesArray() {
	const features = [
		'Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt',
		'Male model shown is 60 183 cm tall and wearing size Large',
		'Shock absorbent TPU case with anti-fingerprint finish',
		'Colors are ink printed on the frosted shell surface',
		'Just your everyday smooth, comfy tee, a wardrobe staple',
	]
	const randomFeatures = _.sampleSize(features, _.random(1, 4))
	return randomFeatures
}

const reviews = [
	'This is a really nice product.',
	'I love this product.',
	'Amazing fit.',
	'Didnt thought second time. Got one for my dog as well',
	'This T shirt looks good on me',
	'I recommend buying this one.',
]
// generate random product reviews

export function getRandomReviewAndRating() {
	const reviewAndRating = {
		comment: _.sample(reviews)!,
		rating: _.random(0, 5),
	}
	return reviewAndRating
}

export function getRandomProductImagesArray() {
	const randomProductImages = _.sampleSize(productImages, _.random(1, 4))
	return randomProductImages
}
