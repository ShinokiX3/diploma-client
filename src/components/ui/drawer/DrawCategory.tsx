import React, { useState } from 'react';
import Link from 'next/link';
import { ICategory } from '@/types/categories.interface';
import { Drawer } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import styled from 'styled-components';
import {
	FacebookOutlined,
	GoogleOutlined,
	InstagramOutlined,
	RightOutlined,
	TwitterOutlined,
	YoutubeOutlined,
} from '@ant-design/icons';
import { Line } from '../common/Line';
import { imageIcons } from '../../../../design/icons/index';
import Image from 'next/image';

// TODO: bring into global scss variables

const DrawLinkWrapper = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 95%;
	border-radius: 0.2rem;
	padding: 10px;
	padding-right: 0px;
	/* border-bottom: 1px solid lightgray; */
	transition: background-color 0.2s ease;

	a {
		color: black;
	}

	&:hover {
		border-left: 2px solid red;
		background-color: #f0f0f0;
	}
`;

const SocialsWrapper = styled.div`
	display: flex;

	svg {
		color: black;
	}
`;

const DrawLink = styled.div`
	width: 100%;
	font-size: var(--fs-regular);
`;

interface IDrawContent {
	categories: ICategory[];
	handleCategory: Function;
	setShouldChildOpen: Function;
}

const DrawContent: React.FC<IDrawContent> = ({
	categories,
	handleCategory,
	setShouldChildOpen,
}) => {
	return (
		<div>
			{categories?.map((category, index) => (
				<DrawLinkWrapper key={category._id}>
					<Link
						href={{
							pathname: `/category/${category._id}`,
							query: { title: category.title },
						}}
						style={{ width: '100%', display: 'flex', gap: '12px' }}
					>
						<Image
							width={25}
							height={25}
							src={imageIcons[index]}
							alt="category-icon"
						/>
						<DrawLink>{category.title}</DrawLink>
					</Link>
				</DrawLinkWrapper>
			))}
		</div>
	);
};

interface IDrawCategory {
	categories: ICategory[];
}

const DrawCategory: React.FC<IDrawCategory> = ({ categories }) => {
	const [details, setDetails] = useState<[ICategory[]] | []>([]);
	const [shouldChildOpen, setShouldChildOpen] = useState(false);

	const user = useTypedSelector((state) => state.user);
	const { toggleUpperDrawer } = useActions();

	const handleCategory = async (category: ICategory) => {};

	return (
		<>
			<Drawer
				headerStyle={{ fontSize: '18t' }}
				title="Меню"
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
				<Line />
				<DrawLinkWrapper>
					<Link href={`/category/${''}`} style={{ width: '100%' }}>
						<DrawLink>Доставка и оплата</DrawLink>
					</Link>
				</DrawLinkWrapper>
				<DrawLinkWrapper>
					<Link href={`/category/${''}`} style={{ width: '100%' }}>
						<DrawLink>Партнерам</DrawLink>
					</Link>
				</DrawLinkWrapper>
				<DrawLinkWrapper>
					<Link href={`/category/${''}`} style={{ width: '100%' }}>
						<DrawLink>Про нас</DrawLink>
					</Link>
				</DrawLinkWrapper>
				<Line />
				<SocialsWrapper>
					<Link href={`/${''}`} style={{ width: '50%' }}>
						<DrawLink>
							<GoogleOutlined />
						</DrawLink>
					</Link>
					<Link href={`/${''}`} style={{ width: '50%' }}>
						<DrawLink>
							<YoutubeOutlined />
						</DrawLink>
					</Link>
					<Link href={`/${''}`} style={{ width: '50%' }}>
						<DrawLink>
							<FacebookOutlined />
						</DrawLink>
					</Link>
					<Link href={`/${''}`} style={{ width: '50%' }}>
						<DrawLink>
							<TwitterOutlined />
						</DrawLink>
					</Link>
					<Link href={`/${''}`} style={{ width: '60px' }}>
						<DrawLink>
							<InstagramOutlined />
						</DrawLink>
					</Link>
				</SocialsWrapper>
			</Drawer>
		</>
	);
};

export default DrawCategory;
