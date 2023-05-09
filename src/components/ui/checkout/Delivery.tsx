import React, { useState } from 'react';
import styled from 'styled-components';
import City from './delivery/City';
import Type from './delivery/Type';

const Wrapper = styled.div``;

export const Item = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	border: 1px solid gray;
	height: fit-content;
	border-radius: 0.2rem;
	padding: 15px;
	cursor: pointer;
	margin: 10px 0px;
	p {
		width: fit-content;
	}
	svg {
		width: 25px;
		height: 25px;
	}
`;

// TODO: Need to describe NP's interface

const Delivery = () => {
	return (
		<Wrapper>
			<p style={{ fontSize: '16pt' }}>Delivery:</p>
			<div>
				<City />
				<Type />
			</div>
		</Wrapper>
	);
};

export default Delivery;
