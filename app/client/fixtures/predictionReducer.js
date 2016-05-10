export default function(state=[], action) {
    switch(action.type) {
        case 'LOAD_PREDICTIONS':
            return action.predictions;
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
        case 'SAVE_PREDICTION_WILDCARD':
            return state.map(prediction => {
                if(prediction._id === action.predictionId) {
                    return {
                        ...prediction,
                        wildcard: action.selectedWildcard
                    }
                }

                return prediction;
            });
        default:
            return state;
    }
}