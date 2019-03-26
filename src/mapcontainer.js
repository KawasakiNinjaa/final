import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
    width: "600px",
    height: "400px"
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, //Hides or the shows the infoWindow
            activeMarker: {}, //Shows the active marker upon click
            selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
        };
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{
                    lat: 52.521918,
                    lng: 13.413215
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA5s8Oh0dgUpcmsGLS3XUYs6bVaSijV48E"
})(MapContainer);
