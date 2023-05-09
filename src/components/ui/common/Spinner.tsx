import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	min-height: 130px;
`;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Spinner = () => {
	return (
		<Wrapper className="ju-al-center">
			<Spin indicator={antIcon} />
		</Wrapper>
	);
};

export default Spinner;
