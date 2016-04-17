var initialState = {
    fixtures: [],
    fixturePlaceholder: { }
};

export default function(state=initialState, action) {
    switch(action.type) {
        case 'ADMIN_LOAD_FIXTURES':
            return {
                ...state,
                fixtures: action.fixtures
            };
        case 'ADMIN_DELETE_FIXTURE':
            return {
                ...state,
                fixtures: state.fixtures.filter(f => f._id !== action.id)
            };
        case 'ADMIN_EDITING_FIXTURE':
            return {
                ...state,
                editingFixtureId: action.id
            };
        case 'ADMIN_STOP_EDITING_FIXTURE':
            return {
                ...state,
                editingFixtureId: undefined
            };
        case 'ADMIN_EDIT_FIXTURE':
            var updatedFixtures = state.fixtures.map(fixture => {
                if(fixture._id !== state.editingFixtureId)
                    return fixture;

                var updatedFixture = {
                    ...fixture
                };
                updatedFixture[action.property] = action.newValue;
                return updatedFixture
            });

            return {
                ...state,
                fixtures: updatedFixtures
            };
        case 'ADMIN_PLACEHOLDER_CHANGED':
            var fixturePlaceholder = {
                ...state.fixturePlaceholder
            };

            fixturePlaceholder[action.property] = action.newValue;

            return {
                ...state,
                fixturePlaceholder: fixturePlaceholder
            };
        case 'ADMIN_PLACEHOLDER_ADD':
            return {
                ...state,
                fixtures: [
                    ...state.fixtures,
                    Object.assign({}, state.fixturePlaceholder, { _id: action.id})
                ],
                fixturePlaceholder: {}
            };
        default:
            return state;
    }
};