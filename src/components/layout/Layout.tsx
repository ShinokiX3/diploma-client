import React, { useEffect, useState } from 'react';
import Header from './header/Header';

import DrawCategory from '../ui/drawer/DrawCategory';
import { CategoryService } from '@/services/Server/ServerCategory';
import styled from 'styled-components';
import { Spin } from 'antd';

import NextProgress from 'nextjs-progressbar';

interface ILayout {
	children?: React.ReactNode;
}

const Main = styled.main`
	width: 100%;
`;

const Section = styled.section`
	display: flex;
`;

const LoaderWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
`;

const Layout: React.FC<ILayout> = ({ children }) => {
	const [categories, setCategories] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		(async () => {
			const response = await CategoryService.getAllCategories();
			if (response) {
				setCategories(response);
			} else setCategories([]);
		})();
	}, []);

	useEffect(() => {
		if (categories) setLoading(false);
	}, [categories]);

	if (loading)
		return (
			<LoaderWrapper>
				<Spin size="large" />
			</LoaderWrapper>
		);

	return (
		<Main>
			<NextProgress
				color="#a29fff"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				options={{
					showSpinner: false,
				}}
			/>
			<Header />
			<DrawCategory categories={categories} />
			<Section>{children}</Section>
		</Main>
	);
};

export default Layout;
