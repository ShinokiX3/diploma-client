import { useDebounce } from '@/hooks/useDebounce';
import { AmazonProduct } from '@/services/Amazon/AmazonProduct';
import { Empty, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import Spinner from '../common/Spinner';
import styled from 'styled-components';
import Link from 'next/link';

interface ISearchProduct {
	asin: string;
	id: string;
	pId: number;
	title: string;
	value: string;
}

const Wrapper = styled.div`
	padding: 14px;
	padding-top: 0px;
`;

const SearchItem = styled.div`
	cursor: pointer;
	font-size: 12pt;
	color: #565656;
	padding: 4px 10px;

	border-radius: 0.2rem;
	transition: background-color 0.4s ease;
	&:hover {
		background-color: #f0f1f2;
	}
`;

const SearchHandling = ({
	loading,
	data,
}: {
	loading: boolean;
	data: Array<ISearchProduct>;
}) => {
	if (loading) return <Spinner />;
	if (data.length === 0) return <Empty />;

	console.log(data);

	return (
		<Wrapper>
			{data.map((item) => (
				<Link
					key={item.title}
					href={`/product/${item.asin}`}
					style={{ textDecoration: 'none' }}
				>
					<SearchItem>{item.title}</SearchItem>
				</Link>
			))}
		</Wrapper>
	);
};

const Search = ({ styles }: { styles?: Object }) => {
	const [value, setValue] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<Array<any>>([]);

	const debouncedValue = useDebounce(value, 800);

	// TODO: change fetch to react query or vercel swr

	useEffect(() => {
		(async () => {
			if (debouncedValue) {
				setLoading(true);
				const response = await AmazonProduct.getProductsByTerm(debouncedValue);

				const products = response.search_results.map(
					(item: ISearchProduct, index: number) => {
						return {
							asin: item.asin,
							pId: index,
							value: item.title,
							title: item.title,
						};
					}
				);

				if (products.length === 0) setSearchResults([]);
				else setSearchResults(products);

				setLoading(false);
			} else console.log('declined');
		})();
	}, [debouncedValue]);

	return (
		<TreeSelect
			showArrow={false}
			showSearch={true}
			style={{ width: '40%', top: 0, ...styles }}
			dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			placeholder="Search data..."
			allowClear
			treeDefaultExpandAll
			value={value}
			onChange={setValue}
			onSearch={setValue}
			onClear={() => setSearchResults([])}
			treeDataSimpleMode
			dropdownRender={() => (
				<SearchHandling loading={loading} data={searchResults} />
			)}
		/>
	);
};

// treeData={searchResults}

export default Search;
