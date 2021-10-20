const express = require('express')
const app = express()
const port = process.env.PORT || 5000
app.use(express.static(__dirname + '/dist'));
const axios = require('axios');

axios.defaults.headers = {
  'Content-Type': 'application/json'
}

const baseURL = "https://ridb.recreation.gov/api/v1"
const baseURLNPS = "https://developer.nps.gov/api/v1"

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/campgrounds', (req, res) => {
  let params = {}
  params['api_key'] = process.env.API_KEY_NPS
  params['parkcode'] = req.query.parkcode
  let facilitiesInfo = {
    campgrounds: [],
  }
  axios.get(baseURLNPS + '/campgrounds', {'params': params})
  .then((response) => {
    facilitiesInfo['campgrounds'] = response['data'];
    axios.get(baseURL + '/recareas/' + req.query.recAreaId + '/facilities?limit=50&offset=0', {'params': {'apikey': process.env.API_KEY}})
    .then((response) => {
      let data = response['data']['RECDATA']
      facilitiesInfo['campgrounds']['data'].forEach((campground) => {
        const campgroundName = campground.name.toLowerCase();
        for (let i = 0; i < data.length; i++) {
          let facility = data[i];
          if (campgroundName === facility['FacilityName'].toLowerCase()) {
            campground['ridbInfo'] = facility;
            break;
          }
        }
      })
      res.send(facilitiesInfo)
    })
    .catch((err) => {
      console.log(err)
    })
  })
  .catch((err) => {
    res.send(err)
  })
})

app.get('/nationalParks', (req, res) => {
  let total_parks = null;
  let parks = [];
  let requests = [];
  let filtered_parks = []
  const regex = /(National Park)/

  params = {
    'query': 'National Park',
    'limit': 50,
    'offset': 0,
    'sort': 'Name',
    'apikey': process.env.API_KEY
  }

  // Retrieve a list of all the national parks
  axios.get(baseURL + '/organizations/128/recareas', {'params': params})
  .then((response) => {
    // total_parks represents the total number that could be returned
    total_parks = response['data']['METADATA']['RESULTS']['TOTAL_COUNT'];
    parks = response['data']['RECDATA']

    // The API from recreation.gov only allows 50 parks to be returned, so we will assemble
    // an array of requests we can make to get all of the parks back
    while (params['offset'] < total_parks) {
      params['offset'] = params['offset'] + 50;
      let request = axios.get(baseURL + '/organizations/128/recareas', {'params': params});
      requests.push(request)
    }

    // Send all of the necessary API requests to get back all of the parks, and assemble
    // the responses into a single array
    axios.all(requests)
    .then(axios.spread((...responses) => {
      responses.forEach((response) => {
        parks = [...parks, ...response['data']['RECDATA']]
      })
      // Filter out anything that is not a National Park
      parks.forEach((park) => {
        if (regex.test(park['RecAreaName']) && park['OrgRecAreaID'] != "") {
          filtered_parks.push(park)
        }
      })
      res.send(filtered_parks)
    }))
    .catch((err) => {
      res.send(err)
    })
  })
  .catch((err) => {
    res.send(err)
  })
})