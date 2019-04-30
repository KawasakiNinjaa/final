# RUN! (Web version)

*Run!* is a simple app to inform users about fare inspections in the Berlin-Brandenburg transportation network area.

(This app is under construction and there are more features, improvements, and a mobile version coming)


## Project description
*Run!* aims at fighting an abusive transportation fare system in a city that is changing fast, where the average price of all aspects of life is rising, but not citizens' incomes. *Run!* allows users help each other by reporting fare inspections.

Here is the landing page, where users can create an account or log in.


<img src="public/runapp-login.gif" width="790" height="400">


When users log in, they will find a "Report Wall" on the left side with the controls reported in the last 24 h.
Google Maps API is integrated and will show a pointer with the location where a control was reported.

<img src="public/mainpage.gif" width="790" height="400">

Here we can see how the user reports a control. The inputs were prepopulated locally with two different npm packages that included all the stations and lines in Berlin-Brandenburg with ID and coordinates. These packages were very useful, since the response from the APIS were excessively big and filtering them was not an easy task.

When a control is reported, we create a new object with name of station reported, and coordinates. Then we create a marker in our map like this:

```JS
let pos = {
                            lat: report.station.latitude,
                            lng: report.station.longitude
                        };
                        if (newTimeStamp === dateTime) {
                            return (
                                <Marker
                                    title={report.station.name}
                                    position={pos}
                                />
                            );
                        }

```





Lines, stations and existing reports are being stored in Redux. Also WebSockets are being used make users receive reports in real time. 











On the right side, users will find a side bar with 


## Stack
    React, Google Maps API
    Express
    Sockets
    VBB JavaScript modules by @derhuerst
    


#### App

-   Toggle Push Notifications: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications

*   List of last recorded controls:

    -   modal: Report a control: Username, Timestamp, Location, Line and Direction(options dropdown), other(maybe a description of the controllers).
    -   modal: Map with pointers //react google maps
    -   (possible) Interactive map: when clicking on station pointer shows statistics.

*   Statistics: Control prevalence in time per line.

    -   Parameters: Days of the month, at what time.

*   Legal Advice: A section to inform users of their rights. How to proceed in case they get caught, sanctions, controller's performace limitation.

*   Profile: Edit profile, password

*   About us

*   Log out
