import React from "react";

import "./App.css";

class CampgroundDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedCampground: {}
    }
  }

  titleCase(str) {
    return str.trim().toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  render() {


    return(
      <>
        <h4>{this.props.campground.name}</h4>
        <div>{this.props.campground.description}</div>
        <h5>Reservations Info:</h5>
        <div>{this.props.campground.reservationInfo}</div>
      </>
    );
  }
}

export default (CampgroundDetail);