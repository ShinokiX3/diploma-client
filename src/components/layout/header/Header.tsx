import styled from 'styled-components';
import Search from '@/components/ui/search/Search';
import Nav from './Nav';
import Logo from './Logo';

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 9px 15px;

	svg {
		cursor: pointer;

		width: var(--ico-w);
		height: var(--ico-h);
	}
`;

const Wrapper = styled.div`
	div:last-child {
		display: none;
	}

	@media (max-width: 700px) {
		div:last-child {
			display: block;
		}
		.ant-select {
			display: none;
		}
	}
`;

const Header = () => {
	console.log(window.innerWidth);

	return (
		<Wrapper>
			<StyledHeader>
				<Logo />
				<Search />
				<Nav />
			</StyledHeader>
			<Search
				styles={{
					width: 'auto',
					margin: '7px 10px',
					marginTop: '0px',
				}}
			/>
		</Wrapper>
	);
};

export default Header;
