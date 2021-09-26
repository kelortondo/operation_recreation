import React, { Component} from "react";
import {hot} from "react-hot-loader";

import "./App.css";

class Facilities extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ul>
        {this.props.facilities.map((entry =>
          <li>{entry}</li>
        ))}
      </ul>
    );
  }
}

export default hot(module)(Facilities);