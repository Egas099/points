import ReactDOM from 'react-dom';
import './css/index.css';
import { Provider } from 'react-redux';
import { store } from './store';

import AppRouter from './routes/AppRouter';
import React from 'react';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <div className="App">
                <AppRouter />
            </div>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
