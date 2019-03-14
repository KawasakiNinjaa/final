//all axios req will go otherUserId// all action creator
//EVERY FN MUST RETURN AN OBJECT
import axios from "./axios";

export async function getFriendsAndWannabes() {
    const friendsAndWannabes = await axios.get("/friends-wannabes");
    console.log("friendsAndWannabes: ", friendsAndWannabes.data);
    return {
        type: "GET_FRIENDS_WANNABES",
        friendsWannabes: friendsAndWannabes.data
    };
    //axios GET req to get friends and receiveFriendsWannabes.
    // RES = return object with type key and all the list
    //you need friends to see that
}
