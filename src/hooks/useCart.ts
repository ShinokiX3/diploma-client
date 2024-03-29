import { useTypedSelector } from '@/hooks/useTypedSelector';

export const useCart = () => {
	const cart = useTypedSelector((state) => state.cart.items);

	const total = cart.reduce(
		// (acc, item) => acc + item.product.price * item.quantity,
		(acc, item) => 0,
		0
	);

	return { cart, total };
};
