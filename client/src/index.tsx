import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoaderIndicator from './components/Loader/LoaderIndicator';
import './css/index.css';
import './css/variables.css';
import { store } from './store';

const AppRouter = React.lazy(() => import('./routes/AppRouter'));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <div className="App">
                <Suspense fallback={<LoaderIndicator />}>
                    <AppRouter />
                </Suspense>
            </div>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
