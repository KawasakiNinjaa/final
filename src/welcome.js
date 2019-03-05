import React from 'react';
import axios from 'axios';
import Registration from './registration';

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <img src="logo.jpg"/>
                <Registration/>

            </div>
        );
    }


}
