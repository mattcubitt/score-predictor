import React from 'react';
import { render } from 'react-dom';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import RegisterForm from './auth/registerForm';

var reducers = {
    form: formReducer
};

var reducer = combineReducers(reducers);
var store = createStore(reducer);

render(
    <Provider store={store}>
        <RegisterForm />
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}