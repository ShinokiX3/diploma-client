import { productSlice } from './../store/product/product.slice';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { cartSlice } from '@/store/cart/cart.slice';
import { userSlice } from '@/store/user/user.slice';
import { orderSlice } from '@/store/order/order.slice';
import { categorySlice } from '../store/category/category.slice';

const rootAction = {
	...cartSlice.actions,
	...userSlice.actions,
	...orderSlice.actions,
	...categorySlice.actions,
	...productSlice.actions,
};

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
