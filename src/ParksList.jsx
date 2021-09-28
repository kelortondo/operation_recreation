import React from "react";

import "./App.css";

class ParksList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedPark: {}
    }
  }

  handleParkClick(park) {
    this.setState({
      selectedPark: park
    })
    this.props.setSelectedPark(park)
  }

  render() {
    return(
      <ul>
        {this.props.recAreas.map((entry =>
          this.state.selectedPark['RecAreaID'] == entry['RecAreaID']
            ? <li key={entry['RecAreaID']}> <b>{entry['RecAreaName']}</b> </li>
            : <li key={entry['RecAreaID']} onClick={() => {this.handleParkClick(entry)}}> {entry['RecAreaName']} </li>
        ))}
      </ul>
    );
  }
}

export default (ParksList);