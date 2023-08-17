import { AuthService, IRegister } from '@/services/Server/ServerAuth';
import { Button, DatePicker, Form, Input, Result, Spin } from 'antd';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Controls } from './Controls';
import { Line } from '@/components/ui/common/Line';
import styled from 'styled-components';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import Spinner from '@/components/ui/common/Spinner';
import { useActions } from '@/hooks/useActions';

interface IRegisterForm {
	children: ReactNode;
}

interface IRegisterData {
	email: string;
	phone: string;
	firstname: string;
	lastname: string;
	birthdate: Date;
	password: string;
	repeatPassword: string;
}

const ValidP = styled.p`
	font-size: 12pt;
	color: red;
`;

const RegisterForm: React.FC<IRegisterForm> = ({ children }) => {
	const [validePassword, setValidePassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState('');

	const [data, setData] = useState<IRegisterData>({
		firstname: '',
		lastname: '',
		birthdate: new Date(),
		email: '',
		password: '',
		repeatPassword: '',
		phone: '',
	});

	const { login } = useActions();

	useEffect(() => {
		if (data.password && data.repeatPassword === data.password) {
			setValidePassword(true);
		} else setValidePassword(false);
	}, [data.password, data.repeatPassword]);

	const signup = useCallback(() => {
		return async () => {
			if (validePassword) {
				setLoading(true);
				const name = `${data.firstname} ${data.lastname}`;
				const resp = await AuthService.register({
					name,
					joindate: data.birthdate,
					phone: data.phone,
					email: data.email,
					password: data.password,
				});
				if (resp?.token) {
					setStatus('success');
					login({ token: resp.token, user: resp.user[0] });
				} else {
					setStatus('error');
				}
				setLoading(false);
			}
		};
	}, [validePassword, data, login]);

	if (loading) return <Spinner />;

	if (status === 'success') {
		setTimeout(() => {
			setStatus('');
		}, 3000);

		return <Result icon={<SmileOutlined />} title="Вас зареєстровано!" />;
	}

	if (status === 'error') {
		setTimeout(() => {
			setStatus('');
		}, 3000);

		return (
			<Result
				status="error"
				title="Помилка реєстрації"
				subTitle="Щось пішло не так."
			/>
		);
	}

	return (
		<Form style={{ display: 'grid', gap: '10px' }}>
			<Input
				required
				placeholder="Ім'я"
				value={data.firstname}
				onChange={(e) => setData({ ...data, firstname: e.target.value })}
			/>
			<Input
				required
				placeholder="Прізвище"
				value={data.lastname}
				onChange={(e) => setData({ ...data, lastname: e.target.value })}
			/>

			<Line />

			<Input
				required
				placeholder="Номер телефону"
				type="phonenumber"
				value={data.phone}
				onChange={(e) => setData({ ...data, phone: e.target.value })}
			/>
			<Input
				required
				placeholder="Email"
				type="email"
				value={data.email}
				onChange={(e) => setData({ ...data, email: e.target.value })}
			/>

			<DatePicker
				placeholder="Дата народження"
				onChange={(_, dateString: string) => {
					setData({ ...data, birthdate: new Date(dateString) });
				}}
			/>

			<Line />

			<Input
				required
				placeholder="Password"
				type="password"
				value={data.password}
				onChange={(e) => setData({ ...data, password: e.target.value })}
			/>
			<Input
				required
				type="password"
				placeholder="Repeat password"
				value={data.repeatPassword}
				onChange={(e) => setData({ ...data, repeatPassword: e.target.value })}
			/>

			{!validePassword && data.password ? (
				<ValidP>Паролі не співпадають</ValidP>
			) : (
				<></>
			)}

			<Controls>
				{children}
				<Button onClick={signup()}>Зареєструватись</Button>
			</Controls>
		</Form>
	);
};

export default RegisterForm;
