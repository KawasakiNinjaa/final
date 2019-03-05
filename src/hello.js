import React from 'react';
import Greetee from './greetee';
import GreeteeEditor from './greeteeeditor';

class Hello extends React.component {
    constructor(props){
        super(props);
        this.state ={
            greetee: props.greetee
        };
    }
    changeGreetee(greetee){
        this.setState({
            greetee
        });
    }

    render(){ const style ={
        color: "DeepPink",
        fontSize: "20px"
    };
    console.log(props);//it will log the prop you give when rendering (greetee="Kitty")
    return ( //all the elements must be wrapped together (no siblings allowed), BUT you can also pass an array of elements// string and null
        <div id="hi" className="greeting" style={style}>Hello,{props.greetee || "World"}!
            <p> Hello, <Greetee name={props.greete}/> </p>!
            <p> wussup </p>
            <GreeteeEditor changeGreetee={this.changeGreetee} name={this.state.greetee}/>

        </div> // you can add id to elements as usual, BUT for class we need className, after compilation it will be old class=""/ .class (css)
    );
    };





}
