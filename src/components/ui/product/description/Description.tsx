import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Rate, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import {
	IAttribute,
	IAttributesResponse,
	IProduct,
} from '@/types/product.interface';
import { UserService } from '@/services/Server/SeverUser';
import Link from 'next/link';

interface IDescripton {
	data: { product: IProduct; attributes: IAttributesResponse };
}

const Attributes = styled.div`
	display: grid;
	grid-template-columns: 0.3fr 1fr;

	div {
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 5px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const Question = styled.div`
	white-space: nowrap;
	background-color: #f9f9f9;
`;

const Answer = styled.div`
	background-color: #fdfdfd;
	color: gray;
`;

const DescriptionP = styled.p`
	padding: 15px;
	border-radius: 0.2rem;
	line-height: 20px;
	background-color: #f9f9f9;
`;

const TitleP = styled.p`
	margin-bottom: 5px;
	font-size: 22pt;
	font-weight: bold;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	width: 100%;
	height: auto;
`;

// TODO: typed this function

const Description: React.FC<IDescripton> = ({ data }) => {
	const { items } = useTypedSelector((state) => state.cart);
	const user = useTypedSelector((state) => state.user.user);
	const { addToCart, pushFavourite, removeFavourite } = useActions();

	// TODO: Create custom hook for this

	const handleToCart = () => {
		// TODO: Desctructuring object
		// TODO: Where can we get price?
		const { _id, title, picture, cost, discount } = data.product;

		addToCart({
			asin: _id,
			title: title,
			image: { link: `https://diploma-server.vercel.app/${picture}` },
			price: { value: discount ? cost - discount * cost : cost },
			rrp: '',
			quantity: 1,
			rating: '',
		});
	};

	const handleFavourites = async () => {
		if (JSON.stringify(user) === '{}') console.log('Something wrong...');

		if (user.favourites?.some((item) => item === data.product._id)) {
			const response = await UserService.removeFavourite(data.product._id);
			if (response?.acknowledged) {
				removeFavourite({ id: data.product._id });
			}
		} else {
			const response = await UserService.pushFavourite(data.product._id);
			if (response?.acknowledged) {
				pushFavourite({ id: data.product._id });
			}
		}
	};

	return (
		<Wrapper>
			<TitleP>{data.product.title}</TitleP>
			<DescriptionP>{data.product.description}</DescriptionP>
			<Space style={{ height: '50px' }}>
				{data?.product.discount ? (
					// <del>{data.product.buybox_winner.rrp.raw}</del>
					<del>{data.product.cost || 'Sold'}₴</del>
				) : null}
				<p style={{ fontSize: '20pt', fontWeight: 'bold' }}>
					{data.product.cost - data.product.cost * data.product.discount}₴
				</p>
				<Link href={'/checkout'}>
					<Button
						type="primary"
						danger
						shape="round"
						size="large"
						style={{ width: '140px' }}
						onClick={handleToCart}
					>
						<ShoppingCartOutlined />
						Придбати
					</Button>
				</Link>
				<Button
					type="default"
					shape="round"
					size="large"
					onClick={handleToCart}
				>
					У кошик
				</Button>
				<Rate
					character={
						<HeartOutlined
							onClick={handleFavourites}
							style={{
								color: user?.favourites?.some(
									(item) => item === data.product._id
								)
									? 'red'
									: '',
								fontSize: '30px',
							}}
						/>
					}
					count={1}
					style={{ color: 'red', fill: 'red' }}
				/>
			</Space>
			<span
				style={{ margin: '15px 0px', borderBottom: '1px solid lightgray' }}
			></span>
			<Attributes>
				<Question>
					<div>Ємність</div>
					<div>Бренд</div>
					<div>Вид</div>
					<div>Виробник</div>
					<div>{`Міцність (Abv)`}</div>
					<div>Тара</div>
				</Question>
				<Answer>
					<div>{data.attributes.capacity[0].value}</div>
					<div>{data.attributes.brand[0].value}</div>
					<div>{data.attributes.kind[0].value}</div>
					<div>{data.attributes.manufacturer[0].value}</div>
					<div>{data.attributes.strength[0].value}</div>
					<div>{data.attributes.packing[0].value}</div>
				</Answer>
			</Attributes>
		</Wrapper>
	);
};

export default Description;
