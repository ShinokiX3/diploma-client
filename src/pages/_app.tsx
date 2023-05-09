import '@/styles/globals.scss';

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store } from '@/store/store';
import { persistor } from '@/store/store';
import { ThemeProvider } from 'styled-components';

import light from '@styles/themes/light.scss';
import { IAmazonCategory } from '@/types/categories.interface';
import Layout from '@/components/layout/Layout';

// TODO: Create a theme switcher, lazy load theme by an ask

interface IApp extends AppProps {
    categories: IAmazonCategory[]
}

const App: React.FC<IApp> = ({ Component, pageProps }) => {

    return (

        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={light}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}

export default App