import { Avatar, Button, Dropdown } from 'antd';
import React from 'react';
import { ShadowWrapper } from '../cart/ShadowWrapper';
import { useActions } from '@/hooks/useActions';
import { UserOutlined } from '@ant-design/icons';

const Controls = () => {
	const { quit } = useActions();

	return (
		<ShadowWrapper style={{ width: 'fit-content' }}>
			<Button type="text">Profile</Button>
			<Button type="text">Favourites</Button>
			<Button type="text" onClick={quit}>
				Quite
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
