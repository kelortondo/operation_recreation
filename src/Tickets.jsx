import React from "react";

import "./App.css";

class Tickets extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedTicketFacility: {}
    }
  }

  handleCampgroundClick(facility) {
    this.setState({
      selectedTicketFacility: facility
    })
  }

  titleCase(str) {
    return str.trim().toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  render() {
    return(
      <>
        <h2>Ticket Facilities</h2>
          <ul>
            {this.props.tickets.map((facility) => <li key={facility['FacilityID']}>{this.titleCase(facility['FacilityName'])}</li>)}
          </ul>
        <h2>Tours</h2>
          <ul>
            {this.props.tours.map((tour) => <li key={tour['TourID']}>{this.titleCase(tour['TourName'])}</li>)}
          </ul>
        <h2>Visitors Centers</h2>
          <ul>
          {this.props.visitorCenters.map((facility) => <li key={facility['FacilityID']}>{this.titleCase(facility['FacilityName'])}</li>)}
          </ul>
      </>
    );
  }
}

export default (Tickets);