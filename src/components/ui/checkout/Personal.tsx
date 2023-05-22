import { useActions } from '@/hooks/useActions';
import { Input, Space } from 'antd';
import React, { useState } from 'react';

const Personal = () => {
	const { setName, setLastname, setPhone } = useActions();

	return (
		<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
			<p style={{ fontSize: '16pt' }}>Ваша персональна інформація:</p>
			<div style={{ display: 'flex', gap: '10px' }}>
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
			</div>
			<Input
				placeholder="Номер телефона..."
				allowClear
				onChange={(e) => setPhone({ phone: e.target.value })}
			/>
		</div>
	);
};

export default Personal;
