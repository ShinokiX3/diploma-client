import React from 'react';
import styles from './parallax.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { promo } from '../../../../design/images/promo';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: calc(100vw - 20px);
	overflow: hidden;
	margin-top: 20px;
	.swiper-slide {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const Promo = () => {
	return (
		<Wrapper>
			<Swiper
				navigation={true}
				modules={[Navigation]}
				spaceBetween={0}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
				style={{ width: 'inherit' }}
				className="mySwiper"
			>
				{promo.map((item) => (
					<SwiperSlide key={item.src}>
						<Image
							width={0}
							height={0}
							style={{
								width: '100%',
								height: 'auto',
								maxHeight: '300px',
								objectFit: 'cover',
							}}
							alt="promo"
							loader={() => item.src}
							src={item.src}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</Wrapper>
	);
};

export default Promo;
