import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	align-items: center;
	justify-content: center;
`;

interface IList<T, C> {
	data: T;
	ItemWrapper: C;
}

const List: React.FC<any> = ({ data, ItemWrapper }) => {
	return (
		<></>
		// <Wrapper>
		// 	{data.map((item) => (
		// 		<ItemWrapper key={data.title || data.name} data={item} />
		// 	))}
		// </Wrapper>
	);
};

export default List;
