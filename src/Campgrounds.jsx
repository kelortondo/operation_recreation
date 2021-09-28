import React from "react";

import "./App.css";

class Campgrounds extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedCampground: {}
    }
  }

  handleCampgroundClick(park) {
    this.setState({
      selectedCampground: park
    })
  }

  titleCase(str) {
    return str.trim().toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  render() {
    let reservable = [];
    let nonReservable = [];

    this.props.campgrounds.forEach((campground) => {
      if (campground['Reservable']) {
        reservable.push(<li key={campground['FacilityID']} onClick={() => {this.handleCampgroundClick(campground)}}> {this.titleCase(campground['FacilityName'])} </li>)
      } else {
        nonReservable.push(<li key={campground['FacilityID']} onClick={() => {this.handleCampgroundClick(campground)}}> {this.titleCase(campground['FacilityName'])} </li>)
      }
    })

    return(
      <>
        <h2>Campgrounds</h2>
        <h3>Reservable:</h3>
          <ul>
            {reservable}
          </ul>
        <h3>Non-Reservable:</h3>
          <ul>
            {nonReservable}
          </ul>
      </>
    );
  }
}

export default (Campgrounds);