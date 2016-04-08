import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';
import createLogger from 'redux-logger'

var reducers = {
    form: formReducer,
    auth: function(state={}, action) {
        switch(action.type) {
            case 'ADD_TOKEN':
                return Object.assign({}, { token: action.token });
            default:
                return state;
        }
    },
    fixtures: function(state=[], action) {
        switch(action.type) {
            case 'LOAD_FIXTURES':
                return action.fixtures;
            default:
                return state;
        }
    }
};

var rootReducer = combineReducers(reducers);

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
    // var createStoreFunc = (window.devToolsExtension ?
    //     window.devToolsExtension()(createStore) :
    //     createStore);

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}