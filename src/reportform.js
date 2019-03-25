import React from "react";
import { getAllLines } from "./actions";
import { connect } from "react-redux";

export class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getAllLines());
        // axios.get("/vbb-lines").then(data => {
        //     data.filter(line => line.mode == "bus");
        //     console.log("vbb-lines: ", data);
        // });
    }
    render() {
        console.log("bus linien: ", this.props.bus);
        console.log("ubahn: ", this.props.ubahn);
        console.log("Sbahn: ", this.props.sbahn);
        console.log("Tram: ", this.props.tram);

        return (
            <div id="bvg-buttons">
                <p> I am ReportForm </p>
                <div className="dropdown">
                    <img className="dropbtn" src="./ubahnbutton.png" />
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <img className="dropbtn" src="./sbahnbutton.png" />
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <img className="dropbtn" src="./trambutton.png" />
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <img className="dropbtn" src="./busbutton.png" />
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("global state in ReportForm: ", state);

    return {
        bus:
            state.allLinesVbb &&
            state.allLinesVbb.filter(
                line => line.product == "bus" && line.operator == "796"
            ),
        ubahn:
            state.allLinesVbb &&
            state.allLinesVbb.filter(line => line.product == "subway"),
        sbahn:
            state.allLinesVbb &&
            state.allLinesVbb.filter(line => line.product == "suburban"),
        tram:
            state.allLinesVbb &&
            state.allLinesVbb.filter(
                line => line.product == "tram" && line.operator == "796"
            )
        // wannabes: , //accepted:false; filter method might be helpful
        // friends:// accepted:true
    };
};

export default connect(mapStateToProps)(ReportForm);
