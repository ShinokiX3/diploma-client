import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './parallax.module.scss';

import Promo from './Promo';
import styled from 'styled-components';
import Card from '@/components/ui/card/Card';
import { IProduct } from '@/types/product.interface';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;

const ProductWrappper = styled.div`
	display: flex;
	gap: 10px;
`;

const CategoryTitle = styled.p`
	font-size: 16pt;
	padding-bottom: 10px;
	border-bottom: 1px solid lightgray;
`;

const titles = {
	0: 'Вино',
	1: 'Слабоалкогольні напої',
	2: 'Безалкогольні напої',
	3: 'Пиво',
	4: 'Сидр',
	5: 'Мінеральна та питна вода',
};

const PreviewItem = ({
	products,
	index,
}: {
	products: IProduct[];
	index: number;
}) => {
	return (
		<>
			<CategoryTitle>{titles[index]}</CategoryTitle>
			<ProductWrappper>
				{products.map((product: IProduct, index: number) => (
					<Card key={product.title} product={product} />
				))}
			</ProductWrappper>
		</>
	);
};

interface IHome {
	data: IProduct[][];
}

const Home: React.FC<IHome> = ({ data }) => {
	console.log(data);

	return (
		<Wrapper>
			<Promo />
			{data.map((products: IProduct[], index: number) => (
				<PreviewItem key={index} products={products} index={index} />
			))}
		</Wrapper>
	);
};

export default Home;
