import { Line } from '@/components/ui/common/Line';
import Description from '@/components/ui/product/description/Description';
import View from '@/components/ui/product/view/View';
import Review from '@/components/ui/review/Review';
import VideoReviews from '@/components/ui/videoreviews/VideoReviews';
import { IAmazonProductById } from '@/types/products.interface';
import { Col, Collapse, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface ICProduct {
	data: IAmazonProductById;
}

const contentStyle: React.CSSProperties = {
	margin: 0,
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	// background: '#364d79',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '400px',
	// width: '400px'
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
	padding-top: 80px;
	padding-left: 20px;
	padding-right: 20px;

	@media (max-width: 700px) {
		padding-top: 0px;
	}
`;

const MainInfo = styled.div`
	display: flex;
	gap: 40px;

	@media (max-width: 700px) {
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
	console.log(data);

	const { product } = data;

	const viewData = {
		main_image: product?.main_image,
		images: product?.images,
		videos: product?.videos,
		videos_flat: product?.videos_flat,
	};

	return (
		// TODO: grid wrapper
		<Wrapper>
			<MainInfo>
				<View data={viewData} />
				<Description data={product} />
			</MainInfo>
			<Line />
			<Details>
				<div>
					{data.product?.specifications?.map((item) => (
						<Row
							style={{
								display: 'flex',
								alignItems: 'center',
								fontSize: '12pt',
								padding: '7px 0px',
								maxWidth: 'auto',
								minWidth: 'auto',
							}}
							key={item.name}
						>
							<Col
								style={{ fontSize: '12pt', padding: '7px 0px' }}
								flex={'240px'}
							>
								{item.name}
							</Col>
							<Col flex={'1fr'}>{item.value}</Col>
						</Row>
					))}
				</div>
				<div style={{ paddingRight: 20 }}>
					{/* TODO: create a small version of Card view class */}
					{data.product?.feature_bullets?.map((item) => (
						<p style={{ fontSize: '12pt', padding: '5px 0px' }} key={item}>
							{item}
						</p>
					))}
				</div>
			</Details>
			<Line />
			<VideoReviews data={data} />
			<Line />
			<div>
				{data.product?.top_reviews?.map((item) => (
					<Review key={item.id} data={item} />
				))}
			</div>
		</Wrapper>
	);
};

export default Product;
