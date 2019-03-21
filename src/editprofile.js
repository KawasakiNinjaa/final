import React from "react";
import axios from "./axios";
import Profile from "./profile";

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateInfo = this.updateInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("data in get/user: ", data);
            this.setState({ myId: data[0] });
            this.setState(data[1]); // we res.json from the server and pass it to state, in order to this.state.whatever later and use it in our component
            console.log("state in EditProfile: ", this.state);
        });
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    async updateInfo() {
        const updatedPf = await axios.post("/profile/edit", {
            first: this.firstname || this.state.first,
            last: this.lastname || this.state.last,
            email: this.email || this.state.email,
            password: this.password || this.state.password,
            city: this.city || this.state.city,
            country: this.country || this.state.country
        });
        console.log("updatedPf: ", updatedPf);
    }
    deleteAccount() {}
    render() {
        return (
            <div id="editprofile">
                <img src={this.state.img_url} />
                <h1> {this.state.first}, here you can edit your info.</h1>
                <br />
                <br />
                <br />
                <div id="editprofileform">
                    <label>
                        First Name
                        <input
                            type="text"
                            name="firstname"
                            placeholder="firstname"
                            defaultValue={this.state.first}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            type="text"
                            name="lastname"
                            placeholder="lastname"
                            defaultValue={this.state.last}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        E-mail
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            defaultValue={this.state.email}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                        City
                        <input
                            name="city"
                            placeholder="City"
                            defaultValue={this.state.city}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                        Country
                        <input
                            name="country"
                            placeholder="City"
                            value={this.state.country}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <button onClick={this.updateInfo}>save changes</button>
                    <br />

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p> you can always delete your account: </p>
                    <button> Delete account </button>
                </div>
            </div>
        );
    }
}
