import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PlayCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Avatar, Modal } from 'antd';
import VideoJS from '../video/VideoJS';

const Wrapper = styled.div`
	width: 96vw;
	overflow: hidden;

	.swiper-slide {
		margin-right: 15px;
		border-radius: 0.5rem !important;
		overflow: hidden;
		cursor: pointer;
	}
`;

const InfluencerInfo = styled.div<{ bgImage: string }>`
	display: grid;
	grid-template-columns: 0.1fr 1fr;
	gap: 10px;
	height: 67px;
	background-color: hsla(0, 0%, 7%, 0.5);
	/* background-color: rgba(black, 0.3); */
	position: relative;
	z-index: 20;
	overflow: hidden;
	padding: 10px;

	& span,
	div {
		z-index: 20;
	}

	&::before {
		display: block;
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		opacity: 1;
		filter: blur(10px);
		background-image: url(${(props) => props.bgImage});
		/* transform: scale(1.75); */
		z-index: 20;
	}

	p {
		color: white;
		/* text-shadow: 0.5px 0.5px 0.5px black; */
	}

	p:first-child {
		font-size: 12pt;
		font-weight: bold;
	}

	p:last-child {
		font-size: 10pt;
	}
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

const VideoWrapper = styled.div`
	display: flex;
	gap: 10px;
	height: 415px;
	overflow-y: auto;

	div[data-vjs-player='true'] {
		width: 50vw;
	}
`;

const VideosPreview = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

// TODO: move to product's types file

interface IVideoReviews {
	data: {
		product: {
			videos_additional: [
				{
					id: string;
					video_previews: string;
					video_url: string;
					profile_image_url: string;
					video_image_url: string;
					title: string;
					public_name: string;
				}
			];
		};
	};
}

const VideoReviews: React.FC<IVideoReviews> = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeVideo, setActiveVideo] = useState(0);
	const videosRef = useRef<any>();
	const playerRef = React.useRef(null);

	useEffect(() => {
		videosRef.current = videosRef.current.slice(
			0,
			data.product?.videos_additional?.length
		);
	}, [data.product]);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handlePlayerReady = (player: any) => {
		playerRef.current = player;

		player.on('waiting', () => {});

		player.on('dispose', () => {});
	};

	return (
		<Wrapper>
			<Swiper
				spaceBetween={0}
				slidesPerView={4}
				width={1200}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{data.product?.videos_additional?.map((item, index) => (
					<SwiperSlide
						key={item.id}
						style={{ position: 'relative', borderRadius: '1rem' }}
						onMouseEnter={() => videosRef.current[index].play()}
						onMouseLeave={() => videosRef.current[index].pause()}
						onClick={() => {
							setActiveVideo(index);
							showModal();
						}}
					>
						<div style={{ position: 'relative' }} className="ju-al-center">
							<video
								height={170}
								width={'100%'}
								style={{ objectFit: 'cover' }}
								ref={(el) => (videosRef.current[index] = el)}
							>
								<source
									src={item.video_previews?.split(',')[0]}
									type="video/mp4"
								/>
							</video>
							<PlayCircleOutlined
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									transform: 'translate(-50%, -50%)',
									color: 'white',
									fontSize: '50px',
								}}
							/>
						</div>
						<InfluencerInfo bgImage={item.video_image_url}>
							<Avatar
								size="large"
								icon={
									<Image
										width={0}
										height={0}
										style={{ width: 'auto', height: '100%' }}
										alt=""
										loader={() => item?.profile_image_url}
										src={item?.profile_image_url}
									/>
								}
							/>
							<div>
								<p>{item.title}</p>
								<p>{item.public_name}</p>
							</div>
						</InfluencerInfo>
					</SwiperSlide>
				))}
				{/* TODO: move to new component */}
				<Modal
					title=""
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					width={'fit-content'}
					footer={null}
				>
					<VideoWrapper>
						<VideoJS
							styles={{ height: '60vh', width: 'auto' }}
							onReady={handlePlayerReady}
							options={{
								autoplay: true,
								controls: true,
								responsive: true,
								fluid: true,
								sources: [
									{
										src: data.product?.videos_additional?.[activeVideo]
											?.video_url,
										type: 'application/x-mpegURL',
									},
								],
							}}
						/>
						<VideosPreview>
							{data.product?.videos_additional?.map((video, index) => (
								<SmallVideoWrapper
									selected={index === activeVideo}
									key={video.video_image_url}
									className="ju-al-center"
									onClick={() => setActiveVideo(index)}
								>
									<Image
										width={40}
										height={25}
										alt="sm-image"
										loader={() => video.video_image_url}
										src={video.video_image_url}
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
						</VideosPreview>
					</VideoWrapper>
				</Modal>
			</Swiper>
		</Wrapper>
	);
};

export default VideoReviews;
