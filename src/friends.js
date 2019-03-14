import React from "react";
import { connect } from "react-redux";
import { getFriendsAndWannabes } from "./actions";

export class Friends extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.dispatch(getFriendsAndWannabes());
        //DISPATCH and pass the action function (receiveFriendsWannabes)
    }
    render() {
        console.log("wannabes and friends: ", this.props);
        return <div>friends component</div>;
    }
}

const mapStateToProps = state => {
    return {
        // wannabes: , //accepted:false; filter method might be helpful
        // friends:// accepted:true
    };
};

export default connect(mapStateToProps)(Friends);
