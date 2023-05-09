export interface ICategories {
    categories: string[]
}

type CategoryTypes = 'standard' | 'bestsellers' | 'gift_ideas' | 'most_wished_for' | 'movers_and_shakers' | 'new_releases' | 'deals'

export interface IAmazonCategory {
    domain: string,
    id: string,
    name: string,
    has_children: boolean | IAmazonCategory[],
    is_root: boolean,
    path: string,
    type: CategoryTypes
}

export interface IAmazonCategoryResponse {
    categories: IAmazonCategory[],
    request_info: { success: true | false }
}

export interface IAmazonParentCategoryResponse extends IAmazonCategoryResponse {
    current_category: IAmazonCategory
}