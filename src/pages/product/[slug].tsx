import React from 'react';
import MetaLayout from '@/components/layout/MetaLayout';
import Product from '@/components/screen/product/Product';
import { GetServerSideProps } from 'next';
import { ProductService } from '@/services/Server/ServerProduct';
import { IAttributesResponse, IProduct } from '@/types/product.interface';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string;

	const response = await ProductService.getProductById({ id: slug });

	if (!response) {
		return {
			notFound: true,
		};
	}

	return {
		props: { product: response[0], attributes: response[1], slug: slug },
	};
};

interface IProductPage {
	product: IProduct;
	attributes: IAttributesResponse;
}

const ProductPage: React.FC<IProductPage> = ({ product, attributes }) => {
	return (
		<MetaLayout title="Product Page" description="Product page details">
			<Product data={{ product, attributes }} />
		</MetaLayout>
	);
};

export default ProductPage;
