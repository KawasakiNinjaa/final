import React from "react";
import { connect } from "react-redux";
import { getFriendsAndWannabes, unfriend, accept } from "./actions";

export class Friends extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.dispatch(getFriendsAndWannabes());

        //DISPATCH and pass the action function ()
    }
    render() {
        console.log("wannabes and friends: ", this.props);
        if (!this.props.friends && !this.props.wannabes) {
            return null;
        }

        const friends = this.props.friends;
        const wannabes = this.props.wannabes;
        const friendList = (
            <div id="friends">
                {friends.map(friend => (
                    <div key={friend.id} id="friend">
                        <img src={friend.img_url} />
                        <h3>
                            {" "}
                            {friend.first} {friend.last}
                        </h3>
                        <button
                            onClick={() =>
                                this.props.dispatch(unfriend(friend.id))
                            }
                        >
                            {" "}
                            unfriend{" "}
                        </button>
                    </div>
                ))}
            </div>
        );
        //since cancel and unfriend will trigger the same query in the db, I am using unfriend as cancel req bc it's technically doing the same.
        const wannabeList = (
            <div id="wannabes">
                {wannabes.map(wannabe => (
                    <div key={wannabe.id} id="friend">
                        <img src={wannabe.img_url} />
                        <h3>
                            {" "}
                            {wannabe.first} {wannabe.last}{" "}
                        </h3>
                        <button
                            onClick={() =>
                                this.props.dispatch(accept(wannabe.id))
                            }
                        >
                            {" "}
                            accept request
                        </button>
                        <button
                            onClick={() =>
                                this.props.dispatch(unfriend(wannabe.id))
                            }
                        >
                            cancel request
                        </button>
                    </div>
                ))}
            </div>
        );

        return (
            <div>
                <h1> friends component hallo </h1>
                <div id="friendlist">
                    <h2> your friends </h2>
                    {friendList}
                </div>

                <div id="wannabelist">
                    <h2> friends wannabes </h2>
                    {wannabeList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("global state in Friends: ", state);

    return {
        friends:
            state.friendsWannabes &&
            state.friendsWannabes.filter(user => user.accepted),
        wannabes:
            state.friendsWannabes &&
            state.friendsWannabes.filter(user => !user.accepted)
        // wannabes: , //accepted:false; filter method might be helpful
        // friends:// accepted:true
    };
};

export default connect(mapStateToProps)(Friends);
