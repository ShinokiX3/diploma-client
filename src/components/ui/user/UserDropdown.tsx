import { Avatar, Button, Dropdown } from 'antd';
import React from 'react';
import { ShadowWrapper } from '../cart/ShadowWrapper';
import { useActions } from '@/hooks/useActions';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Controls = () => {
	const { quit } = useActions();

	const handleQuit = () => {
		localStorage.removeItem('token');
		quit('');
	};

	return (
		<ShadowWrapper
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'start',
				width: 'fit-content',
			}}
		>
			<Button type="text">
				<Link href={'/user?window=1'}>Профіль</Link>
			</Button>
			<Button type="text">
				<Link href={'/user?window=2'}>Список бажань</Link>
			</Button>
			<Button type="text">
				<Link href={'/user?window=3'}>Замовлення</Link>
			</Button>
			<Button type="text" onClick={handleQuit}>
				Вихід
			</Button>
		</ShadowWrapper>
	);
};

const UserDropdown = () => {
	return (
		<Dropdown
			placement="bottomRight"
			dropdownRender={() => <Controls />}
			trigger={['click']}
			arrow
		>
			<a onClick={(e) => e.preventDefault()}>
				<Avatar icon={<UserOutlined />} size="large" />
			</a>
		</Dropdown>
	);
};

export default UserDropdown;
