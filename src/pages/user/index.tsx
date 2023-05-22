import React from 'react';
import MetaLayout from '@/components/layout/MetaLayout';
import Product from '@/components/screen/product/Product';
// import { AmazonProduct } from '@/services/Amazon/AmazonProduct';
import { GetServerSideProps } from 'next';
import { ProductService } from '@/services/Server/ServerProduct';
import {
	IAttribute,
	IAttributesResponse,
	IProduct,
} from '@/types/product.interface';
import User from '@/components/screen/user/User';

const UserPage = () => {
	return (
		<MetaLayout title="User page" description="User page details">
			<User />
		</MetaLayout>
	);
};

export default UserPage;
