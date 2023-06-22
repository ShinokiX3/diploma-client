import styled from 'styled-components';
import Title from './Title';
import { UserOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';

const PersonalWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 20px;

	@media (max-width: 740px) {
		& {
			grid-template-columns: 1fr;
		}
	}
`;

const PersonalItem = styled.div`
	font-size: 14pt;

	p:first-child {
		color: gray;
		margin-bottom: 10px;
	}
`;

const ControlsButtons = styled.div`
	margin-top: 30px;
	display: flex;
	gap: 10px;
`;

interface IPersonal {
	user: any;
}

const Personal: React.FC<IPersonal> = ({ user }) => {
	if (user.name === '') return <Empty description="Need to login" />;

	return (
		<>
			<Title>
				<UserOutlined /> Особисті дані
			</Title>
			<PersonalWrapper>
				<PersonalItem>
					<p>{`Ім'я`}:</p>
					<p>{user.name.split(' ')[0]}</p>
				</PersonalItem>
				<PersonalItem>
					<p>Прізвище:</p>
					<p>{user.name.split(' ')[1] || 'Unknown'}</p>
				</PersonalItem>
				<PersonalItem>
					<p>Дата реєстрації:</p>
					<p>{user.joindate}</p>
				</PersonalItem>
				<PersonalItem>
					<p>Номер телефону:</p>
					<p>{user.phone}</p>
				</PersonalItem>
				<PersonalItem>
					<p>Email:</p>
					<p>{user.email}</p>
				</PersonalItem>
			</PersonalWrapper>
			<ControlsButtons>
				<Button>Редагувати</Button>
				<Button>Видалити</Button>
			</ControlsButtons>
		</>
	);
};

export default Personal;
