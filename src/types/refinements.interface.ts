type DefaultRefinements = {
    name: string
    value: string
    link: string
    refinement_display_name: string
}

export type Prime = {} & DefaultRefinements

export type Departments = {} & DefaultRefinements

export type Reviews = {} & DefaultRefinements

export type Price = {} & DefaultRefinements

export type Brand = {} & DefaultRefinements

export type Cookware_and_bakeware_material = {} & DefaultRefinements

export type Global_store = {} & DefaultRefinements

export type Condition = {} & DefaultRefinements

export type New_arrivals = {} & DefaultRefinements

export type International_shipping = {} & DefaultRefinements

export type Availability = {} & DefaultRefinements

export type Seller = {} & DefaultRefinements

export interface IRefinements {
    prime: Prime[],
    departments: Departments[],
    reviews: Reviews[],
    price: Price[],
    brand: Brand[],
    cookware_and_bakeware_material: Cookware_and_bakeware_material[],
    global_store: Global_store[],
    condition: Condition[],
    new_arrivals: New_arrivals[],
    international_shipping: International_shipping[],
    availability: Availability[],
    seller: Seller[]
}