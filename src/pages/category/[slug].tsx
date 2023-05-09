import MetaLayout from '@/components/layout/MetaLayout';
import Category from '@/components/screen/category/Category';
import { AmazonCategory } from '@/services/Amazon/AmazonCategory';
import { AmazonProduct } from '@/services/Amazon/AmazonProduct';
import { IAmazonProductsByCategory } from '@/types/products.interface';
import { GetStaticProps, GetStaticPaths } from 'next';

// TODO: Need to typed these next.js functions
// use getServerSideProps instead getStatic props by porpose included categories and issues in rendering

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await AmazonCategory.getAllCategories();

	const paths = response.map((category) => ({
		params: { slug: category.id || '' },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.slug as string;

	const response = await AmazonProduct.getByCategoryId(slug ? slug : '', 1);

	if (!response) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data: response, slug: slug },
	};
};

interface ICategoryPage {
	data: IAmazonProductsByCategory;
	slug: string;
}

const CategoryPage: React.FC<ICategoryPage> = ({ data = [], slug }) => {
	// TODO: change number slug value to string' category title

	return (
		<MetaLayout
			title={`Category ${slug}`}
			description="Category page by chosen category"
		>
			<Category data={data} categoryId={slug} />
		</MetaLayout>
	);
};

export default CategoryPage;
