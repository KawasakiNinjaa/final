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
    if (action.type == "ONLINE_USERS") {
        state = { ...state, onlineUsers: action.user };
        return state;
    }
    if (action.type == "USER_JOINED") {
        console.log("action in user_joined", action);
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.user]
        };
        return state;
    }
    if (action.type == "USER_LEFT") {
        console.log("action in user_left: ", action);
        const onlineUsers = state.onlineUsers.filter(
            user => user.id !== action.id
        );
        console.log("onlineUsers in reducer: ", onlineUsers);
        state = { ...state, onlineUsers };
        return state;
    }
    if (action.type == "CHATROOM_MESSAGES") {
        state = { ...state, chatroomMessages: action.chatroom_messages };
        return state;
    }
    if (action.type == "NEW_CHATROOM_MESSAGE") {
        const chatroomMessages = [
            ...state.chatroomMessages,
            action.message_info
        ];
        state = { ...state, chatroomMessages };
        console.log("state in new_chatroom_mesaage after assignment: ", state);
        return state;
    }
    if (action.type == "ALL_LINES_VBB") {
        state = { ...state, allLinesVbb: action.lines };
        return state;
    }

    return state;
}
