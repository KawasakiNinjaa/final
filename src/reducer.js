export default function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS_WANNABES") {
        state = { ...state, friendsWannabes: action.friendsWannabes };
        return state;
    }
    //retrn new state object that contains a property called friendsWannabes whose value is the array we got back from the server
    return state;
}
