import React from "react";

import "./App.css";

class SeasonsHours extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.operatingHours.length === 0) {
      return(
        <>
          <h5>Seasons/Hours:</h5>
          <p>No information on seasons/hours provided by NPS.</p>
        </>
      )
    } else {
      return (
        <>
          <h5>Seasons/Hours:</h5>
          <div>{this.props.operatingHours[0].description}</div>
          {this.props.operatingHours[0].exceptions.map((exception) => <p>{exception.name}: {exception.startDate} through {exception.endDate}</p>)}
        </>
      )
    }
  }
}

export default (SeasonsHours);