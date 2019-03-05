import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this[e.target.name] = e.target.value;
    }
    submit(){
        axios.post('/registration', {
            first: this.first,
            last: this.last
        }).then(({data}) =>{
            if (data.success){
                //dosomething
                location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            //{we need to make a fn to
            <div>
                <h2>  s i g n  up </h2>
                {this.state.error && <div className="error"> Oops! </div>}
                <input name="first" onChange={this.handleChange} placeholder="First Name"/>
                <br/><br/>
                <input name="last" placeholder="Last Name" />
                <br/><br/>
                <input name="email" placeholder="e-mail"/>
                <br/><br/>
                <input type="password" name="password" placeholder="password"/>
                <br/><br/>
                <button>  submit </button>
            </div>
        );
    }


}
