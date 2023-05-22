import Delivery from '@/components/ui/checkout/Delivery';
import Eventually from '@/components/ui/checkout/Eventually';
import Order from '@/components/ui/checkout/Order';
import Personal from '@/components/ui/checkout/Personal';
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	justify-items: center;
	width: 100%;

	@media (max-width: 1100px) {
		& {
			grid-template-columns: 1fr;
		}
	}
`;

const ContentWrapper = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding-bottom: 100px;

	@media (max-width: 1100px) {
		& {
			padding-bottom: 0px;
		}
	}
`;

const Title = styled.p`
	font-size: 20pt;
`;

const Checkout = () => {
	const [personalInfo, setPersonalInfo] = useState({
		firstname: '',
		lastname: '',
		phone: '',
	});

	const [delivery, setDelivery] = useState([
		{
			city: '',
		},
	]);

	return (
		<Wrapper>
			<ContentWrapper>
				<Title>Чек</Title>
				<Personal />
				<Order />
				<Delivery />
			</ContentWrapper>
			<Eventually />
		</Wrapper>
	);
};

{
	/* <Wrapper style={{flexDirection: 'row'}}>
    <div style={{width: '65%'}}>
        <p style={{fontSize: '20pt'}}>Checkout</p>
        <Personal setData={setPersonalInfo} />
        <Order />   
        <Delivery />
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Check>
            Check
        </Check>
    </div>
</Wrapper>

const Check = styled.div`
    box-shadow: 4px 4px 16px 3px #CBC8CE;
    background-color: white;
    padding: 20px;
    border-radius: 1rem;
    width: 270px;
    height: 400px;
` */
}

export default Checkout;
