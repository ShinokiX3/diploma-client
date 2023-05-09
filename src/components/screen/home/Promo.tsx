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
	width: 100vw;
	overflow: hidden;
	margin-top: 20px;
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
				style={{ width: '100vw' }}
				className="mySwiper"
			>
				{promo.map((item) => (
					<SwiperSlide key={item.src}>
						<Image
							width={0}
							height={0}
							style={{ width: '100%', height: 'auto' }}
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
