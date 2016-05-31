export default function(state={}, action) {
    switch(action.type) {
        case 'ADD_TOKEN':
            return Object.assign({}, { token: action.token });
        default:
            return state;
    }
}