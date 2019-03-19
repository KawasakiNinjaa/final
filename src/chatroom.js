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
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    render() {
        if (!this.props.chatroomMessages) {
            return null;
        }
        const chatroomMessages = this.props.chatroomMessages;

        const chatroomMessagesList = (
            <div
                id="chatroomMessagesList"
                ref={elem => {
                    this.elem = elem;
                }}
            >
                {chatroomMessages.map(chatroomMessage => (
                    <div key={chatroomMessage.id} id="chatroommessage">
                        <Link to={`/user/${chatroomMessage.user_id}`}>
                            {" "}
                            <img id="imginchat" src={chatroomMessage.img_url} />
                        </Link>
                        <div>
                            <div>
                                <h6>
                                    {chatroomMessage.first}{" "}
                                    {chatroomMessage.last}{" "}
                                    {chatroomMessage.created_at}{" "}
                                </h6>
                            </div>
                            <p> {chatroomMessage.comment} </p>
                        </div>
                    </div>
                ))}
                <textarea
                    placeholder="Press enter to leave a message..."
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        );

        return (
            <div>
                <div id="chat-container" className="chat-msg-container">
                    {chatroomMessagesList}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("global state in OnlineUsers: ", state);

    return state;
};

export default connect(mapStateToProps)(ChatRoom);
