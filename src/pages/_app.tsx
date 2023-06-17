import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from '@/store/store';
import { persistor } from '@/store/store';
import { ThemeProvider } from 'styled-components';

// import light from '@styles/themes/light.scss';
import Layout from '@/components/layout/Layout';

// TODO: Create a theme switcher, lazy load theme by an ask

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={{}}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
