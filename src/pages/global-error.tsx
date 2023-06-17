import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	height: 350px;
	width: 100%;

	p {
		font-size: 16pt;
		font-style: italic;
		font-weight: bold;
	}
`;

const Error = () => {
	return (
		<Wrapper>
			<p>Occur some unknown error</p>
		</Wrapper>
	);
};

export default Error;
