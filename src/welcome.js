import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    render() {
        return (
            <div id="welcome">
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/logIn" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
