import { IProduct } from '@/types/product.interface';

export type TImage = {
	link: string;
};

export type TPrice = {
	value: number;
};

export interface ICartItem {
	asin: string;
	id: string;
	title: string;
	image: TImage;
	product: IProduct;
	quantity: number;
	rating: string;
	rrp: string;
	price: TPrice;
}
