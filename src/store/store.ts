import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { cartSlice } from './cart/cart.slice';
import { userSlice } from './user/user.slice';
import { orderSlice } from './order/order.slice';
import { categorySlice } from './category/category.slice';
import { productSlice } from './product/product.slice';

const persistConfig = {
	key: 'sinoki-store',
	storage,
	whitelist: ['cart', 'user', 'order'],
};

const rootReducer = combineReducers({
	cart: cartSlice.reducer,
	user: userSlice.reducer,
	order: orderSlice.reducer,
	category: categorySlice.reducer,
	product: productSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
