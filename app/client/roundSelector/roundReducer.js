const initialState = {
    current: undefined,
    list: []
}

export default function(state=initialState, action) {
    switch(action.type) {
        case 'LOAD_ROUNDS':
            return {
                current: action.rounds[0],
                list: action.rounds
            };
        default:
            return state;
    }
}
