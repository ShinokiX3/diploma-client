import React from 'react';
import { ShadowWrapper } from '../cart/ShadowWrapper';
import styled from 'styled-components';
import { Line } from '../common/Line';
import { Button } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	margin-top: 60px;
	justify-content: center;

	span {
		width: 100%;
		height: 1px;
	}

	@media (max-width: 1100px) {
		margin-top: 0px;
		margin-bottom: 40px;
	}
`;

const AgreementWrapper = styled.div`
	display: grid;
	gap: 10px;
	margin-top: 10px;
	color: gray;
	font-size: 12pt;
`;

const Eventually = () => {
	const items = useTypedSelector((state) => state.cart.items);

	return (
		<Wrapper>
			<div
				style={{
					position: 'sticky',
					top: '0',
					height: 'fit-content',
					paddingTop: '40px',
				}}
			>
				<ShadowWrapper style={{ width: '300px' }}>
					<div>
						<h2 style={{ fontWeight: '16pt' }}>Total</h2>
					</div>
					<Line />
					<div>{items.length} Products</div>
					<Line />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>Order cost</div>
						<div>Free</div>
					</div>
					<Line />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>All:</div>
						<div>
							$
							{Math.floor(
								items.reduce(
									(accu, curr) => (accu += curr.quantity * curr.price.value),
									0
								)
							)}
						</div>
					</div>
					<Line />
					<Button style={{ width: '100%', height: '40px' }}>
						Confirm order
					</Button>
					<AgreementWrapper>
						<p>By confirming the order, I accept the conditions:</p>
						<p>
							- Regulation on the processing and protection of personal data
						</p>
						<p>- User agreement</p>
					</AgreementWrapper>
				</ShadowWrapper>
			</div>
		</Wrapper>
	);
};

export default Eventually;
