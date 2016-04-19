export default function(state=[], action) {
    switch(action.type) {
        case 'LOAD_LEADER_TABLES':
            return action.leaderTables;
        default:
            return state;
    }
};