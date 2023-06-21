import MetaLayout from '@/components/layout/MetaLayout';
import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useActions } from '@/hooks/useActions';
import { UserService } from '@/services/Server/SeverUser';

const Wrapper = styled.div`
	width: 100%;
	height: 60vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Index = () => {
	const [liqpay, setLiqpay] = useState({
		data: '',
		signature: '',
	});

	const router = useRouter();

	const { clearCart } = useActions();

	const hadleLiqpay = async (id: string, total: string) => {
		const liqpayRequest = {
			public_key: 'sandbox_i99646482716',
			private_key: 'sandbox_Wut6Vn7ijbTRw2Hr9mZMmNv3kwsU5nOwCoAjTSgd',
			version: '3',
			action: 'pay',
			amount: total,
			currency: 'UAH',
			description: 'Payment for goods in Obolon Market',
			order_id: id,
			sandbox: '1',
		};

		const response = await UserService.getLiqpayData({
			params: liqpayRequest,
			private_key: 'sandbox_Wut6Vn7ijbTRw2Hr9mZMmNv3kwsU5nOwCoAjTSgd',
		});

		setLiqpay({
			data: response.data,
			signature: response.signature,
		});
	};

	// setTimeout(() => {
	// 	router.push('/');
	// }, 4000);

	useEffect(() => {
		clearCart();
		const s: string = window.location.search;
		const id = s.match(/id=\w*/gi)![0].replace(/id=/gi, '');
		const total = s.match(/total=[\d.]*/gi)![0].replace(/total=/gi, '');
		hadleLiqpay(id, total);
	}, [router]);

	return (
		<MetaLayout title="Checkout Page" description="Cart ordering">
			<Wrapper>
				<Result
					status="success"
					title="Замовлення створене!"
					subTitle="Обробка замовлення займає 20-30 хвилин, чекайте дзвінка."
				/>
				<form
					method="POST"
					action="https://www.liqpay.ua/api/3/checkout"
					accept-charset="utf-8"
				>
					<input type="hidden" name="data" value={liqpay.data} />
					<input type="hidden" name="signature" value={liqpay.signature} />
					<Button>
						<input
							type="submit"
							value={'Сплатити'}
							style={{
								backgroundColor: 'transparent',
								border: '0px',
								width: '100%',
								height: '100%',
								cursor: 'pointer',
								fontSize: 'inherit',
								fontFamily: 'inherit',
								fontStyle: 'inherit',
							}}
						/>
					</Button>
				</form>
			</Wrapper>
		</MetaLayout>
	);
};

export default Index;
