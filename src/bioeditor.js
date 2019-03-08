import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <p> ich bin bioeditor.js </p>
                <textarea rows="5" columns="25" />
            </div>
        );
    }
}
