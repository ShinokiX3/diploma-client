import React from 'react';
import { ICategoryResults } from '@/types/categoryResults.interface';
import Image from 'next/image';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card as ACard, message } from 'antd';
import Link from 'next/link';
import { useActions } from '@/hooks/useActions';
const { Meta } = ACard;

interface ICard {
	product: ICategoryResults;
}

// TODO: rewrite card ui & logic

const Card: React.FC<ICard> = ({ product }) => {
	const [messageApi, contextHolder] = message.useMessage();
	const { addToCart } = useActions();

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Product added to cart',
		});
	};

	const handleCart = () => {
		const { asin, title, image, rating, price } = product;

		console.log(product, price);

		addToCart({
			asin: asin,
			title: title,
			image: { link: image },
			price: { value: price?.value },
			rrp: '',
			quantity: 1,
			rating: rating,
		});
		success();
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
							href={`/product/${product.asin}`}
							style={{ textDecoration: 'none' }}
						>
							<Image
								width={0}
								height={0}
								style={{ width: 'auto', height: '140px' }}
								alt="example"
								loader={() => product.image}
								src={product.image}
							/>
						</Link>
					</div>
				}
				actions={[
					<div key="price">{product?.price?.raw || 'unknown'}</div>,
					<div key="rating" className="ju-al-center" style={{ gap: '5px' }}>
						{product?.rating || 0}
						<HeartOutlined />
					</div>,
					<ShoppingCartOutlined onClick={handleCart} key="cart" />,
				]}
			>
				<Link
					href={`/product/${product.asin}`}
					style={{ textDecoration: 'none' }}
				>
					<Meta
						style={{ fontSize: '11pt', fontWeight: 400 }}
						title={product.title.substring(0, 50)}
					/>
				</Link>
			</ACard>
		</>
	);
};

export default Card;
