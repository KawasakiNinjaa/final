import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        console.log("match.id: ", this.props.match.params.id);
        const getInfo = await axios.get(
            "/api-user/" + this.props.match.params.id
        );

        console.log("getInfo: ", getInfo.data);
        if (getInfo.data.match) {
            this.props.history.push("/");
        } else {
            this.setState(getInfo.data);
        }
    }
    render() {
        return (
            <div>
                <h2> I am OtherProfile </h2>
                <img
                    src={this.state.img_url}
                    alt={`${this.state.first} ${this.state.last}`}
                />

                <h2>
                    {this.state.first} {this.state.last}
                </h2>
                <p> {this.state.bio}</p>
                <h2 />
            </div>
        );
    }
}
