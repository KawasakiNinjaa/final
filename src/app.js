import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            bio: "",
            friendsIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
        this.showFriends = this.showFriends.bind(this);
    }
    showUploader() {
        //check if it's opened
        const { uploaderIsVisible } = this.state;
        //and toggle its value
        this.setState({ uploaderIsVisible: !uploaderIsVisible });
        console.log("I am showUploader");
    }
    showFriends() {
        const { friendsIsVisible } = this.state;
        this.setState({ friendsIsVisible: !friendsIsVisible });
    }

    setImage(image) {
        console.log("image, ", image);
        this.setState({ img_url: image, uploaderIsVisible: false });
    }
    setBio(biotext) {
        console.log("i am setBio", biotext.bio);
        this.setState({ bio: biotext.bio });
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("data in get/user: ", data);
            this.setState({ myId: data[0] });
            this.setState(data[1]); // we res.json from the server and pass it to state, in order to this.state.whatever later and use it in our component
        });
        axios.get("/getbio").then(({ data }) => {
            console.log("data in getbio: ", data);
            this.setState({ bio: data.bio });
        });
    }
    render() {
        //if the ajax request didn't meet success, show nothing
        if (!this.state.id) {
            return null;
        }
        return (
            <div id="app">
                <BrowserRouter>
                    <div>
                        <div id="appbar">
                            <a href="/">
                                <img id="logoinapp" src="/logo.png" />
                            </a>
                            <div id="appbar-options">
                                <a href="/logout">
                                    <img
                                        id="logoutbutton"
                                        src="/logoutbutton.png"
                                    />
                                </a>
                                <p id="greeting">
                                    {" "}
                                    Hi, {this.state.first} {this.state.last}!{" "}
                                </p>
                            </div>
                        </div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div id="landing">
                                    <Profile
                                        first={this.state.first}
                                        last={this.state.last}
                                        image={this.state.img_url}
                                        showUploader={this.showUploader}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                    />
                                    {this.state.uploaderIsVisible && (
                                        <Uploader setImage={this.setImage} />
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
