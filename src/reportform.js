import React from "react";
import { getAllLines, getAllStations } from "./actions";
import { connect } from "react-redux";

export class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getAllLines());
        this.props.dispatch(getAllStations());
        // axios.get("/vbb-lines").then(data => {
        //     data.filter(line => line.mode == "bus");
        //     console.log("vbb-lines: ", data);
        // });
    }
    render() {
        console.log("stations: ", this.props.stations);

        if (
            !this.props.bus &&
            !this.props.ubahn &&
            !this.props.sbahn &&
            !this.props.tram
        ) {
            return null;
        }

        const ubahn = this.props.ubahn;
        const sbahn = this.props.sbahn;
        const tram = this.props.tram;
        const bus = this.props.bus;
        const stations = this.props.stations;

        return (
            <div id="bvg-buttons">
                <img className="dropbtn" src="./ubahnbutton.png" />
                <img className="dropbtn" src="./sbahnbutton.png" />
                <img className="dropbtn" src="./trambutton.png" />
                <img className="dropbtn" src="./busbutton.png" />

                <p> Line </p>
                <datalist id="lines">
                    {ubahn.map(line => {
                        return (
                            <option
                                key={line.id}
                                className="dropdown-result"
                                value={line.name}
                            />
                        );
                    })}
                    {sbahn.map(line => {
                        return (
                            <option
                                key={line.id}
                                className="dropdown-result"
                                value={line.name}
                            />
                        );
                    })}
                    {tram.map(line => {
                        return (
                            <option
                                key={line.id}
                                className="dropdown-result"
                                value={line.name}
                            />
                        );
                    })}
                    {bus.map(line => {
                        return (
                            <option
                                key={line.id}
                                className="dropdown-result"
                                value={line.name}
                            />
                        );
                    })}
                </datalist>
                <input type="text" list="lines" />

                <p> Direction </p>
                <datalist id="stations">
                    {stations.map(station => {
                        return <option key={station.id} value={station.name} />;
                    })}
                    <option className="dropdown-result" value={stations} />
                </datalist>
                <input type="text" list="stations" />
                <p> Your location </p>
                <datalist id="location">
                    {stations.map(station => {
                        return <option key={station.id} value={station.name} />;
                    })}
                    <option className="dropdown-result" value={stations} />
                </datalist>
                <input type="text" list="location" />
                <p> Comments </p>
                <textarea />
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
            ),
        stations: state.allStationsVbb && state.allStationsVbb
        // wannabes: , //accepted:false; filter method might be helpful
        // friends:// accepted:true
    };
};

export default connect(mapStateToProps)(ReportForm);
