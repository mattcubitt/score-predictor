const initialState = {
    current: undefined,
    list: []
};

const nextRound = function(rounds) {
    var currentIndex = rounds.list.indexOf(rounds.current);
    var newIndex = ++currentIndex;

    if(newIndex >= rounds.list.length)
        newIndex = 0;

    return {
        current: rounds.list[newIndex],
        list: rounds.list
    };
};

const previousRound = function(rounds) {
    var currentIndex = rounds.list.indexOf(rounds.current);
    var newIndex = --currentIndex;

    if(newIndex < 0)
        currentIndex = rounds.list.length - 1;

    return {
        current: rounds.list[currentIndex],
        list: rounds.list
    };
};

export default function(state=initialState, action) {
    switch(action.type) {
        case 'LOAD_ROUNDS':
            return {
                current: action.data[0],
                list: action.data
            };
        case 'NEXT_ROUND':
            return nextRound(state);
        case 'PREVIOUS_ROUND':
            return previousRound(state);
        default:
            return state;
    }
}
