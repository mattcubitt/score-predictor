var initialState = {
    show: false,
    wildcards: []
};

export default function(state=initialState, action) {
    switch(action.type) {
        case 'OPEN_WILDCARD_SELECTOR':
            return {
                ...state,
                show: true,
                predictionId: action.prediction._id,
                selectedWildcard: action.prediction.wildcard,
                wildcards: action.wildcards.map(wildcard => {
                    var selectedWildcard = action.prediction.wildcard;

                    return {
                        ...wildcard,
                        selected: selectedWildcard && selectedWildcard.type === wildcard.type
                    }
                })
            };
        case 'CLOSE_WILDCARD_SELECTOR':
            return {
                ...state,
                show: false,
                wildcards: []
            };
        case 'SELECT_WILDCARD':
            return {
                ...state,
                wildcards: state.wildcards.map(wildcard => {
                    return {
                        ...wildcard,
                        selected: wildcard.type === action.wildcard.type && !wildcard.selected
                    }
                })
            };
        default:
            return state;
    }
};