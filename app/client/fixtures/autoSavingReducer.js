export default function(state=false, action) {
    switch(action.type) {
        case 'STARTED_AUTOSAVE':
            return true;
        case 'FINISHED_AUTOSAVE':
            return false;
        default:
            return state;
    }
}