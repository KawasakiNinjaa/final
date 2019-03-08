import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <p> this.props.bio = {this.props.bio} </p>
                <textarea rows="5" columns="25" />
                <button>updateBio</button>
            </div>
        );
    }
}
