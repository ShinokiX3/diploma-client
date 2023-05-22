import MetaLayout from '@/components/layout/MetaLayout';
import Checkout from '@/components/screen/checkout/Checkout';

const CheckoutPage = () => {
	return (
		<MetaLayout title="Checkout Page" description="Cart ordering">
			<Checkout />
		</MetaLayout>
	);
};

export default CheckoutPage;
