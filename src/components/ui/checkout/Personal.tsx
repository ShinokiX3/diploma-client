import { useActions } from '@/hooks/useActions';
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

	return (
		<Wrapper>
			<p style={{ fontSize: '16pt' }}>Ваша персональна інформація:</p>
			<SecondWrapp>
				<Input
					placeholder="Ім'я..."
					allowClear
					onChange={(e) => setName({ name: e.target.value })}
				/>
				<Input
					placeholder="Прізвище..."
					allowClear
					onChange={(e) => setLastname({ lastname: e.target.value })}
				/>
			</SecondWrapp>
			<Input
				placeholder="Номер телефона..."
				allowClear
				onChange={(e) => setPhone({ phone: e.target.value })}
			/>
		</Wrapper>
	);
};

export default Personal;
