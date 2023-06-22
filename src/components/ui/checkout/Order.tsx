import { useTypedSelector } from '@/hooks/useTypedSelector';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.div``;

const ItemWrapper = styled.div`
	display: flex;
	border-bottom: 1px solid lightgray;

	@media (max-width: 500px) {
		flex-direction: column-reverse;
	}
`;

const Order = () => {
	const { items } = useTypedSelector((state) => state.cart);
	console.log(items);

	return (
		<Wrapper>
			<p style={{ fontSize: '16pt' }}>Замовлення:</p>
			{/* TODO: Create special component for this */}
			{/* Rewrite to grid */}
			{items &&
				items.map((item) => (
					<ItemWrapper key={item.asin}>
						<div
							className="ju-al-center"
							style={{ minWidth: '140px', padding: '5px 10px' }}
						>
							<Image
								width={0}
								height={0}
								style={{ width: 'auto', height: '140px' }}
								alt={`Product ${item.asin}`}
								loader={() => item.image.link}
								src={item.image.link}
							/>
						</div>
						<div
							style={{
								display: 'grid',
								// justifyContent: 'space-between',
								gridTemplateColumns: '3fr 1fr 1fr 1fr',
								gap: '25px',
								paddingTop: '20px',
								width: '100%',
							}}
						>
							<div
								style={{
									width: '100%',
									fontSize: '12pt',
								}}
							>
								<p>{item.title.substring(0, 150)}</p>
							</div>
							<div>
								<div>
									<p style={{ color: 'grey', marginBottom: '5px' }}>Ціна</p>
									<div>
										{item.rrp ? <del>{item.rrp}</del> : null}
										<p style={{ fontSize: '12pt', fontWeight: 'bold' }}>
											{item?.price?.value + ' ₴' || 'Sold'}
										</p>
									</div>
								</div>
							</div>
							<div>
								<p style={{ color: 'grey', marginBottom: '5px' }}>Кількість</p>
								<p>{item.quantity}</p>
							</div>
							<div>
								<p style={{ color: 'grey', marginBottom: '5px' }}>Всього</p>
								<p>
									{item?.price?.value ? (
										item.price.value * item.quantity + ' ₴'
									) : (
										<></>
									)}
								</p>
							</div>
						</div>
					</ItemWrapper>
				))}
		</Wrapper>
	);
};

export default Order;
