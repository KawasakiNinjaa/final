# RUN! (Web version)- An app to inform users about fare inspections in the Berlin-Brandenburg transportation network

I will adapt this app to mobile device environments using React Native, but here I am creating a first sketch in web version using React.

## Stack
    React, Google Maps API
    Express
    Sockets
    VBB JavaScript modules by @derhuerst
    
## Landing page

-   Intro & Registration
-   Log in:
    -   Password match check
    -   (possible) Activating account with email link (nodemailer, new gmail account for that purpose)

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
