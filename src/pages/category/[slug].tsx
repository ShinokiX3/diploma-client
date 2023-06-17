import MetaLayout from '@/components/layout/MetaLayout';
import Category from '@/components/screen/category/Category';
import { CategoryService } from '@/services/Server/ServerCategory';
import { ProductService } from '@/services/Server/ServerProduct';
import { ICategory } from '@/types/categories.interface';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// TODO: Need to typed these next.js functions
// use getServerSideProps instead getStatic props by porpose included categories and issues in rendering

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const response = await CategoryService.getAllCategories();

// 	const paths = response?.map((category: ICategory) => ({
// 		params: { slug: category._id || '' },
// 	}));

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };

// export const getStaticProps: GetStaticProps = async (context) => {
// 	const slug = context.params?.slug as string;

// 	const response = await ProductService.getProductsByCategory({
// 		id: slug ? slug : '',
// 	});

// 	console.log(slug);

// 	if (!response) {
// 		return {
// 			notFound: true,
// 		};
// 	}

// 	return {
// 		props: { data: response, slug: slug },
// 	};
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string;

	const response = await ProductService.getProductsByCategory({
		id: slug ? slug : '',
	});

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
	// TODO: type
	data: any;
	slug: string;
}

const CategoryPage: React.FC<ICategoryPage> = ({ data = [], slug }) => {
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
