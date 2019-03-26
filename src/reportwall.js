import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class ReportWall extends React.Component {
    componentDidUpdate() {
        if (this.elem) {
            this.elem.scrollTop = this.elem.scrollHeight;
        }
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
            </div>
        );

        return (
            <div>
                <div id="chat-container" className="chat-msg-container">
                    <h1 id="chatroomlabel"> CHATROOM</h1>

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

export default connect(mapStateToProps)(ReportWall);
