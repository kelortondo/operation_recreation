import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
const axios = require('axios');
import Facilities from "./Facilities.jsx"

axios.defaults.headers = {
  'Content-Type': 'application/json',
  'apikey': process.env.API_KEY
}

axios.defaults.baseURL = "https://ridb.recreation.gov/api/v1"

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      facilities: []
    }
  }

  componentDidMount() {
    axios.get("/facilities?limit=50&offset=0&state=CO")
    .then((response) => {
      console.log(response)
      this.setState({
        facilities: response['RECDATA']
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render(){
    return(
      <div className="App">
        <Facilities facilities={this.state.facilities}/>
      </div>
    );
  }
}

export default hot(module)(App);