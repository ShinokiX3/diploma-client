import React, { useState } from 'react';
import Link from 'next/link';
import { IAmazonCategory } from '@/types/categories.interface';
import { AmazonCategory } from '@/services/Amazon/AmazonCategory';
import { Drawer } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';

// TODO: bring into global scss variables

const DrawLinkWrapper = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-radius: 0.2rem;
	padding: 7px;
	transition: background-color 0.2s ease;

	a {
		color: black;
	}

	&:hover {
		background-color: #f0f0f0;
	}
`;

const DrawLink = styled.div`
	/* padding: 5px; */
	width: 100%;
	font-size: var(--fs-regular);
`;

const DrawContent = ({ categories, handleCategory, setShouldChildOpen }) => {
	return (
		<div>
			{categories?.map((category) => (
				<DrawLinkWrapper key={category.id}>
					<Link href={`/category/${category.id}`} style={{ width: '100%' }}>
						<DrawLink>{category.name}</DrawLink>
					</Link>
				</DrawLinkWrapper>
			))}
		</div>
	);
};

const DrawCategory = ({ categories }) => {
	const [details, setDetails] = useState<[IAmazonCategory[]] | []>([]);
	const [shouldChildOpen, setShouldChildOpen] = useState(false);

	const user = useTypedSelector((state) => state.user);
	const { toggleUpperDrawer } = useActions();

	const handleCategory = async (category: IAmazonCategory) => {
		if (category && category.has_children === true) {
			const response = await AmazonCategory.getCategory(category.id);

			setDetails(response);
			setShouldChildOpen(true);
		}
	};

	return (
		<>
			<Drawer
				headerStyle={{ fontSize: '18t' }}
				title="Categories"
				placement="left"
				closable={false}
				onClose={() => toggleUpperDrawer(!user.upperDrawer)}
				open={user.upperDrawer}
				key="left"
			>
				<DrawContent
					categories={categories}
					handleCategory={handleCategory}
					setShouldChildOpen={setShouldChildOpen}
				/>
			</Drawer>
			{/* <Drawer
				title="Categories"
				placement="left"
				width={380}
				maskStyle={{ background: 'transparent' }}
				closable={false}
				onClose={() => setShouldChildOpen(!shouldChildOpen)}
				open={shouldChildOpen}
			>
				<DrawContent
					categories={details}
					handleCategory={handleCategory}
					setShouldChildOpen={setShouldChildOpen}
				/>
			</Drawer> */}
		</>
	);
};

export default DrawCategory;
