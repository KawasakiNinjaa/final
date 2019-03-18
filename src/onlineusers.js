import React from "react";
import { connect } from "react-redux";

export function OnlineUsers() {
    return (
        <div>
            <h1> I am onlineusers </h1>
            <strong />;
        </div>
    );
}

const mapStateToProps = state => {
    console.log("global state in OnlineUsers: ", state);

    return {
        // wannabes: , //accepted:false; filter method might be helpful
        // friends:// accepted:true
    };
};

export default connect(mapStateToProps)(OnlineUsers);
