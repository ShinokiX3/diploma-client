import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

type TOffering = {
	title: string;
	src: string;
};

const offerings: TOffering[] = [
	{
		title: 'Electronics',
		src: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg',
	},
	{
		title: 'Beauty picks',
		src: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg',
	},
	{
		title: 'Dresses',
		src: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2022/February/DashboardCards/Fuji_dash_dress_1X._SY304_CB626369146_.jpg',
	},
	{
		title: 'Top deal',
		src: 'https://images-na.ssl-images-amazon.com/images/G/01/home/THILGMA/SpringEvent2023/XCM_CUTTLE_1559454_3018199_379x304_1X_en_US._SY304_CB592739737_.jpg',
	},
];

const Wrapper = styled.div`
	position: absolute;
	bottom: 20%;
	z-index: 200;
	width: calc(100vw - 40px);
	padding: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;

const Item = styled.div`
	padding: 10px;
	border-radius: 0.1rem;
	background-color: #ffffffa7;
	min-width: 10vw;
	display: flex;
	flex-direction: column;

	width: fit-content;
`;

const Title = styled.p`
	padding-top: 5px;
	padding-bottom: 5px;
	font-size: 16pt;
	font-weight: bolder;
`;

const SubTitle = styled.p`
	padding-top: 5px;
	color: #5c5cff;
`;

const PromoMessage = () => {
	return (
		<Wrapper>
			{offerings.map((offering) => (
				<Item key={offering.title}>
					<Title>{offering.title}</Title>
					<Image
						width={0}
						height={0}
						style={{ width: '300px', height: 'auto' }}
						alt="promo-offering"
						loader={() => offering.src}
						src={offering.src}
					/>
					<SubTitle>Shop now</SubTitle>
				</Item>
			))}
		</Wrapper>
	);
};

export default PromoMessage;
