import React from 'react';
import { ICategoryResults } from '@/types/categoryResults.interface';
import Image from 'next/image';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card as ACard, message } from 'antd';
import Link from 'next/link';
import { useActions } from '@/hooks/useActions';
import { IProduct } from '@/types/product.interface';
import styled from 'styled-components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { UserService } from '@/services/Server/SeverUser';
const { Meta } = ACard;

interface ICard {
	product: IProduct;
}

// TODO: rewrite card ui & logic

const Message = styled.div<{ right: boolean }>`
	position: absolute;
	right: ${(props) => (props.right ? '10px' : 'initial')};
	top: 10px;
	background-color: ${(props) => (props.right ? 'lightblue' : 'red')};
	color: white;
	font-size: 10pt;
	padding: 2px 8px;
	border-radius: 7rem;
`;

const Card: React.FC<ICard> = ({ product }) => {
	const [messageApi, contextHolder] = message.useMessage();

	const user = useTypedSelector((state) => state.user.user);
	const { addToCart, pushFavourite, removeFavourite } = useActions();

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Товар додано у корзину',
		});
	};

	const successFavourite = () => {
		messageApi.open({
			type: 'success',
			content: 'Товар додано у список бажань',
		});
	};

	const successRemoveFavourite = () => {
		messageApi.open({
			type: 'success',
			content: 'Товар видалено зі списоку бажань',
		});
	};

	const failruleFavourite = () => {
		messageApi.open({
			type: 'error',
			content: 'Потрібно авторизуватись',
		});
	};

	const handleCart = () => {
		// const { asin, title, image, rating, price } = product;
		const { _id, code, title, description, picture, cost, discount } = product;

		addToCart({
			asin: _id,
			title: title,
			image: { link: `http://localhost:3000/${product.picture}` },
			price: { value: discount ? cost - discount * cost : cost },
			rrp: '',
			quantity: 1,
			rating: '',
		});
		success();
	};

	const handleFavourites = async () => {
		if (JSON.stringify(user) === '{}') failruleFavourite();
		if (user.favourites?.some((item) => item === product._id)) {
			const response = await UserService.removeFavourite(product._id);
			if (response?.acknowledged) {
				removeFavourite({ id: product._id });
				successRemoveFavourite();
			}
		} else {
			const response = await UserService.pushFavourite(product._id);
			if (response?.acknowledged) {
				pushFavourite({ id: product._id });
				successFavourite();
			}
		}
	};

	return (
		<>
			{contextHolder}
			<ACard
				hoverable
				style={{ width: '250px', position: 'relative', border: '0px' }}
				cover={
					// TODO: make image wrapper adaptive
					<div
						style={{
							paddingTop: '20px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Link
							href={`/product/${product._id}`}
							style={{ textDecoration: 'none' }}
						>
							<Image
								width={0}
								height={0}
								style={{ width: 'auto', height: '140px' }}
								alt="example"
								loader={() => `http://localhost:3000/${product.picture}`}
								src={`http://localhost:3000/${product.picture}`}
							/>
						</Link>
					</div>
				}
				actions={[
					<div key="price">
						{product.discount
							? product.cost - product.discount * product.cost
							: product.cost || 'unknown'}
						₴
					</div>,
					<HeartOutlined
						onClick={handleFavourites}
						key="favourites"
						style={{
							color: user?.favourites?.some((item) => item === product._id)
								? 'red'
								: '',
						}}
					/>,
					<ShoppingCartOutlined onClick={handleCart} key="cart" />,
				]}
			>
				<Link
					href={`/product/${product._id}`}
					style={{ textDecoration: 'none' }}
				>
					<Meta
						style={{ fontSize: '11pt', fontWeight: 400 }}
						title={`${product.title.substring(0, 50)}`}
					/>
				</Link>

				{product.discount ? (
					<Message right={false}>
						-{Math.round(product.discount * 100)}%
					</Message>
				) : (
					<></>
				)}
				{product.isNew ? <Message right={true}>Новинка</Message> : <></>}
			</ACard>
		</>
	);
};

export default Card;
