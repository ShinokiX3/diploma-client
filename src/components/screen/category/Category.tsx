import Card from '@/components/ui/card/Card';
import CardLoader from '@/components/ui/card/CardLoader';
import List from '@/components/ui/list/List';
import Pagination from '@/components/ui/pagination/Pagination';
import Refinements from '@/components/ui/refinements/Refinements';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AmazonProduct } from '@/services/Amazon/AmazonProduct';
import { ProductService } from '@/services/Server/ServerProduct';
import { IProduct } from '@/types/product.interface';
import { IAmazonProductsByCategory } from '@/types/products.interface';
import { Empty, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	padding: 20px;
	gap: 20px;
	width: 100%;

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
	width: 100%;
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
	{ value: 'by_title_a', label: 'Назва (А-Я)' },
	{ value: 'by_title_z', label: 'Назва (Я-А)' },
	{ value: 'by_cost_l', label: 'Ціна за зменшенням' },
	{ value: 'by_cost_h', label: 'Ціна за збільшенням' },
	{ value: 'by_discount', label: 'За знижкою' },
	{ value: 'by_new', label: 'За новизною' },
];

const Category: React.FC<ICategory> = ({ data, categoryId }) => {
	const [categoryResults, setCategoryResults] = useState(data);
	const [loading, setLoading] = useState(false);
	const [refinements, setRefinements] = useState({});

	const sort = useTypedSelector((state) => state.product.sort);
	const filter = useTypedSelector((state) => state.product.filter);
	const { setSort } = useActions();

	useEffect(() => {
		(async () => {
			const attributes = await ProductService.getAllAttributes();
			if (attributes) setRefinements(attributes);
		})();
	}, []);

	// React query status working

	// const fetchByParameters = async (page: number, sort?: string) => {
	// 	window.scrollTo(0, 0);
	// 	setLoading(true);
	// 	const data = await AmazonProduct.getByCategoryId(categoryId, page, sort);
	// 	if (data) {
	// 		setCategoryResults(data);
	// 	}
	// 	setLoading(false);
	// };

	const handleChange = (value: string) => {
		setSort({ type: value.type });

		console.log(value);

		switch (value) {
			case 'by_title_a':
				setCategoryResults(
					data.sort((a, b) => {
						if (a.title > b.title) return 1;
						if (a.title < b.title) return -1;
						return 0;
					})
				);
				break;
			case 'by_title_z':
				setCategoryResults(
					data.sort((a, b) => {
						if (a.title > b.title) return -1;
						if (a.title < b.title) return 1;
						return 0;
					})
				);
				break;
			case 'by_cost_l':
				setCategoryResults(
					data.sort((a, b) => {
						const costA = a.discount ? a.cost - a.discount * a.cost : a.cost;
						const costB = b.discount ? b.cost - b.discount * b.cost : b.cost;

						if (costA > costB) return -1;
						if (costA < costB) return 1;
						return 0;
					})
				);
				break;
			case 'by_cost_h':
				setCategoryResults(
					data.sort((a, b) => {
						const costA = a.discount ? a.cost - a.discount * a.cost : a.cost;
						const costB = b.discount ? b.cost - b.discount * b.cost : b.cost;

						if (costA > costB) return 1;
						if (costA < costB) return -1;
						return 0;
					})
				);
				break;
			case 'by_discount':
				setCategoryResults(
					data.sort((a, b) => {
						if (a.discount > b.discount) return -1;
						if (a.discount < b.discount) return 1;
						return 0;
					})
				);
				break;
			case 'by_new':
				setCategoryResults(
					data.sort((a, b) => {
						if (a.isNew) return -1;
						if (!a.isNew) return 1;
						return 0;
					})
				);
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		setCategoryResults(data);
	}, [data]);

	useEffect(() => {
		console.log(JSON.stringify(filter));

		if (
			JSON.stringify(filter) !==
			'{"brand":[],"capacities":[],"kind":[],"manufacturer":[],"packing":[],"strengths":[]}'
		) {
			const products = categoryResults.filter((product) => {
				const isBrand = filter.brand.some(
					(brand) => product.brand[0] === brand
				);
				const isKind = filter.kind.some((kind) => product.kind[0] === kind);
				const isManufacturer = filter.manufacturer.some(
					(manufacturer) => product.manufacturer[0] === manufacturer
				);
				const isStrength = filter.strengths.some(
					(strength) => product.strength[0] === strength
				);
				const isCapacity = filter.capacities.some(
					(capacity) => product.capacity[0] === capacity
				);
				const isPacking = filter.packing.some(
					(packing) => product.packing[0] === packing
				);
				return (
					isBrand ||
					isKind ||
					isManufacturer ||
					isStrength ||
					isCapacity ||
					isPacking
				);
			});
			setCategoryResults(products);
		} else setCategoryResults(data);
	}, [filter]);

	return (
		<Wrapper>
			{/* <Refinements data={data.refinements} /> */}
			<Refinements data={refinements} />
			<ContentWrapper>
				<SortWrapper>
					<p>Відсортувати: </p>
					<Select
						defaultValue="..."
						style={{ width: 250 }}
						onChange={handleChange}
						options={sortVariables}
					/>
				</SortWrapper>
				<CardWrapper>
					{categoryResults.map((product: IProduct) =>
						loading ? (
							<CardLoader key={product.title} />
						) : (
							<Card key={product.title} product={product} />
						)
					)}
					{categoryResults.length === 0 ? <Empty description="" /> : <></>}
				</CardWrapper>
				<Pagination
					// current={`categoryResults.pagination?.current_page`}
					// total={categoryResults.pagination?.total_pages}
					current={1}
					total={1}
					// handler={fetchByParameters}
					handler={() => {}}
				/>
			</ContentWrapper>
		</Wrapper>
	);
};

export default Category;
