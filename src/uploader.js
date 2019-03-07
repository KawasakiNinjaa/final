import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upload = this.upload.bind(this);
    }
    upload() {
        axios
            .post("/upload-profilepic", {
                file: this.file
            })
            .then(({ data }) => {});
    }
    render() {
        return (
            <div>
                <input
                    name="file"
                    type="file"
                    onChange={e => {
                        const formData = new FormData();
                        formData.append("file", e.target.files[0]);
                    }}
                />
            </div>
        );
    }
}
