import { ICategoryResults } from './categoryResults.interface';
import { IProduct, Price } from './product.interface';
import { IRefinements } from "./refinements.interface"

export type Request_info = {
    success: boolean
    credits_used: number
    credits_remaining: number
}

export type Request_metadata = {
    id: string
    created_at: Date
    processed_at: Date
    total_time_taken: number
    amazon_url: string
}

export type Request_parameters = {
    url: string
    type: string
}

export type Category_list = {
    title: string
    link: string
    image: string
}

export type Pagination = {
    current_page: number,
    total_pages: number
}

export type Products = {
    asin: string
    title: string
    link: string
    price: Price
}

export type Frequently_bought_together = {
    total_price: Price
    products: Products[]
}

export type Also_viewed = {
    title: string
    link: string
    image: number
    rating: number
    ratings_total: number
    is_prime: boolean
    price: Price
}

export type Sponsored_product = {} & Also_viewed

export interface IAmazonProductsByCategory {
    request_info: Request_info,
    request_metadata: Request_metadata,
    request_parameters: Request_parameters,
    category_results: ICategoryResults[],
    category_list: Category_list[],
    pagination: Pagination,
    refinements: IRefinements
}

export interface IAmazonProductById {
    request_info: Request_info
    request_metadata: Request_metadata
    request_parameters: Request_parameters
    product: IProduct
    frequently_bought_together: Frequently_bought_together
    also_viewed: Also_viewed[]
    sponsored_products: Sponsored_product[]
}