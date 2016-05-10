import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import createLogger from 'redux-logger'
import roundReducer from './roundSelector/roundReducer'
import fixtureReducer from './fixtures/fixtureReducer'
import adminReducer from './admin/adminReducer'
import leaderTablesReducer from './leaderTable/leaderTablesReducer'
import userReducer from './user/userReducer'
import activeRouteReducer from './navigation/activeRouteReducer'
import wildcardSelectorReducer from './fixtures/wildcardSelectorReducer'
import predictionReducer from './fixtures/predictionReducer'

var reducers = {
    activeRoute : activeRouteReducer,
    form: formReducer,
    auth: function(state={}, action) {
        switch(action.type) {
            case 'ADD_TOKEN':
                return Object.assign({}, { token: action.token });
            default:
                return state;
        }
    },
    fixtures: fixtureReducer,
    admin: adminReducer,
    predictions: predictionReducer,
    autoSaving: function(state=false, action) {
        switch(action.type) {
            case 'STARTED_AUTOSAVE':
                return true;
            case 'FINISHED_AUTOSAVE':
                return false;
            default:
                return state;
        }
    },
    rounds: roundReducer,
    leaderTables: leaderTablesReducer,
    user : userReducer,
    wildcardSelector: wildcardSelectorReducer
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