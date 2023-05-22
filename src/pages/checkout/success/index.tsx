import MetaLayout from '@/components/layout/MetaLayout';
import { Result } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
	width: 100%;
	height: 60vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Index = () => {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 4000);
	}, [router]);

	return (
		<MetaLayout title="Checkout Page" description="Cart ordering">
			<Wrapper>
				<Result
					status="success"
					title="Замовлення створене!"
					subTitle="Обробка замовлення займає 20-30 хвилин, чекайте дзвінка."
				/>
			</Wrapper>
		</MetaLayout>
	);
};

export default Index;
