import { ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import Cart from '@/components/ui/cart/Cart';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import AuthModal from '../auth/AuthModal';
import UserDropdown from '@/components/ui/user/UserDropdown';

const Navigation = styled.nav`
	gap: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Username = styled.p`
	@media (max-width: 700px) {
		display: none;
	}
`;

const Nav = () => {
	const [shouldShow, setShouldShow] = useState(false);
	const user = useTypedSelector((state) => state.user.user);

	return (
		<Navigation>
			{Object.keys(user).length ? <Username>{user?.name}</Username> : <></>}
			<Dropdown
				placement="bottomRight"
				dropdownRender={() => <Cart />}
				trigger={['click']}
				arrow
			>
				<a onClick={(e) => e.preventDefault()}>
					<ShoppingOutlined
						style={{
							display: 'flex',
							width: '30px',
							height: '30px',
							color: 'lightgray',
						}}
					/>
				</a>
			</Dropdown>
			{Object.keys(user).length ? (
				<UserDropdown />
			) : (
				<>
					<Avatar
						onClick={() => setShouldShow(true)}
						icon={<UserOutlined />}
						size="large"
					/>
					<AuthModal shouldShow={shouldShow} setShouldShow={setShouldShow} />
				</>
			)}
		</Navigation>
	);
};

export default Nav;
