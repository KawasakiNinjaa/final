import React from "react";
import { connect } from "react-redux";
import { getSocket } from "./socket.js";
import { Link } from "react-router-dom";

export class ChatRoom extends React.Component {
    handleKeyDown(e) {
        if (e.which === 13) {
            console.log("enter pressed");
            getSocket().emit("newChatroomMessage", e.target.value);
        }
    }
    componentDidUpdate() {
        console.log("this.chatContainer: ", this.chatContainer);
        this.chatContainer.scrollTop = "100px";
    }
    render() {
        if (!this.props.chatroomMessages) {
            return null;
        }
        const chatroomMessages = this.props.chatroomMessages;

        const chatroomMessagesList = (
            <div id="chatroomMessagesList">
                {chatroomMessages.map(chatroomMessage => (
                    <div key={chatroomMessage.id}>
                        <Link to={`/user/${chatroomMessage.user_id}`}>
                            {" "}
                            <img src={chatroomMessage.img_url} />
                            <h6>
                                {chatroomMessage.first} {chatroomMessage.last}{" "}
                            </h6>
                            <p> {chatroomMessage.created_at}</p>{" "}
                        </Link>
                        <p> {chatroomMessage.comment} </p>
                    </div>
                ))}
            </div>
        );

        return (
            <div>
                <h1> chat room</h1>
                {chatroomMessagesList}
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
