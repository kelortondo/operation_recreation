const express = require('express')
const app = express()
const port = process.env.PORT || 5000
app.use(express.static(__dirname + '/dist'));
const axios = require('axios');

axios.defaults.headers = {
  'Content-Type': 'application/json'
}

const baseURL = "https://ridb.recreation.gov/api/v1"

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/facilities', (req, res) => {
  let params = {}
  params['apikey'] = process.env.API_KEY

  axios.get(baseURL + `/recareas/${req.query.RecAreaID}/facilities?limit=50&offset=0`, {'params': params})
  .then((response) => {
    let facilitiesInfo = {
      campgrounds: [],
      ticketFacilities: [],
      visitorCenters: [],
      tours: []
    }
    let facilityRequests = [];

    response['data']['RECDATA'].forEach((facility) => {
      let tourRequest = axios.get(baseURL + `/facilities/${facility['FacilityID']}/tours?limit=50&offset=0`, {'params': params});
      facilityRequests.push(tourRequest)

      if (facility['FacilityTypeDescription'] == "Ticket Facility" ) {
        facilitiesInfo['ticketFacilities'].push(facility)
      } else if (facility['FacilityTypeDescription'] == "Campground") {
        facilitiesInfo['campgrounds'].push(facility)
      } else if (facility['FacilityTypeDescription'] == "Visitor Center" || facility['FacilityTypeDescription'] == "Facility") {
        facilitiesInfo['visitorCenters'].push(facility)
      }
    })

    axios.all(facilityRequests)
    .then(axios.spread((...responses) => {
      responses.forEach((response) => {
        facilitiesInfo['tours'] = [...facilitiesInfo['tours'], ...response['data']['RECDATA']]
      })
    }))
    .then(() => {
      res.send(facilitiesInfo)
    })
    .catch((err) => {
      res.send(err)
    })
  })
})

app.get('/nationalParks', (req, res) => {
  let offset = 0;
  let parks = [];
  let total_parks = null;
  let requests = [];
  const regex = /(National Park)/
  let filtered_parks = []

  params = {
    'query': 'National Park',
    'limit': 50,
    'offset': offset,
    'sort': 'Name',
    'apikey': process.env.API_KEY
  }

  axios.get(baseURL + '/organizations/128/recareas', {'params': params})
  .then((response) => {
    total_parks = response['data']['METADATA']['RESULTS']['TOTAL_COUNT'];
    parks = response['data']['RECDATA']

    while (params['offset'] < total_parks) {
      params['offset'] = params['offset'] + 50;
      let request = axios.get(baseURL + '/organizations/128/recareas', {'params': params});
      requests.push(request)
    }

    axios.all(requests)
    .then(axios.spread((...responses) => {
      responses.forEach((response) => {
        parks = [...parks, ...response['data']['RECDATA']]
      })

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