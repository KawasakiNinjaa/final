import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    async componentDidMount() {
        let otherUserId = this.props.otherUserId;
        let myId = this.props.myId;

        console.log("friendbutton mounted", this.props.otherUserId);
        //go to db and find out about friendship status
        const initialStatus = await axios.get(
            "/get-initial-status/" + this.props.otherUserId
        );
        console.log("initialStatus: ", initialStatus);
        if (!initialStatus.data) {
            this.setState({ buttonText: "send friend request" });
        } else if (initialStatus.data.receiver == otherUserId) {
            this.setState({ buttonText: "cancel request" });
        } else if (initialStatus.data.receiver == myId) {
            this.setState({ buttonText: "accept request" });
        } else if (initialStatus.data.accepted) {
            this.setState({ buttonText: "end friendship" });
        }
        // if (!initialStatus.data.friendship) {
        //     this.setState({
        //         buttonText: "send friend request"
        //     });
        // } else if (!initialStatus.data[0].accepted) {
        //     this.setState({ buttonText: "cancel request" });
        // }
        //if we get a res from server
        // if we don't = users are not friends = button "send friend request"
        //if we did get data from db- depending on the res = cancel req/ accept friendship/ end friendship
    }
    async handleClick() {
        let buttonText = this.state.buttonText;
        let otherUserId = this.props.otherUserId;
        // this.setState({
        //     buttonText: "other"
        // });
        if (buttonText == "send friend request") {
            console.log("i am handleClick");
            const newStatus = await axios.post("/new-friendship-status", {
                otherUserId
            });
            console.log("newStatus: ", newStatus);
        }

        //IF the burron said "send friend request" when the button was clicked ---POST - INSERT query

        //IF  the button said /Cancel Friend Request"/ end friendship --POST - delete query

        //If the button said "accept friend request", UPDATE query to update the 'accepted column from false to true'
        //AFTER THE POST- setStte buttonText
    }
    render() {
        return (
            <div>
                <p> I am FriendButton </p>
                <button name="friendbutton" onClick={this.handleClick}>
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}
