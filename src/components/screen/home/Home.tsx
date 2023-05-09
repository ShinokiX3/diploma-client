import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './parallax.module.scss';

import Promo from './Promo';
import PromoMessage from './PromoMessage';

const Home = () => {
	const alignCenter = { display: 'flex', alignItems: 'center' };

	return (
		<>
			<div className={styles['ticker']}>
				<div className={styles['ticker__wrapper']}>
					<div className={styles['ticker__item']}>Nike</div>
					<div className={styles['ticker__item']}>Apple</div>
					<div className={styles['ticker__item']}>Google</div>
					<div className={styles['ticker__item']}>Samsung</div>
					<div className={styles['ticker__item']}>Xiaomi</div>
					<div className={styles['ticker__item']}>Netflix</div>
					<div className={styles['ticker__item']}></div>
				</div>
				<div className={styles['ticker__wrapper']}>
					<div className={styles['ticker__item']}>Nike</div>
					<div className={styles['ticker__item']}>Apple</div>
					<div className={styles['ticker__item']}>Google</div>
					<div className={styles['ticker__item']}>Samsung</div>
					<div className={styles['ticker__item']}>Xiaomi</div>
					<div className={styles['ticker__item']}>Netflix</div>
					<div className={styles['ticker__item']}></div>
				</div>
			</div>
			<Parallax pages={5} className={styles.noscroll}>
				<ParallaxLayer
					offset={0}
					speed={0.5}
					style={{ width: '100vw', height: '100vh' }}
				>
					<Promo />
					<PromoMessage />
				</ParallaxLayer>

				<ParallaxLayer
					sticky={{ start: 1, end: 3 }}
					style={{ ...alignCenter, justifyContent: 'flex-start' }}
				>
					<div style={{ display: 'block' }}>
						<p className={styles.scrollText} style={{ color: 'black' }}>
							Why
						</p>
						<p className={styles.scrollText} style={{ color: 'black' }}>
							Should
						</p>
						<p className={styles.scrollText} style={{ color: 'black' }}>
							Choose us?
						</p>
					</div>
				</ParallaxLayer>

				<ParallaxLayer
					offset={1.5}
					speed={1.5}
					style={{ ...alignCenter, justifyContent: 'flex-end' }}
				>
					<div
						className={`${styles.card} ${styles.parallax}`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'inherit',
							width: '40%',
							gap: '40px',
						}}
					>
						<div>
							<h2>👌✅ Quality is unquestinable</h2>
							<p>
								At our online store, we take great pride in ensuring that the
								quality of our products is unquestionable. We source only the
								finest materials and work with trusted suppliers to bring you
								the best possible shopping experience.
							</p>
						</div>
						<div>
							<h2>🌍📐 International standard</h2>
							<p>
								As a global online store, we adhere to international standards
								to ensure that our products meet the highest quality and safety
								requirements. We source our products from trusted suppliers who
								follow these standards, so you can shop with confidence knowing
								that you are getting the best.
							</p>
						</div>
						<div>
							<h2>🛡️📅 Long Warranty</h2>
							<p>
								We believe in the quality of our products, which is why we offer
								a long warranty on all of our items. With a warranty that lasts
								for years, you can shop with confidence knowing that we stand
								behind our products and are committed to your satisfaction
							</p>
						</div>
					</div>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2.5}
					speed={1.5}
					style={{ ...alignCenter, justifyContent: 'flex-end' }}
				>
					<div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
						<p>Neither am I</p>
					</div>
				</ParallaxLayer>
			</Parallax>
		</>
	);
};

export default Home;
