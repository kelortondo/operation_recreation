import React from "react";

import "./App.css";
import SeasonsHours from "./SeasonsHours.jsx"

class CampgroundDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedCampground: {}
    }
  }

  componentDidMount() {
    this.getAvailabilityURL()
  }

  titleCase(str) {
    return str.trim().toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  getAvailabilityURL() {
    if (this.props.campground.reservationUrl.length == 0) {
      return;
    } else if (this.props.campground.reservationUrl.includes("https://www.recreation.gov/camping/campgrounds/")) {
      let month = new Date().toISOString().substr(5, 2);
      let campgroundID = this.props.campground.ridbInfo.FacilityID
      let availabilityUrl = `https://www.recreation.gov/api/camps/availability/campground/${campgroundID}/month?start_date=2021-${month}-01T00%3A00%3A00.000Z`;
      console.log(availabilityUrl)
    }
  }

  render() {
    return(
      <>
        <h4>{this.props.campground.name}</h4>
        <div>{this.props.campground.description}</div>

        <SeasonsHours operatingHours={this.props.campground.operatingHours}/>

        <h5>Reservations Info:</h5>
        <div>
          <p>{this.props.campground.reservationInfo}</p>
          {this.props.campground.reservationUrl.length > 0 ? <p><a href={this.props.campground.reservationUrl}>Make reservations!</a></p> : <p></p>}
        </div>
      </>
    );
  }
}

export default (CampgroundDetail);