import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.onlineUsers) {
            return null;
        }
        const onlineUsers = this.props.onlineUsers;

        const onlineUsersList = (
            <div id="onlineuserslist">
                <h2> online users </h2>
                {onlineUsers.map(onlineUser => (
                    <div className="online" key={onlineUser.id}>
                        <img id="onlinebutton" src="onlinebutton.png" />
                        <Link to={`/user/${onlineUser.id}`}>
                            {" "}
                            <img id="imgonline" src={onlineUser.img_url} />{" "}
                        </Link>
                        <h3>
                            {" "}
                            {onlineUser.first} {onlineUser.last}{" "}
                        </h3>
                    </div>
                ))}
            </div>
        );

        return <div>{onlineUsersList}</div>;
    }
}

const mapStateToProps = state => {
    console.log("global state in OnlineUsers: ", state);

    return state;
};

export default connect(mapStateToProps)(OnlineUsers);
