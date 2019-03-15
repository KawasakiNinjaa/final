export default function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS_WANNABES") {
        state = { ...state, friendsWannabes: action.friendsWannabes };
        return state;
    }
    if (action.type == "UNFRIEND") {
        const friendsWannabes = state.friendsWannabes.filter(
            friend => friend.id !== action.otherId
        );
        state = { ...state, friendsWannabes };
        return state;
    }
    if (action.type == "ACCEPT") {
        const friendsWannabes = state.friendsWannabes.map(friend => {
            console.log("friend in friendsWannabes acc: ", friend);
            if (friend.id == action.otherId) {
                friend.accepted = true;
            }
            return friend;
        });
        console.log("friendsWannabes in accepted red: ", friendsWannabes);
        state = { ...state, friendsWannabes };
        return state;
    }
    return state;
}
