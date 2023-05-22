import Card from '@/components/ui/card/Card';
import CardLoader from '@/components/ui/card/CardLoader';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductService } from '@/services/Server/ServerProduct';
import { UserService } from '@/services/Server/SeverUser';
import {
	HeartOutlined,
	HeartTwoTone,
	ShoppingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Button, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	padding: 20px;
	gap: 20px;
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

const Title = styled.p`
	font-size: 20pt;
	margin-bottom: 20px;
`;

const PersonalWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 20px;
`;

const PersonalItem = styled.div`
	font-size: 14pt;

	p:first-child {
		color: gray;
		margin-bottom: 10px;
	}
`;

const ControlsButtons = styled.div`
	margin-top: 30px;
	display: flex;
	gap: 10px;
`;

const Personal = ({ user }) => {
	return (
		<>
			<Title>
				<UserOutlined /> Особисті дані
			</Title>
			<PersonalWrapper>
				<PersonalItem>
					<p>Прізвище:</p>
					<p>{user.name.split(' ')[0]}</p>
				</PersonalItem>
				<PersonalItem>
					<p>{`Ім'я`}:</p>
					<p>{user.name.split(' ')[1] || 'Unknown'}</p>
				</PersonalItem>
				<PersonalItem>
					<p>Дата реєстрації:</p>
					<p>{user.joindate}</p>
				</PersonalItem>
				<PersonalItem>
					<p>Номер телефону:</p>
					<p>{user.phone}</p>
				</PersonalItem>
				<PersonalItem>
					<p>Email:</p>
					<p>{user.email}</p>
				</PersonalItem>
			</PersonalWrapper>
			<ControlsButtons>
				<Button>Редагувати</Button>
				<Button>Видалити</Button>
			</ControlsButtons>
		</>
	);
};

const FavouritesWrapper = styled.div`
	display: flex;
	gap: 15px;
	flex-wrap: wrap;
`;

const Favourites = ({ user }) => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			setLoading(true);

			const favourites = user.favourites?.filter(
				(favourite) => favourite !== ''
			);

			const products = await Promise.all(
				favourites?.map((favourite) =>
					ProductService.getProductById({ id: favourite })
				)
			);

			if (products) {
				setProducts(products.map((product) => product[0]));
			}

			setLoading(false);
		})();
	}, [user]);

	return (
		<>
			<Title>
				<HeartOutlined /> Список бажань
			</Title>
			<FavouritesWrapper>
				{loading ? (
					user.favourites?.map((fav) => <CardLoader key={fav} />)
				) : (
					<></>
				)}
				{products.map((product) => (
					<Card key={product._id} product={product} />
				))}
			</FavouritesWrapper>
		</>
	);
};

const OrderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const OrderItem = styled.div`
	display: grid;
	grid-template-columns: 0.06fr 0.8fr 0.7fr 1.3fr 1fr;
	padding: 15px;
	border: 1px solid lightgray;
	border-radius: 0.3rem;
`;

const Message = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;

	p:first-child {
		font-size: 11pt;
		color: gray;
	}
`;

const Products = styled.div`
	display: flex;
	gap: 10px;
	justify-content: end;
`;

const Status = styled.span`
	height: auto;
	width: 7px;
	border-radius: 0.3rem;
	background-color: #ff6060;
`;

const Orders = ({ user }) => {
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const orders = await UserService.getUserOrders();

			const products = await Promise.all(
				orders?.map(
					async (order) =>
						await Promise.all(
							order.products.map((product) =>
								ProductService.getProductById({ id: product.id })
							)
						)
				)
			);

			if (orders) setOrders(orders);
			if (products)
				setProducts(
					products
						.map((product) => product.map((item) => item[0]))
						.reduce((accu, curr) => [...accu, ...curr], [])
				);
			setLoading(false);
		})();
	}, [user]);

	return (
		<>
			<Title>
				<ShoppingOutlined /> Замовлення
			</Title>
			<OrderWrapper>
				{orders.map((order) => (
					<OrderItem key={order._id}>
						<Status />
						<Message>
							<p>
								№{order._id.substring(0, 5)} від {order.date.split('T')[0]}
							</p>
							<p>{order.status}</p>
						</Message>
						<Message>
							<p>Сума замовлення</p>
							<p>{Math.round(order.total)} ₴</p>
						</Message>
						<Message>
							<p>{order.city.title}</p>
							<p>{order.deliveryDepartment.title}</p>
						</Message>
						<Products>
							{order.products.map((product) => (
								<Image
									width={50}
									height={'auto'}
									key={product.id}
									alt="ordered-product"
									src={`http://localhost:3000/${
										products.find((item) => item._id === product?.id)?.picture
									}`}
								/>
							))}
						</Products>
					</OrderItem>
				))}
			</OrderWrapper>
		</>
	);
};

// TODO: temporary solution

const Switcher = ({ window, user }: { window: number; user: any }) => {
	switch (window) {
		case 1:
			return <Personal user={user} />;
			break;
		case 2:
			return <Favourites user={user} />;
			break;
		case 3:
			return <Orders user={user} />;
			break;
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
				<ControlItem onClick={() => handleActive(1)} active={active === 1}>
					<UserOutlined /> Профіль
				</ControlItem>
				<ControlItem onClick={() => handleActive(2)} active={active === 2}>
					<HeartOutlined /> Список бажань
				</ControlItem>
				<ControlItem onClick={() => handleActive(3)} active={active === 3}>
					<ShoppingOutlined /> Замовлення
				</ControlItem>
			</Controls>
			<Content>
				{/* <Personal user={user} /> */}
				{/* <Favourites user={user} /> */}
				{/* <Orders user={user} /> */}
				<Switcher window={active} user={user} />
			</Content>
		</Wrapper>
	);
};

export default User;
