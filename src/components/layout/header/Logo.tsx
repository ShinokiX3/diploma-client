import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledLogo = styled.span`
	font-family: var(--ff-primary);
	font-size: var(--fs-primary);
	background-color: var(--back-color);
	gap: 20px;

	h3 {
		cursor: pointer;
		user-select: none;
	}

	@media (max-width: 700px) {
		font-size: 16pt;
	}
`;

const Logo = () => {
	const user = useTypedSelector((state) => state.user);
	const { toggleUpperDrawer } = useActions();

	return (
		<StyledLogo className="ju-al-center">
			<MenuOutlined
				style={{ width: '20px', height: '20px' }}
				onClick={() => toggleUpperDrawer(!user.upperDrawer)}
			/>
			<h3>Shinoki store</h3>
		</StyledLogo>
	);
};

export default Logo;
