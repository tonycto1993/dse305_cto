//var member = require("../models/member");
var frisby = require('frisby')

/*  // globalSetup defines any settigs used for ALL requests */
frisby.globalSetup({
  request: {
    headers: {'Authorization': 'Basic dGVzdHVzZXI6cDQ1NXcwcmQ=','Content-Type': 'application/json'}
  }
})


frisby.create('add a new member')
  .post('http://localhost:8082/searchBooksByKeyword', {"keyword": "harry proter"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss()
  
frisby.create('add a new member')
  .post('http://localhost:8082/searchBookByVolumeID', {"volumeID": "1ebwAAAAMAAJ"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss()