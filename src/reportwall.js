import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class ReportWall extends React.Component {
    componentDidUpdate() {
        if (this.elem) {
            this.elem.scrollTop = this.elem.scrollHeight;
        }
    }
    render() {
        if (!this.props.controlReports) {
            return null;
        }
        const controlReports = this.props.controlReports;
        console.log("controlReports: ", controlReports);

        const reportList = (
            <div
                id="report-list"
                ref={elem => {
                    this.elem = elem;
                }}
            >
                {controlReports.map(report => (
                    <div key={report.id} id="chatroommessage">
                        <h1>
                            {" "}
                            {report.line_vbb}, direction: {report.direction_id}
                        </h1>
                        <h6>
                            at: {report.location_id}, {report.created_at}{" "}
                        </h6>
                        <p> {report.comment} </p>
                        <div>
                            <div />
                        </div>
                    </div>
                ))}
            </div>
        );

        return (
            <div>
                <div id="chat-container" className="chat-msg-container">
                    {reportList}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("global state in ReportWall: ", state);

    return state;
};

export default connect(mapStateToProps)(ReportWall);
