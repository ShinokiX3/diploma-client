import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
	HeartOutlined,
	ShoppingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import Personal from './Personal';
import Favourites from './Favourites';
import Orders from './Orders';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	padding: 20px;
	gap: 20px;

	@media (max-width: 740px) {
		& {
			flex-direction: column;
			align-items: center;
		}
	}
`;

const Controls = styled.div`
	width: 250px;
`;

const ControlItem = styled.div<{ active?: boolean }>`
	width: auto;
	transition: background-color 0.2s ease, color 0.2s ease;
	color: ${(props) => (props.active ? 'white' : 'initial')};
	background-color: ${(props) => (props.active ? '#ff5353' : 'initial')};
	padding: 12px;
	cursor: pointer;
	border-radius: 0.4rem;
	margin-bottom: 7px;

	svg {
		margin-right: 5px;
		color: ${(props) => (props.active ? 'white' : 'initial')};
	}

	&:hover {
		background-color: #f0f1f2;
		color: black;

		svg {
			color: black;
		}
	}
`;

const Content = styled.div`
	width: 100%;
`;

const controlItems = [
	{ title: 'Профіль', ico: <UserOutlined /> },
	{ title: 'Список бажань', ico: <HeartOutlined /> },
	{ title: 'Замовлення', ico: <ShoppingOutlined /> },
];

const Switcher = ({ window, user }: { window: number; user: any }) => {
	switch (window) {
		case 1:
			return <Personal user={user} />;
		case 2:
			return <Favourites user={user} />;
		case 3:
			return <Orders user={user} />;
		default:
			return <Personal user={user} />;
	}
};

const User = () => {
	const [active, setActive] = useState<number>(
		Number(window?.location?.search?.split('=')[1]) || 1
	);

	const user = useTypedSelector((state) => state.user.user);

	const handleActive = (page: number) => {
		setActive(page);
	};

	return (
		<Wrapper>
			<Controls>
				{controlItems.map((control, index) => (
					<ControlItem
						key={control.title}
						onClick={() => handleActive(index + 1)}
						active={active === index + 1}
					>
						{control.ico} {control.title}
					</ControlItem>
				))}
			</Controls>
			<Content>
				<Switcher window={active} user={user} />
			</Content>
		</Wrapper>
	);
};

export default User;
