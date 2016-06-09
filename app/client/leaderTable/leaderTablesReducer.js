export default function(state=[], action) {
    switch(action.type) {
        case 'LOAD_LEADER_TABLES':
            return action.data;
        case 'TOGGLE_TABLE_COLLAPSE':
            return state.map(table => {
                if(table._id === action.leaderTableId) {
                    return {
                        ...table,
                        collapsed: table.collapsed === false ? true : false
                    }
                }

                return table;
            });
        default:
            return state;
    }
};