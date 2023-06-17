import React, { useState } from 'react';
import { IRefinements } from '@/types/refinements.interface';
import { Select } from 'antd';
import styled from 'styled-components';
import { useActions } from '@/hooks/useActions';

interface ICRefinements {
	data: IRefinements;
}

const Wrapper = styled.div`
	position: sticky;
	min-width: 230px;
	top: 0;
	padding-top: 25px;
	height: fit-content;

	@media (max-width: 700px) {
		& {
			min-width: auto;
			height: auto;
			position: inherit;
			flex-direction: column;
			padding-top: 0px;
		}
	}
`;

const ItemsWrapper = styled.div<{ shouldShow: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;

	@media (max-width: 700px) {
		& {
			overflow-y: hidden;
			transition: height 0.6s ease-in-out;
			height: ${(props) => (props.shouldShow ? 'calc(100% - 50px)' : '0px')};
		}
	}
`;

const ShowRefinements = styled.div`
	width: 100%;
	border-top: 1px solid lightgray;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 10px;
	margin-top: 20px;
	cursor: pointer;

	transition: color 0.3s ease;
	display: none;

	&:hover {
		color: #ff3838;
	}

	@media (max-width: 700px) {
		display: flex;
	}
`;

const RefiWrapper = styled.div`
	padding: 10px;
	width: 100%;
	display: flex;
	gap: 10px;
	flex-direction: column;

	p {
		font-size: 12pt;
		margin-bottom: 4px;
		color: gray;
	}

	.ant-select {
		width: 100%;
	}

	@media (max-width: 700px) {
		& {
			width: calc(100% - 20px);
		}
	}
`;

const attributesUA = {
	brand: 'Бренд',
	kind: 'Вид',
	manufacturer: 'Виробник',
	packing: 'Упаковка',
	capacities: 'Ємність',
	strengths: 'Міцність (Abv)',
};

const Refinements: React.FC<ICRefinements> = ({ data }) => {
	const [shouldShow, setShouldShow] = useState(false);
	const [value, setValue] = useState({
		brand: [],
		manufacturer: [],
		capacities: [],
		strengths: [],
		kind: [],
		packing: [],
	});

	const { setFilter } = useActions();

	const handleRefinements = () => {
		setShouldShow(!shouldShow);
		if (!shouldShow === false) {
			window.scrollTo(0, 0);
		}
	};

	const handleSelect = (key: string, selectValue: string[]) => {
		setValue({ ...value, ...{ [key]: selectValue } });
		setFilter({ type: key, value: selectValue });
	};

	return (
		<Wrapper>
			<ItemsWrapper shouldShow={shouldShow}>
				{data ? (
					Object.keys(data).map((key: string) => (
						<RefiWrapper key={key}>
							<p>{attributesUA[key]}</p>
							<Select
								mode="multiple"
								maxTagCount="responsive"
								onChange={(selectValue: string[]) => {
									handleSelect(key, selectValue);
								}}
							>
								{data[key].map((attribute) => (
									<Select.Option key={attribute._id} value={attribute._id}>
										{attribute.value}
									</Select.Option>
								))}
							</Select>
						</RefiWrapper>
					))
				) : (
					<div>Loading...</div>
				)}
			</ItemsWrapper>
			<ShowRefinements onClick={handleRefinements}>Фільтрація</ShowRefinements>
		</Wrapper>
	);
};

export default Refinements;
