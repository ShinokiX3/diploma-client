import React from 'react';
import Image from 'next/image';
import { Avatar, Button, Collapse, Rate } from 'antd';
import {
	CaretRightOutlined,
	DislikeOutlined,
	HeartOutlined,
	LikeOutlined,
	UserOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const { Panel } = Collapse;

const panelStyle = {
	// marginBottom: 24,
	background: '#lightgrey',
	borderRadius: '0.2rem',
	border: 'none',
};

const Header = ({ data }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: '5px',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				{data?.profile?.image ? (
					<Avatar
						size="large"
						icon={
							<Image
								width={0}
								height={0}
								style={{ width: 'auto', height: '100%' }}
								alt=""
								loader={() => data.profile?.image}
								src={data?.profile?.image}
							/>
						}
					/>
				) : (
					<Avatar size="large" icon={<UserOutlined />} />
				)}
				<p style={{ fontWeight: 'bolder' }}>{data?.profile?.name}: </p>
				<p>{data.title}</p>
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '10px',
				}}
			>
				<p>{data.date.raw}</p>
				<div>
					<Rate value={data.rating} disabled />
					<span className="ant-rate-text">{data.rating}</span>
					<Button type="ghost" style={{ marginLeft: '5px' }}>
						<span>Helpful</span>
						<HeartOutlined style={{ width: '25px', height: '25px' }} />
					</Button>
				</div>
			</div>
		</div>
	);
};

const Body = ({ data }) => {
	return (
		<Collapse
			bordered={false}
			defaultActiveKey={['1']}
			style={{
				background: '#lightgrey',
				height: 'fit-content',
				width: 'calc(100vw - 50px)',
			}}
			expandIcon={({ isActive }) => (
				<CaretRightOutlined rotate={true ? 90 : 0} />
			)}
		>
			<Panel key="2" header="Show comment" style={panelStyle}>
				<p>{data?.body}</p>
			</Panel>
		</Collapse>
	);
};

const Images = ({ data }) => {
	return (
		<div style={{ display: 'flex' }}>
			{data?.images?.map((image, index) => (
				<div key={image.link + index} style={{ marginRight: '10px' }}>
					<Image
						width={100}
						height={100}
						alt=""
						loader={() => image.link}
						src={image.link}
					/>
				</div>
			))}
		</div>
	);
};

const Review = ({ data }) => {
	return (
		<div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
			<Header data={data} />
			<Body data={data} />
			<Images data={data} />
		</div>
	);
};

export default Review;
