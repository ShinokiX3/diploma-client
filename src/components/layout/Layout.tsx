import React, { useEffect, useState } from 'react';
import Header from './header/Header';

import DrawCategory from '../ui/drawer/DrawCategory';
import { CategoryService } from '@/services/Server/ServerCategory';
import styled from 'styled-components';

interface ILayout {
	children?: React.ReactNode;
}

const Main = styled.main`
	width: 100%;
`;

const Section = styled.section`
	display: flex;
`;

// TODO: change categories variable to object like {data, changeData, loading, error} or set 'em to redux storage

const Layout: React.FC<ILayout> = ({ children }) => {
	const [categories, setCategories] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		(async () => {
			const response = await CategoryService.getAllCategories();
			if (response) {
				setCategories(response);
			} else setCategories([]);
			setLoading(false);
		})();
	}, []);

	if (loading) return <div>Loading...</div>;

	// TODO: create recurcive function for fetching data

	return (
		<Main>
			<Header />
			<DrawCategory categories={categories} />
			<Section>{children}</Section>
		</Main>
	);
};

export default Layout;
