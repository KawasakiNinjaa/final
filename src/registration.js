import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
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
            .post("/registration", {
                first: this.first,
                last: this.last,
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
            <div id="registration-wrap">
                <h1 id="welcometo"> Join Coagula and make things happen.</h1>
                <div id="registration">
                    <img src="logo.png" />
                    <div id="registration-form">
                        <h2> c r e a t e A n e w A c c o u n t </h2>
                        {this.state.error && (
                            <div className="error">
                                <p>
                                    {" "}
                                    Oops!, something went wrong. Please try
                                    again.{" "}
                                </p>
                            </div>
                        )}
                        <input
                            name="first"
                            onChange={this.handleChange}
                            placeholder="First Name"
                        />
                        <br />
                        <br />
                        <input
                            name="last"
                            onChange={this.handleChange}
                            placeholder="Last Name"
                        />
                        <br />
                        <br />
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
                        <button onClick={this.submit}> SIGN UP </button>
                        <p>
                            Already a member? <Link to="/">Log in here </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
