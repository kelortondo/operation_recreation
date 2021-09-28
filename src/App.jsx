import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
const axios = require('axios');
import ParksList from "./ParksList.jsx";
import Campgrounds from "./Campgrounds.jsx";
import Tickets from "./Tickets.jsx";


class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      ticketFacilities: [],
      nationalParks: [],
      campgrounds: [],
      selectedPark: {}
    }
  }

  componentDidMount() {
    axios.get('/nationalParks')
    .then((response) => {
      this.setState({
        nationalParks: response['data']
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  getParkReservables(park) {
    this.setState({
      selectedPark: park
    })
    axios.get('/facilities', {'params': {'RecAreaID': park['RecAreaID']}})
    .then((response) => {
      this.setState({
        campgrounds: response['data']['campgrounds'],
        ticketFacilities: response['data']['ticketFacilities']
      })
    })
  }

  render(){
    return(
      <div className="App">
        <div className="column">
          <h1>National Parks:</h1>
          <ParksList recAreas={this.state.nationalParks} setSelectedPark={this.getParkReservables.bind(this)}/>
        </div>
        <div className="column">
          <h1>Things you may want to reserve:</h1>
          <Campgrounds campgrounds={this.state.campgrounds}/>
          <Tickets tickets={this.state.ticketFacilities}/>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);