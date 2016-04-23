import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';
import createLogger from 'redux-logger'
import roundReducer from './roundSelector/roundReducer'
import fixtureReducer from './fixtures/fixtureReducer'
import adminReducer from './admin/adminReducer'
import leaderTablesReducer from './leaderTable/leaderTablesReducer'
import userReducer from './user/userReducer'

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
    fixtures: fixtureReducer,
    admin: adminReducer,
    predictions: function(state=[], action) {
        switch(action.type) {
            case 'LOAD_PREDICTIONS':
                return action.predictions;
            // case 'CREATE_PREDICTION':
            //     var newScore = action.score === '' ? undefined : parseInt(action.score);
            //
            //     var prediction = {};
            //     prediction.fixtureId = action.fixtureId;
            //     prediction[action.property] = newScore;
            //
            //     return [
            //         prediction,
            //         ...state
            //     ];
            case 'UPDATE_PREDICTION':
                return state.map(prediction => {
                    if(prediction._id === action.id) {
                        var newScore = action.score === '' ? undefined : parseInt(action.score);

                        var newPrediction = {};
                        newPrediction[action.property] = newScore;

                        return Object.assign({}, prediction, newPrediction);
                    }

                    return prediction;
                });
            default:
                return state;
        }
    },
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
    user : userReducer
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