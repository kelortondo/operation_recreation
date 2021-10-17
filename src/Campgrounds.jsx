import React from "react";

import "./App.css";
import CampgroundDetail from "./CampgroundDetail.jsx";

class Campgrounds extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedCampground: {}
    }
  }

  handleCampgroundClick(campground) {
    this.setState({
      selectedCampground: campground
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
      if (campground['reservationUrl'].length > 0) {
        reservable.push(<li key={campground['id']} onClick={() => {this.handleCampgroundClick(campground)}}> {this.titleCase(campground['name'])} </li>)
      } else {
        nonReservable.push(<li key={campground['id']} onClick={() => {this.handleCampgroundClick(campground)}}> {this.titleCase(campground['name'])} </li>)
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
        <div>
          <h3>Campground Detail</h3>
          {Object.keys(this.state.selectedCampground).length === 0 ?
            <div>Select a campground to display detailed information.</div> :
            <CampgroundDetail campground={this.state.selectedCampground} />
          }
        </div>
      </>
    );
  }
}

export default (Campgrounds);