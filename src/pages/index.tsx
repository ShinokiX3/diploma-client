import MetaLayout from '@/components/layout/MetaLayout';
import Home from '@/components/screen/home/Home';
import { ProductService } from '@/services/Server/ServerProduct';
import { IProduct } from '@/types/product.interface';
import { GetStaticProps } from 'next/types';

const HomePage: React.FC<{ data: IProduct[][] }> = ({ data }) => {
	return (
		<MetaLayout title="Main Page" description="Main page for sales">
			<Home data={data} />
		</MetaLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const response = await ProductService.getProductsPreview();

	if (!response) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data: response },
	};
};

export default HomePage;
