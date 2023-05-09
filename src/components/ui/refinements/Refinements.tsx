import React, { useEffect, useState } from 'react';
import { IRefinements } from '@/types/refinements.interface';

import { Button, InputNumber, Rate, SelectProps, Slider } from 'antd';
import { Select, Space } from 'antd';
import styled from 'styled-components';

interface ICRefinements {
	data: IRefinements;
}

interface ItemProps {
	label: string;
	value: string;
}

const Wrapper = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	padding-top: 10px;
	height: auto;
	width: 100%;

	@media (max-width: 700px) {
		& {
			position: inherit;
			flex-direction: column;
			padding-top: 0px;
		}
	}
`;

const RefiP = styled.p`
	font-size: 15pt;
`;

const ItemsWrapper = styled.div<{ shouldShow: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 15px;

	@media (max-width: 700px) {
		& {
			overflow-y: hidden;
			transition: height 0.6s ease-in-out;
			height: ${(props) => (props.shouldShow ? '100%' : '0px')};
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

// TODO: move to utis

const titled = (title: string) => {
	console.log(title.split('_').join(' '));
};

const Refinements: React.FC<ICRefinements> = ({ data }) => {
	const [shouldShow, setShouldShow] = useState(false);
	const [value, setValue] = useState({
		prime: [],
		departments: [],
		reviews: [],
		price: [],
		brand: [],
		cookware_and_bakeware_material: [],
		global_store: [],
		condition: [],
		new_arrivals: [],
		international_shipping: [],
		availability: [],
		seller: [],
	});

	const [rateValue, setRateValue] = useState('');

	const selectProps: SelectProps = {
		mode: 'multiple',
		style: { width: '100%' },
		placeholder: 'Select Item...',
		maxTagCount: 'responsive',
	};

	const handleRefinements = () => {
		setShouldShow(!shouldShow);
		if (!shouldShow === false) {
			window.scrollTo(0, 0);
		}
	};

	return (
		<Wrapper>
			<ItemsWrapper shouldShow={shouldShow}>
				{Object.entries(data).map(([id, items], index) => {
					const title = items[0].refinement_display_name;

					if (title === 'Reviews') {
						return (
							<>
								<RefiP key={index}>{title}</RefiP>
								<Rate
									tooltips={items.map((item) => item.name).reverse()}
									value={rateValue}
									onChange={setRateValue}
								/>
							</>
						);
					}

					if (title === 'Price') {
						return (
							<>
								<RefiP key={index}>{title}</RefiP>
								<Space>
									<InputNumber
										defaultValue={1000}
										formatter={(value) =>
											`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}
									/>
									<InputNumber
										defaultValue={1000}
										formatter={(value) =>
											`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}
									/>
									<Button>Submit</Button>
								</Space>
								<Slider
									range={{ draggableTrack: true }}
									defaultValue={[20, 50]}
								/>
							</>
						);
					}

					if (
						title === 'Deals & Discounts' ||
						title === 'New & Upcoming' ||
						title === 'Condition'
					) {
						console.log(items);
						return (
							<>
								<RefiP key={index}>{title}</RefiP>
								<Space>
									{items.map((item) => (
										<Button
											style={{ fontSize: '11pt' }}
											type="text"
											key={item.name}
										>
											{item.name}
										</Button>
									))}
								</Space>
							</>
						);
					}

					if (
						title === 'From Our Brands' ||
						title === 'Amazon Global Store' ||
						title === 'Prime'
					) {
						return <></>;
					}

					return (
						<>
							<RefiP key={index}>{title}</RefiP>
							<Select
								{...selectProps}
								fieldNames={{ label: 'name', value: 'value' }}
								options={data[id]}
								value={value[id]}
								onChange={(newValue: string[], option) => {
									console.log(newValue, option);
									setValue(newValue);
								}}
							/>
						</>
					);
				})}
			</ItemsWrapper>
			<ShowRefinements onClick={handleRefinements}>
				Show Refinements
			</ShowRefinements>
		</Wrapper>
	);
};

export default Refinements;
