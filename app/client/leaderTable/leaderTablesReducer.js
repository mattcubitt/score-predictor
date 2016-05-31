export default function(state=[], action) {
    switch(action.type) {
        case 'LOAD_LEADER_TABLES':
            return action.data;
        default:
            return state;
    }
};