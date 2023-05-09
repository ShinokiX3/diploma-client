export type Bestsellers_rank = {
	category: string
	rank: number
	link: string
}

export type First_available = {
	raw: string
	utc: Date
}

export type Sub_title = {
	text: string
	link: string
}

export type Main_image = {
	link: string
}

export type Images = {
	link: string
}

export type Videos = {
	duration_seconds: number
	width: number
	height: number
	link: string
	thumbnail: string
	is_hero_video: boolean
	variant: string
}

export type Price = {
	symbol: '$' | string
	value: number
	currency: string
	raw: string
}

export type Third_party_seller = {
	name: string
	link: string
}

export type Fulfillment = {
	type: string
	is_sold_by_amazon: boolean
	is_fulfilled_by_amazon: boolean
	is_fulfilled_by_third_party: boolean
	is_sold_by_third_party: boolean
	third_party_seller: Third_party_seller
}

export type Buybox_winner = {
	is_prime: boolean
	availability: string
	fulfillment: Fulfillment
	price: Price
	rrp: Price
}

export type Specifications = {
	name: string
	value: string
}

export type Services = {
	title: string
	price: Price
	whats_included: string[]
}

export type Attributes = {
	name: string
	value: string
}

export type Variants = {
	asin: string
	text: string
	dimensions: string
	link: string
	price: Price
}

export type Category = {
	name: string
	link: string
	category_id: string
}

export type Summarization_attribute = {
	name: string
	value: number
	id: string
}

export type Amazons_choice = {
	keywords: string
	link: string
}

export type Climate_pledge_friendly = {
	text: string
	image: string
	link: string
}

export type Promotion = {
	name: string
}

export type Profile = {
	name: string
	link: string
	id: string
}

export type Top_review = {
	id: string
	title: string
	body: string
	body_html: string
	link: string
	rating: number
	date: First_available
	profile: Profile
	vine_program: boolean
	verified_purchase: boolean
	helpful_votes: number
	review_country: string
	is_global_review: boolean
}

export type Section = {
	title: string
	body: string
}

export type Important_information = {
	sections: Section[]
}

export type More_buying_choices = {
	price:  Price
	seller_name: string
	seller_link: string
	free_shipping: boolean
	position: 1
}

export interface IProduct {
	asin: string
	title: string
	variants: Variants[]
	keywords: string
	has_coupon: boolean
	coupon_text: string
	color: string
	is_bundle: boolean
	summarization_attributes: Summarization_attribute[]
	amazons_choice: Amazons_choice
	climate_pledge_friendly: Climate_pledge_friendly
	promotions: Promotion[]
	top_reviews: Top_review[]
	important_information: Important_information
	more_buying_choices: More_buying_choices[]
	kindle_unlimited: boolean
	keywords_list: string[]
	parent_asin: string
	delivery_message: string
	categories: Category[]
	bestsellers_rank: Bestsellers_rank[]
	brand: string
	weight: string
	shipping_weight: string
	first_available: First_available
	dimensions: string
	link: string
	videos_flat: string
	sub_title: Sub_title
	rating: number
	ratings_total: number
	reviews_total: number
	main_image: Main_image
	images: Images[]
	videos: Videos[]
	feature_bullets: string[]
	buybox_winner: Buybox_winner
	specifications: Specifications[]
	services: Services[]
	attributes: Attributes[]
}
