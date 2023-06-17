import React from 'react';
import ContentLoader from 'react-content-loader';

const OrderLoader = () => (
	<ContentLoader
		speed={2}
		width={'100%'}
		height={'82'}
		viewBox="0 0 100% 360"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="0" y="0" rx="3" ry="3" width="100%" height="82" />
	</ContentLoader>
);

export default OrderLoader;
