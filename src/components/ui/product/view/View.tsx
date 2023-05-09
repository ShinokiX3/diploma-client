import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { Images, Main_image, Videos } from '@/types/product.interface';
import { Carousel, Modal } from 'antd';
import {
	LeftOutlined,
	PlayCircleOutlined,
	RightOutlined,
} from '@ant-design/icons';
import { CarouselRef } from 'antd/es/carousel';
import styled from 'styled-components';

interface IView {
	data: {
		main_image: Main_image;
		images: Images[];
		videos: Videos[];
		videos_flat: string;
	};
}

const contentStyle: React.CSSProperties = {
	margin: 0,
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '400px',
};

const Wrapper = styled.div`
	gap: 20px;
	flex-direction: column;
	width: 40%;

	@media (max-width: 700px) {
		& {
			width: calc(100vw - 50px);
		}
	}
`;

const SmallImageWrapper = styled.div`
	padding: 2px;
	width: 50px;
	height: 50px;
	border: 1px solid lightgray;
	border-radius: 0.2rem;
	overflow: hidden;
	cursor: pointer;
`;

const SmallVideoWrapper = styled.div<{ selected: boolean }>`
	padding: 2px;
	width: 50px;
	height: 50px;
	border: 1px solid ${(props) => (props.selected ? 'red' : 'lightgray')};
	border-radius: 0.2rem;
	position: relative;
	cursor: pointer;
`;

const View: React.FC<IView> = ({ data }) => {
	const [currentImage, setCurrentImage] = useState(0);
	const slickRef = useRef<CarouselRef | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeVideo, setActiveVideo] = useState(0);

	const { main_image, images, videos, videos_flat } = data;

	const handleMainImage = (slide: number) => {
		setCurrentImage(slide);
		if (slickRef.current !== null) slickRef.current.goTo(slide);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Wrapper className="ju-al-center">
			<Carousel
				arrows
				dots={false}
				afterChange={(currentSlide) => {
					setCurrentImage(currentSlide);
				}}
				prevArrow={<LeftOutlined />}
				nextArrow={<RightOutlined />}
				style={{ height: '425px', width: '500px', display: 'flex' }}
				ref={slickRef}
			>
				{images?.map((image) => (
					<div key={image.link}>
						<div style={contentStyle}>
							{/* TODO: set global variables for these images, small, biggest, regular */}
							<Image
								width={0}
								height={0}
								style={{
									width: 'auto',
									maxWidth: '80%',
									maxHeight: '80%',
									height: 'auto',
								}}
								alt="example"
								loader={() => image.link}
								src={image.link}
							/>
						</div>
					</div>
				))}
			</Carousel>
			<div style={{ overflow: 'auto', width: '100%' }}>
				<div
					className="ju-al-center"
					style={{ gap: '10px', width: 'max-content' }}
				>
					{images?.map((image, index) => (
						<SmallImageWrapper
							key={image.link}
							className="ju-al-center"
							onClick={() => handleMainImage(index)}
							style={index === currentImage ? { borderColor: 'red' } : {}}
						>
							<Image
								width={0}
								height={0}
								style={{
									width: 'auto',
									maxWidth: '90%',
									maxHeight: '90%',
									height: 'auto',
								}}
								alt="small-img"
								loader={() => image.link}
								src={image.link}
							/>
						</SmallImageWrapper>
					))}
					{videos?.map((video, index) => (
						// TODO: move to new component
						<SmallVideoWrapper
							selected={index === activeVideo}
							key={video.thumbnail}
							className="ju-al-center"
							onClick={() => {
								setActiveVideo(index);
								showModal();
							}}
						>
							<Image
								width={40}
								height={25}
								alt="sm-image"
								loader={() => video.thumbnail}
								src={video.thumbnail}
							/>
							<PlayCircleOutlined
								style={{
									position: 'absolute',
									left: '50%',
									transform: 'translate(-50%, 0%)',
									color: 'white',
									fontSize: '30px',
								}}
							/>
						</SmallVideoWrapper>
					))}
				</div>
			</div>
			<Modal
				title="Videos"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={'fit-content'}
				footer={null}
			>
				<div style={{ display: 'flex', gap: '10px' }}>
					<video
						height={videos?.[activeVideo]?.height}
						width={videos?.[activeVideo]?.width}
						src={videos?.[activeVideo].link}
						controls
						autoPlay
					/>
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
					>
						{videos?.map((video, index) => (
							<SmallVideoWrapper
								selected={index === activeVideo}
								key={video.thumbnail}
								className="ju-al-center"
								onClick={() => setActiveVideo(index)}
							>
								<Image
									width={40}
									height={25}
									alt="sm-image"
									loader={() => video.thumbnail}
									src={video.thumbnail}
								/>
								<PlayCircleOutlined
									style={{
										position: 'absolute',
										left: '50%',
										transform: 'translate(-50%, 0%)',
										color: 'white',
										fontSize: '30px',
									}}
								/>
							</SmallVideoWrapper>
						))}
					</div>
				</div>
			</Modal>
		</Wrapper>
	);
};

export default View;
