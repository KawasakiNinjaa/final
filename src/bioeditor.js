import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    update(biotext) {
        axios.post("/setbio", { biotext }).then(({ data }) => {
            console.log("data in setbio: ", data.bio);
            this.props.setBio(data);
            // this.setState({ biotext });
        });
    }
    render() {
        return (
            <div>
                <p> this.props.bio = {this.props.bio} </p>
                <textarea
                    name="biotext"
                    rows="5"
                    columns="25"
                    onChange={this.handleChange}
                />
                <button
                    onClick={() => {
                        this.update(this.biotext);
                    }}
                >
                    updateBio
                </button>
            </div>
        );
    }
}
