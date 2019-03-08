import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="profile-wrap">
                <h2> I am profile.js </h2>
                <h1>
                    Hello, {this.props.first} {this.props.last}!
                </h1>
                <BioEditor bio={this.props.bio} setBio={this.props.setBio} />
                <ProfilePic
                    image={this.props.image}
                    showUploader={this.props.showUploader}
                />
            </div>
        );
    }
}
