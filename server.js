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

app.get('/recAreas', (req, res) => {
  let params = req.query;
  params['apikey'] = process.env.API_KEY

  axios.get(baseURL + '/recareas', {'params': params})
  .then((response) => {
    res.send(response['data'])
  })
  .catch((err) => {
    console.log(err)
    res.send(err)
  })
})