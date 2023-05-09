import Card from '@/components/ui/card/Card';
import CardLoader from '@/components/ui/card/CardLoader';
import List from '@/components/ui/list/List';
import Pagination from '@/components/ui/pagination/Pagination';
import Refinements from '@/components/ui/refinements/Refinements';
import { AmazonProduct } from '@/services/Amazon/AmazonProduct';
import { IAmazonProductsByCategory } from '@/types/products.interface';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	padding: 20px;
	gap: 20px;

	@media (max-width: 700px) {
		& {
			padding-top: 0px;
			flex-direction: column;
		}
	}
`;

const CardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	align-items: center;
	justify-content: center;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;

const SortWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;

	@media (max-width: 700px) {
		justify-content: center;
	}
`;

interface ICategory {
	data: IAmazonProductsByCategory;
	categoryId: string;
}

// TODO: move to env

const sortVariables = [
	{ value: 'price_high_to_low', label: 'Price high to low' },
	{ value: 'price_low_to_high', label: 'Price low to high' },
	{ value: 'most_recent', label: 'Most recent' },
	{ value: 'featured', label: 'Featured' },
	{ value: 'average_review', label: 'Average review' },
	{ value: 'relevance', label: 'Relevance' },
	// { value: 'bestsellers', label: 'Bestsellers' },
	{ value: 'running_time_ascending', label: 'Running time ascending' },
	{ value: 'running_time_descending', label: 'Running time descending' },
	{ value: 'title_ascending', label: 'Title ascending' },
	{ value: 'title_descending', label: 'Title descending' },
];

const Category: React.FC<ICategory> = ({ data, categoryId }) => {
	const [categoryResults, setCategoryResults] = useState(data);
	const [loading, setLoading] = useState(false);

	// React query status working

	const fetchByParameters = async (page: number, sort?: string) => {
		window.scrollTo(0, 0);
		setLoading(true);
		const data = await AmazonProduct.getByCategoryId(categoryId, page, sort);
		if (data) {
			setCategoryResults(data);
		}
		setLoading(false);
	};

	const handleChange = (value: string) => {
		fetchByParameters(1, value);
	};

	useEffect(() => {
		setCategoryResults(data);
	}, [data]);

	return (
		<Wrapper>
			<Refinements data={data.refinements} />
			<ContentWrapper>
				<SortWrapper>
					<p>Sort products by: </p>
					<Select
						defaultValue="price_high_to_low"
						style={{ width: 250 }}
						onChange={handleChange}
						options={sortVariables}
					/>
				</SortWrapper>
				<CardWrapper>
					{categoryResults.category_results.map((product) =>
						loading ? (
							<CardLoader key={product.title} />
						) : (
							<Card key={product.title} product={product} />
						)
					)}
				</CardWrapper>
				<Pagination
					current={categoryResults.pagination?.current_page}
					total={categoryResults.pagination?.total_pages}
					handler={fetchByParameters}
				/>
			</ContentWrapper>
		</Wrapper>
	);
};

export default Category;
