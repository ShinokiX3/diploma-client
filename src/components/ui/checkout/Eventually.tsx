import React, { useMemo, useState } from 'react';
import { ShadowWrapper } from '../cart/ShadowWrapper';
import styled from 'styled-components';
import { Line } from '../common/Line';
import { Button } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { UserService } from '@/services/Server/SeverUser';
import { useActions } from '@/hooks/useActions';
import Spinner from '../common/Spinner';

import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	margin-top: 60px;

	span {
		width: 100%;
		height: 1px;
	}

	@media (max-width: 1100px) {
		margin-top: 0px;
		margin-bottom: 40px;
		justify-content: center;
	}
`;

const AgreementWrapper = styled.div`
	display: grid;
	gap: 10px;
	margin-top: 10px;
	color: gray;
	font-size: 12pt;
`;

const Eventually = () => {
	const [loading, setLoading] = useState(false);
	const items = useTypedSelector((state) => state.cart.items);
	const order = useTypedSelector((state) => state.order);
	const user = useTypedSelector((state) => state.user.user);

	const router = useRouter();

	const { clearCart } = useActions();

	const products = useMemo(
		() =>
			items.map((item) => ({
				id: item.asin,
				cost: item.price.value,
				quantity: item.quantity,
				total: item.price.value * item.quantity,
			})),
		[items]
	);

	const total = useMemo(
		() => products.reduce((accu, curr) => accu + curr.total, 0),
		[products]
	);

	const submit = async () => {
		setLoading(true);
		const data = {
			name: order.name,
			lastname: order.lastname,
			tel: order.phone,
			city: order.city,
			deliveryDepartment: order.deliveryDepartment,
			total: total,
			products: products,
		};

		const response = await UserService.createOrder(data, { id: user._id });

		if (response) clearCart();
		setLoading(false);
		router.push('checkout/success');
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<Wrapper>
			<div
				style={{
					position: 'sticky',
					top: '0',
					height: 'fit-content',
					paddingTop: '40px',
				}}
			>
				<ShadowWrapper style={{ width: '300px' }}>
					<div>
						<h2 style={{ fontWeight: '16pt' }}>Разом</h2>
					</div>
					<Line />
					<div>{items.length} Товарів</div>
					<Line />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>Ціна доставки</div>
						<div>Безкоштовно</div>
					</div>
					<Line />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>Всього:</div>
						<div>
							{Math.floor(
								items.reduce(
									(accu, curr) => (accu += curr.quantity * curr.price.value),
									0
								)
							)}
							{' ₴'}
						</div>
					</div>
					<Line />
					<Button onClick={submit} style={{ width: '100%', height: '40px' }}>
						Підтвердити
					</Button>
					<AgreementWrapper>
						<p>Підтверджуючи замовлення, я приймаю умови:</p>
						<p>- Положення про обробку та захист персональних даних</p>
						<p>- Угода користувача</p>
					</AgreementWrapper>
				</ShadowWrapper>
			</div>
		</Wrapper>
	);
};

export default Eventually;
