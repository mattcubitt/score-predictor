export default function(state='', action) {
    switch(action.type) {
        case 'SET_ACTIVE_ROUTE':
            return action.route;
        default:
            return state;
    }
}