import React from "react";
import { connect } from "react-redux";
import { getFriendsAndWannabes } from "./actions";

export class Friends extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.dispatch(getFriendsAndWannabes());
        //DISPATCH and pass the action function (receiveFriendsWannabes)
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
                    </div>
                ))}
            </div>
        );
        const wannabeList = (
            <div id="wannabes">
                {wannabes.map(wannabe => (
                    <div key={wannabe.id} id="friend">
                        <img src={wannabe.img_url} />
                        <h3>
                            {" "}
                            {wannabe.first} {wannabe.last}{" "}
                        </h3>
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
            // <div>
            //     <h2> These guys wanna friends with you</h2>
            //     <img
            //         src={this.props.wannabes.img_url}
            //         alt={`${this.props.wannabes.first} ${
            //             this.props.wannabes.last
            //         }`}
            //     />
            //     <h3>
            //         {" "}
            //         {this.props.wannabes.first}{" "}
            //         {this.props.wannabes.last}
            //     </h3>
            // </div>
            // <div>
            //     <h2> my friends</h2>
            //     <img
            //         src={this.props.friends.img_url}
            //         alt={`${this.props.friends.first} ${
            //             this.props.friends.last
            //         }`}
            //     />
            //     <h3>
            //         {" "}
            //         {this.props.friends.first} {this.props.friends.last}
            //     </h3>
        );
    }
}

const mapStateToProps = state => {
    console.log("global state in Friends: ", state.friendsWannabes);

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
