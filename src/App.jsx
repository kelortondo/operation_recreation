import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
const axios = require('axios');
import RecAreas from "./RecAreas.jsx"



class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      recAreas: [],
      nationalParks: []
    }
  }

  componentDidMount() {
/*     axios.get("/recAreas", {'params': {'limit': 50, 'offset': 0, 'state': 'CO', 'sort': 'Name', 'full': true}})
    .then((response) => {
      this.setState({
        recAreas: response['data']['RECDATA']
      })
    })
    .catch((err) => {
      console.log(err)
    }) */

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

  render(){
    return(
      <div className="App">
        <RecAreas recAreas={this.state.nationalParks}/>
      </div>
    );
  }
}

export default hot(module)(App);