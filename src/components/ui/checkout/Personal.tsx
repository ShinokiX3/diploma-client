import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Input, Space } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	gap: 10px;
	flex-direction: column;
`;

const SecondWrapp = styled.div`
	display: flex;
	gap: 10px;

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const Personal = () => {
	const { setName, setLastname, setPhone } = useActions();
	const orderInfo = useTypedSelector((state) => state.order);

	return (
		<Wrapper>
			<p style={{ fontSize: '16pt' }}>Ваша персональна інформація:</p>
			<SecondWrapp>
				<Input
					placeholder="Ім'я..."
					allowClear
					value={orderInfo.name}
					onChange={(e) => setName({ name: e.target.value })}
				/>
				<Input
					placeholder="Прізвище..."
					allowClear
					value={orderInfo.lastname}
					onChange={(e) => setLastname({ lastname: e.target.value })}
				/>
			</SecondWrapp>
			<Input
				placeholder="Номер телефона..."
				allowClear
				value={orderInfo.phone}
				onChange={(e) => setPhone({ phone: e.target.value })}
			/>
		</Wrapper>
	);
};

export default Personal;
