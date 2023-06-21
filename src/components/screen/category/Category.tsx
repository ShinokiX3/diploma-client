import Card from '@/components/ui/card/Card';
import CardLoader from '@/components/ui/card/CardLoader';
import Pagination from '@/components/ui/pagination/Pagination';
import Refinements from '@/components/ui/refinements/Refinements';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductService } from '@/services/Server/ServerProduct';
import { IProduct } from '@/types/product.interface';
import { Empty, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import sortByValue from './utils/sort';
import filterByValue from './utils/filter';
import { TFilter } from '@/store/product/product.types';

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

type TData = IProduct & TFilter & { strength: string[]; capacity: string[] };

interface ICategory {
	data: TData[];
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
	const filter = useTypedSelector((state) => state.product.filter);

	useEffect(() => {
		(async () => {
			const attributes = await ProductService.getAllAttributes();
			if (attributes) setRefinements(attributes);
		})();
	}, []);

	useEffect(() => {
		setCategoryResults(filterByValue(data, filter));
	}, [filter]);

	const handleChange = (value: string) => {
		const sorted = sortByValue(data, value);
		if (sorted !== null) setCategoryResults([...sorted]);
	};

	return (
		<Wrapper>
			<Refinements data={refinements} />
			<ContentWrapper>
				<SortWrapper>
					<Select
						defaultValue={sortVariables[0].label}
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
