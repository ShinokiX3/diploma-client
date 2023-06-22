import React from 'react';
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

const Message = styled.div<{ right: boolean }>`
	position: absolute;
	top: 10px;
	right: ${(props) => (props.right ? '10px' : 'initial')};
	background-color: ${(props) => (props.right ? 'lightblue' : 'red')};
	color: white;
	font-size: 10pt;
	padding: 2px 8px;
	border-radius: 7rem;
`;

const ImageWrapper = styled.div`
	padding-top: 20px;
	display: flex !important;
	align-items: center;
	justify-content: center;
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
		const { _id, title, cost, discount } = product;

		addToCart({
			asin: _id,
			title: title,
			// TODO: To env
			image: { link: `https://diploma-server.vercel.app/${product.picture}` },
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
				style={{ width: '250px', position: 'relative', border: '0px' }}
				hoverable
				cover={
					<ImageWrapper>
						<Link
							href={{
								pathname: `/product/${product._id}`,
								query: { title: product.title },
							}}
							style={{ textDecoration: 'none' }}
						>
							<Image
								width={0}
								height={0}
								style={{ width: 'auto', height: '140px' }}
								alt="example"
								loader={() =>
									`https://diploma-server.vercel.app/${product.picture}`
								}
								src={`https://diploma-server.vercel.app/${product.picture}`}
							/>
						</Link>
					</ImageWrapper>
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
					href={{
						pathname: `/product/${product._id}`,
						query: { title: product.title },
					}}
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
