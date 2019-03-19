import React from "react";
import { connect } from "react-redux";
import getSocket from "./socket.js";

export class ChatRoom extends React.Component {
    handleKeyDown(e) {
        if (e.which === 13) {
            console.log("enter pressed");
            getSocket().emit("newChatMessage", e.target.value);
        }
    }
    componentDidUpdate() {
        console.log("this.chatContainer: ", this.chatContainer);
        this.chatContainer.scrollTop = "100px";
    }
    render() {
        return (
            <div>
                <h1> chat room</h1>
                <div
                    id="chat-container"
                    ref={elem => (this.chatContainer = elem)}
                />

                <textarea onKeyDown={this.handleKeyDown} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("global state in OnlineUsers: ", state);

    return state;
};

export default connect(mapStateToProps)(ChatRoom);
