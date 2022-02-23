import ReactDOM from 'react-dom';
import './css/index.css';
import './css/variables.module.css';
import { Provider } from 'react-redux';
import { store } from './store';

const AppRouter = React.lazy(() => import('./routes/AppRouter'));

import React, { Suspense } from 'react';
import LoaderIndicator from './components/Loader/LoaderIndicator';

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
