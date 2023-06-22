import React from 'react';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Button, Empty, InputNumber, Rate, Space } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { ShadowWrapper } from './ShadowWrapper';
import { UserService } from '@/services/Server/SeverUser';

// TODO: change to global variables

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid lightgray;
	padding-bottom: 10px;
`;

const Product = styled.div`
	display: flex;
	border-bottom: 1px solid lightgrey;
	padding: 10px 0px;

	@media (max-width: 450px) {
		& {
			flex-direction: column;
		}
	}
`;

const Offer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 12px;
	cursor: pointer;
	font-size: 16pt;
	font-weight: bold;
	font-family: var(--ff-primary);
	transition: color 0.3s ease-in;

	&:hover {
		color: red;
	}
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 15px 0px;
	width: 100%;
`;

const SubDetails = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Title = styled.p`
	font-size: 14pt;
	font-weight: bold;
`;

const Controls = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 12px;
`;

const Price = styled.div``;

const Cart = () => {
	const { items } = useTypedSelector((state) => state.cart);
	const user = useTypedSelector((state) => state.user.user);
	const {
		clearCart,
		removeFromCart,
		changeQuantity,
		pushFavourite,
		removeFavourite,
	} = useActions();

	const handleClear = () => {
		clearCart();
	};

	const handleDelete = (id: string) => {
		removeFromCart({ id: id });
	};

	const handleQuantity = (id: string, quantity: number | null) => {
		changeQuantity({ asin: id, quantity });
	};

	if (items.length === 0) {
		return (
			<ShadowWrapper>
				<Header>
					<h2>Корзина</h2>
					<Button type="link" danger onClick={() => {}}>
						Нічого видаляти
					</Button>
				</Header>
				<Empty
					description={<span>Корзина пуста</span>}
					style={{ margin: '15px 0px' }}
				/>
			</ShadowWrapper>
		);
	}

	const handleFavourites = async (productId: string) => {
		if (user.name === '') console.log('Error');

		if (user.favourites?.some((item) => item === productId)) {
			const response = await UserService.removeFavourite(productId);
			if (response?.acknowledged) {
				removeFavourite({ id: productId });
			}
		} else {
			const response = await UserService.pushFavourite(productId);
			if (response?.acknowledged) {
				pushFavourite({ id: productId });
			}
		}
	};

	return (
		<ShadowWrapper>
			<Header>
				<h2>Корзина</h2>
				<Button type="link" danger onClick={handleClear}>
					<DeleteOutlined />
					Видалити
				</Button>
			</Header>
			{items &&
				items.map((item) => (
					<Product key={item.asin}>
						<div
							className="ju-al-center"
							style={{ width: '150px', padding: '0px 10px 00px 0px' }}
						>
							<Link
								href={`/product/${item.asin}`}
								style={{ textDecoration: 'none' }}
							>
								<Image
									width={0}
									height={0}
									style={{ width: 'auto', height: '140px' }}
									alt={`Product ${item.asin}`}
									loader={() => item.image.link}
									src={item.image.link}
								/>
							</Link>
						</div>
						<Details>
							<Link
								href={`/product/${item.asin}`}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<Title>{item.title.substring(0, 25)}</Title>
							</Link>
							<SubDetails>
								<Price>
									{item.rrp ? <del>{item.rrp}</del> : null}
									<p style={{ fontSize: '12pt', fontWeight: 'bold' }}>
										{item?.price?.value + ' ₴' || 'Sold'}
									</p>
								</Price>
							</SubDetails>
							<Controls>
								<InputNumber
									style={{ width: '140px' }}
									min={1}
									max={10}
									defaultValue={item.quantity}
									onChange={(value) => handleQuantity(item.asin, value)}
								/>
								<DeleteOutlined
									onClick={() => handleDelete(item.id)}
									style={{ fontSize: '25px', cursor: 'pointer' }}
								/>
								<HeartOutlined
									onClick={() => handleFavourites(item.asin)}
									style={{
										cursor: 'pointer',
										color: user?.favourites?.some((fav) => fav === item.asin)
											? 'red'
											: '',
										fontSize: '25px',
									}}
								/>
							</Controls>
						</Details>
					</Product>
				))}
			<Offer>
				<Link href="/checkout">Оформити</Link>
			</Offer>
		</ShadowWrapper>
	);
};

export default Cart;
