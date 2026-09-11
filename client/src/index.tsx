import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import LoaderIndicator from './components/Loader/LoaderIndicator';
import './css/index.css';
import './css/variables.css';
import { store } from './store';

const AppRouter = lazy(() => import('./routes/AppRouter'));

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <div className="App">
                <Suspense fallback={<LoaderIndicator />}>
                    <AppRouter />
                </Suspense>
            </div>
        </Provider>
    </StrictMode>
);
