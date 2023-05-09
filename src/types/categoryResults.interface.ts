export type Categories = {
    name: string
}

export type Prices = {
    symbol: '$' | string
    value: number
    currency: 'USD' | string
    raw: string
    name: string
}

export interface ICategoryResults {
    position: number,
    title: string
    asin: string
    link: string
    categories: Categories[]
    image: string
    is_prime: boolean
    rating: number
    ratings_total: number
    sponsored: boolean
    prices: Prices[]
}