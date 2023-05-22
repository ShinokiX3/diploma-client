import React, { useRef, useState } from 'react';
// import Image from 'next/image';
import {
	IAttributesResponse,
	IProduct,
	Images,
	Main_image,
	Videos,
} from '@/types/product.interface';
import { Carousel, Image, Modal } from 'antd';
import {
	LeftOutlined,
	PlayCircleOutlined,
	RightOutlined,
} from '@ant-design/icons';
import { CarouselRef } from 'antd/es/carousel';
import styled from 'styled-components';
import { IAttribute, IProduct } from '@/types/product.interface';

interface IView {
	data: { product: IProduct; attributes: IAttributesResponse };
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
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	width: 70%;
	min-width: 505px;
	max-width: 800px;

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

	const { picture } = data.product;

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
		<Wrapper>
			{/* <Image
				width={0}
				height={0}
				style={{
					width: 'auto',
					maxWidth: '80%',
					maxHeight: '80%',
					height: 'auto',
				}}
				alt="example"
				loader={() => `http://localhost:3000/${picture}`}
				src={`http://localhost:3000/${picture}`}
			/> */}
			<Image
				width={'auto'}
				height={'auto'}
				alt="product-image"
				src={`http://localhost:3000/${picture}`}
				fallback="data:image/png;base64,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"
			/>
			{/* <Modal
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
			</Modal> */}
		</Wrapper>
	);
};

export default View;
