import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface IAuthModal {
	shouldShow: boolean;
	setShouldShow: Function;
}

const AuthModal: React.FC<IAuthModal> = ({ shouldShow, setShouldShow }) => {
	const [authType, setAuthType] = useState('login');

	return (
		<Modal
			title="Авторизація"
			centered
			open={shouldShow}
			onCancel={() => setShouldShow(false)}
			footer={<></>}
		>
			{authType === 'login' ? (
				<LoginForm>
					<Button type="link" onClick={() => setAuthType('register')}>
						Зареєструватись
					</Button>
				</LoginForm>
			) : (
				<RegisterForm>
					<Button type="link" onClick={() => setAuthType('login')}>
						Увійти
					</Button>
				</RegisterForm>
			)}
		</Modal>
	);
};

export default AuthModal;
