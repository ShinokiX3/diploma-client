import { ProductService } from '@/services/Server/ServerProduct';
import { UserService } from '@/services/Server/SeverUser';
import { ShoppingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from './Title';
import { Empty, Image } from 'antd';
import OrderLoader from '@/components/ui/order/OrderLoader';
import { IUser } from '@/store/user/user.types';
import { IOrderResponse } from '@/store/order/order.types';
import { IAttributesResponse, IProduct } from '@/types/product.interface';

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

	@media (max-width: 1000px) {
		& {
			display: flex;
			flex-direction: column;
			gap: 10px;

			div:last-child {
				justify-content: start;
			}
		}
	}
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

const Status = styled.span<{ color: string }>`
	height: auto;
	width: 7px;
	border-radius: 0.3rem;
	background-color: ${(props) => props.color};
`;

const orderStatus = [
	{ value: 'В обробці', color: '#ff6060' },
	{ value: 'Відмінено', color: '#000000' },
	{ value: 'Укомплектовується', color: '#fca8a8' },
	{ value: 'Передано до перевізника', color: '#7ac8ff' },
	{ value: 'Очікує у точці видачі', color: '#7b00ff' },
	{ value: 'Виконано', color: '#ff0077' },
];

interface IOrders {
	user: IUser;
}

const Orders: React.FC<IOrders> = ({ user }) => {
	const [orders, setOrders] = useState<IOrderResponse[]>([]);
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			if (user.name === '') return false;
			setLoading(true);

			const orders = await UserService.getUserOrders();
			if (orders === undefined) return false;

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

			if (orders) setOrders(orders.sort((a, b) => (a.date > b.date ? -1 : 1)));
			if (products)
				setProducts(
					products
						.map((product) => product.map((item) => item[0]))
						.reduce((accu, curr) => [...accu, ...curr], [])
				);
			setLoading(false);
		})();
	}, [user]);

	if (loading) {
		const array = [...new Array(6)];
		return (
			<>
				<Title>
					<ShoppingOutlined /> Замовлення
				</Title>
				<OrderWrapper>
					{array.map((item, index) => (
						<OrderLoader key={index} />
					))}
				</OrderWrapper>
			</>
		);
	}

	if (user.name === '') return <Empty description="Need to login" />;

	return (
		<>
			<Title>
				<ShoppingOutlined /> Замовлення
			</Title>
			<OrderWrapper>
				{orders.map((order) => (
					<OrderItem key={order._id}>
						<Status
							color={
								orderStatus.filter(
									(oStatus) => oStatus.value === order.status
								)[0].color
							}
						/>
						<Message>
							<p>
								№{order._id.substring(0, 7)} від{' '}
								{String(order.date).split('T')[0]}
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
									src={`https://diploma-server.vercel.app/${
										products.find((item) => item?._id === product?.id)?.picture
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

export default Orders;
