import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IProduct, Variants } from '@/types/product.interface';
import { HeartOutlined } from '@ant-design/icons';
import { Button, Rate, Space } from 'antd';
import Image from 'next/image';
import React from 'react';

interface IDescripton {
	data: IProduct;
}

// TODO: typed this function

const newSetFromVariants = <T,>(array: T[], selector: string) => {
	return array?.reduce((accu, curr) => {
		if (
			accu.findIndex(
				(item) =>
					item.dimensions.filter((i) => i.name === selector)[0]?.value ===
					curr.dimensions.filter((i) => i.name === selector)[0]?.value
			) === -1
		)
			return [...accu, curr];
		else return [...accu];
	}, []);
};

const Description: React.FC<IDescripton> = ({ data }) => {
	console.log(data);

	const { items } = useTypedSelector((state) => state.cart);
	const { addToCart } = useActions();

	const { variants } = data;

	const sizes = newSetFromVariants(variants, 'Size');
	const colors = newSetFromVariants(variants, 'Color');

	// TODO: Create custom hook for this

	const handleToCart = () => {
		// TODO: Desctructuring object
		// TODO: Where can i get price?
		const {
			asin,
			title,
			main_image,
			rating,
			buybox_winner: { rrp, price },
		} = data;
		console.log(data);

		addToCart({
			asin: asin,
			title: title,
			image: main_image,
			price: price,
			rrp: rrp,
			quantity: 1,
			rating: rating,
		});
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<h2>{data.title}</h2>
			<p>{data.sub_title.text}</p>
			<span>
				<Rate disabled value={data.rating} />
				<span className="ant-rate-text">{data.rating}</span>
				<span className="ant-rate-text"> ({data.ratings_total})</span>
			</span>
			<Space style={{ height: '50px' }}>
				{data.buybox_winner.rrp ? (
					<del>{data.buybox_winner.rrp.raw}</del>
				) : null}
				<p style={{ fontSize: '20pt', fontWeight: 'bold' }}>
					{data.buybox_winner?.price?.raw || 'Sold'}
				</p>
				<Button
					type="primary"
					danger
					shape="round"
					size="large"
					style={{ width: '125px' }}
				>
					Buy now
				</Button>
				<Button
					type="default"
					shape="round"
					size="large"
					onClick={handleToCart}
				>
					Add to cart
				</Button>
				<Rate
					character={<HeartOutlined style={{ fontSize: '30px' }} />}
					count={1}
					style={{ color: 'red', fill: 'red' }}
				/>
			</Space>
			<span
				style={{ margin: '15px 0px', borderBottom: '1px solid lightgray' }}
			></span>
			{data.color ? <p>Color: {data.color}</p> : <></>}
			{/* TODO: move to separate component */}
			<div style={{ display: 'flex', gap: '10px' }}>
				{colors
					? colors.map((color) => (
							<div
								key={color.asin}
								className="ju-al-center"
								style={{
									padding: '2px',
									width: '40px',
									height: '40px',
									border: '1px solid lightgray',
									borderRadius: '.2rem',
								}}
							>
								<Image
									width={0}
									height={0}
									style={{ width: 'auto', height: '100%' }}
									alt="example"
									loader={() => color.main_image}
									src={color.main_image}
								/>
							</div>
					  ))
					: null}
			</div>
			{data?.attributes?.filter((item) => item.name === 'Screen Size')[0]
				?.value ? (
				<p>
					Size:{' '}
					{
						data.attributes.filter((item) => item.name === 'Screen Size')[0]
							?.value
					}
				</p>
			) : null}
			<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
				{sizes
					? sizes.map((size) =>
							size.dimensions.filter((item) => item.name === 'Size')[0]
								?.value ? (
								<div
									key={size.asin}
									className="ju-al-center"
									style={{
										flexWrap: 'wrap',
										padding: '3px',
										minWidth: '50px',
										height: '30px',
										border: '1px solid lightgray',
										borderRadius: '.2rem',
									}}
								>
									<div>
										{
											size.dimensions.filter((item) => item.name === 'Size')[0]
												?.value
										}
									</div>
								</div>
							) : null
					  )
					: null}
			</div>
		</div>
	);
};

export default Description;
