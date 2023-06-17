import React from 'react';
import MetaLayout from '@/components/layout/MetaLayout';
import User from '@/components/screen/user/User';

const UserPage = () => {
	return (
		<MetaLayout title="User page" description="User page details">
			<User />
		</MetaLayout>
	);
};

export default UserPage;
