import React from "react";
import axios from "./axios";
import Caroussel from "./caroussel";
import { Link } from "react-router-dom";

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
                <div id="loginBar">
                    <img id="loginLogo" src="logo2.png" />
                    <div id="loginform">
                        {this.state.error && (
                            <div className="error">
                                <p> Oops!, something does not match.</p>{" "}
                            </div>
                        )}
                        <div id="loginform1">
                            <div>
                                <p> e - m a i l </p>
                                <input
                                    name="email"
                                    onChange={this.handleChange}
                                    placeholder="e-mail"
                                />
                            </div>
                            <div>
                                <p> password </p>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    placeholder="password"
                                />
                            </div>
                            <div>
                                <br />
                                <button onClick={this.submit}>
                                    {" "}
                                    L o g I n{" "}
                                </button>
                            </div>
                        </div>
                        <br />
                        <p id="newhere">
                            new here? <Link to="/signup">join Coagula! </Link>
                        </p>
                    </div>
                </div>

                <Caroussel />
            </div>
        );
    }
}
