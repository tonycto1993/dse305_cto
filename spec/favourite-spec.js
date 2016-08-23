var favourite = require("../models/favourite");
var frisby = require('frisby')

/*  // globalSetup defines any settigs used for ALL requests */
frisby.globalSetup({
  request: {
    headers: {'Authorization': 'Basic dGVzdHVzZXI6cDQ1NXcwcmQ=','Content-Type': 'application/json'}
  }
})


frisby.create('add to a favourite list')
  .post('http://localhost:8081/addToFavouriteList', {"user_name": "test3", "volume_id": "_ojXNuzgHRcC2", "notes" : "notes2"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
  
frisby.create('get favourite list')
  .post('http://localhost:8081/getFavouriteList', {"user_name": "test3"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
  
frisby.create('add notes')
  .post('http://localhost:8081/addNotes', {"user_name": "test3", "volume_id": "_ojXNuzgHRcC2", "notes" : "notes4"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
  
  
frisby.create('remove from favourite')
  .post('http://localhost:8081/removeFavourite', {"user_name": "test3", "volume_id": "_ojXNuzgHRcC2"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
  
  