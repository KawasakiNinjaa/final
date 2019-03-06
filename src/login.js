import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                console.log("data in submit: ", data);
                if (data.success) {
                    location.replace("/");
                    //replace() replaces the former link on history tab = user can't get back to register if logged in (cookies in get req)
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div>
                <h2> L o g I n </h2>
                {this.state.error && (
                    <div className="error">
                        <p> Oops!</p>{" "}
                    </div>
                )}
                <input
                    name="email"
                    onChange={this.handleChange}
                    placeholder="e-mail"
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="password"
                />
                <br />
                <br />
                <button onClick={this.submit}> submit </button>
            </div>
        );
    }
}
