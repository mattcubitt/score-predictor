export default function(state=[], action) {
    switch(action.type) {
        case 'LOAD_FIXTURES':
            return action.fixtures;
        default:
            return state;
    }
};