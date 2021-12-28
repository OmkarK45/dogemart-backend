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

export function getRandomDescription() {
	// return random index from 0 to length of array
	const randomIndex = _.random(0, jacketDescriptions.length - 1)
	return jacketDescriptions[randomIndex]
}

export function getRandomColorsArray() {
	const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white']
	const randomColors = _.sampleSize(colors, _.random(1, 4))
	return randomColors
}

export function getRandomProductFeaturesArray() {
	const features = [
		'Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt',
		'Shock absorbent TPU case with anti-fingerprint finish',
		'Colors are ink printed on the frosted shell surface',
		'Just your everyday smooth, comfy tee, a wardrobe staple',
		'Zip Fastening',
		'Side Pockets',
		'Regular Fit',
		'100% Cotton',
		'100% Plastic Free',
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

const jacketDescriptions = [
	"Men wardrobes the most special pieces of cloths are there jackets, same as women love to have small trench coats or cardigans in there wardrobes, and Jacket is for the men's. Collection of good jacket always help you in stepping forward to dress up in the best possible way. Jackets are the best addition for means clothing whether the climate is warm in summer or cold in winters.",
	'This Men’s Bomber jacket is best for winter .Material used are butter polyester and polycotton which is very soft and cozy. Designed to be both functional and fashionable, this modern travel friendly bomber jacket has a stylish flair. YOONIKK jacket is reliable, especially as the temperatures drop and a light breeze chills the air. Typically casual, this jacket embodies both retro cool and modern style. It is designed to take you from a party setting to the casual ski mountains in high style. The integration of trend-setting designs and styles and attractive, eye-catching colors, together make hem, s jackets look apart from other brands. It moves moisture away from your body for maximum comfort. The jacket also features high quality reflective for low light visibility ensuring safety without compromising style so you stay comfortable from the gym to the coffee shop and anywhere in between.',
	'This hoodie is also good for urban activewear and good as outdoor mid-layers. The easy to style colour can be dressed up with your favourite shoes and accessories or kept sleek and simple for that effortless look. Designed as a commuter collection, it is ideal as travel wear, airport looks or road trips. It can also be worn as chic casuals for grocery runs, visiting friends, an evening jog, a dance workout or as an everyday staple. Layer it over base layers or below shell layers during cooler months for that extra bit of warmth.',
	'A core style for every traveler’s wardrobe. For the hoodies, we have equipped you to travel hassle free with 6 pockets of varying sizes with zippers. 2 front hand pockets, 1 concealed pocket for your phone with an earphone outlet, 2 larger pockets for documents, tabs or snacks.',
]
