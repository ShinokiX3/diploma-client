import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = () => (
	<ContentLoader
		speed={2}
		width={254}
		height={277}
		viewBox="0 0 254 277"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="6" y="5" rx="0" ry="0" width="240" height="210" />
		<rect x="6" y="232" rx="0" ry="0" width="240" height="40" />
	</ContentLoader>
);

export default CardLoader;
