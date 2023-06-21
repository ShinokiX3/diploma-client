import { Line } from '@/components/ui/common/Line';
import Description from '@/components/ui/product/description/Description';
import View from '@/components/ui/product/view/View';
import { IAttributesResponse, IProduct } from '@/types/product.interface';
import React from 'react';
import styled from 'styled-components';

interface ICProduct {
	data: {
		product: IProduct;
		attributes: IAttributesResponse;
	};
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;

	width: calc(100vw - 60px);

	padding: 0px 20px;
	padding-top: 32px;

	@media (max-width: 700px) {
		padding-top: 15px;
	}
`;

const MainInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 40px;

	@media (max-width: 1000px) {
		flex-direction: column;
	}
`;

const Details = styled.div`
	padding: 0px 0px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	align-items: center;

	@media (max-width: 700px) {
		& {
			grid-template-columns: 1fr;
		}
	}
`;

const Product: React.FC<ICProduct> = ({ data }) => {
	return (
		<Wrapper>
			<MainInfo>
				<View data={data} />
				<Description data={data} />
			</MainInfo>
			<Line />
			<Details></Details>
		</Wrapper>
	);
};

export default Product;
