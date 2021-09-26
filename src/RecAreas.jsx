import React from "react";

import "./App.css";

class RecAreas extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ul>
        {this.props.recAreas.map((entry =>
          <li>{entry['RecAreaName']}</li>
        ))}
      </ul>
    );
  }
}

export default (RecAreas);