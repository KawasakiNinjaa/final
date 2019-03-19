import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioEditorIsVisible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.showBioEditor = this.showBioEditor.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    update(biotext) {
        axios.post("/setbio", { biotext }).then(({ data }) => {
            console.log("data in setbio: ", data.bio);
            this.props.setBio(data);
            this.setState({ bioEditorIsVisible: false });
            // this.setState({ biotext });
        });
    }

    showBioEditor() {
        console.log("I am showBioEditor");
        //chech if bioeditor is currently opened
        const { bioEditorIsVisible } = this.state;
        this.setState({
            // toggle its value
            bioEditorIsVisible: !bioEditorIsVisible
        });
    }
    render() {
        return (
            <div id="bioeditor">
                {!this.props.bio && (
                    <button id="addbio" onClick={this.showBioEditor}>
                        addBio
                    </button>
                )}
                <i> {this.props.bio}</i>
                {this.props.bio && (
                    <div>
                        <button onClick={this.showBioEditor}>editBio</button>
                    </div>
                )}

                {this.state.bioEditorIsVisible && (
                    <div name="textarea">
                        <textarea
                            name="biotext"
                            rows="5"
                            columns="30"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button
                            onClick={() => {
                                this.update(this.biotext);
                            }}
                        >
                            updateBio
                        </button>
                    </div>
                )}
                {!this.state.bioEditorIsVisible && null}
            </div>
        );
    }
}
