import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
    }
    showUploader() {
        this.state.uploaderIsVisible = true;
    }
    setImage(image) {
        this.setState({ image });
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("data in get/user: ", data);
            this.setState(data); // we res.json from the server and pass it to state, in order to this.state.whatever later and use it in our component
        });
    }
    render() {
        //if the ajax request didn't meet success, show nothing
        if (!this.state.id) {
            return null;
        }
        return (
            <div>
                <img src="logo.jpg" />
                <ProfilePic
                    image={this.state.image}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={this.showUploader}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </div>
        );
    }
}
