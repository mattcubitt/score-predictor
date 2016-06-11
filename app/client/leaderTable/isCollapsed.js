export default function(collapsed, position, currentUserId, userId, lastPosition) {
    if(collapsed !== false & (position !== 1 && position !== 2 && position !== 3 && position !== lastPosition)
        && currentUserId !== userId) {
        return true;
    }
    return false;
}