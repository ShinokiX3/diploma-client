import { useEffect, useState } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import Title from './Title';
import Card from '@/components/ui/card/Card';
import CardLoader from '@/components/ui/card/CardLoader';
import { ProductService } from '@/services/Server/ServerProduct';
import styled from 'styled-components';
import { Empty } from 'antd';
import { IUser } from '@/store/user/user.types';
import { IProduct } from '@/types/product.interface';

const FavouritesWrapper = styled.div`
	display: flex;
	gap: 15px;
	flex-wrap: wrap;

	@media (max-width: 740px) {
		justify-content: center;
	}
`;

interface IFavourites {
	user: IUser;
}

const Favourites: React.FC<IFavourites> = ({ user }) => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		(async () => {
			if (user.name === '') return false;
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

	if (user.name === '') return <Empty description="Need to login" />;

	return (
		<>
			<Title>
				<HeartOutlined /> Список бажань
			</Title>
			<FavouritesWrapper>
				{loading
					? user.favourites?.map((fav) => <CardLoader key={fav} />)
					: products.map((product) => (
							<Card key={product?._id} product={product} />
					  ))}
			</FavouritesWrapper>
		</>
	);
};

export default Favourites;
