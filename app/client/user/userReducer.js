import UserStates from './userStates'

var initialUser = {
    state: UserStates.NOT_AUTHENTICATED
};

export default function(state=initialUser, action) {
    switch(action.type) {
        case 'ADD_USER':
            return action.user;
        case 'CLEAR_USER':
            return initialUser;
        case 'ADD_USER_ERROR':
            return {
                ...state,
                error: action.error
            }
    }

    return state;
}