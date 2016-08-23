var member = require("../models/member");
var frisby = require('frisby')

/*  // globalSetup defines any settigs used for ALL requests */
frisby.globalSetup({
  request: {
    headers: {'Authorization': 'Basic dGVzdHVzZXI6cDQ1NXcwcmQ=','Content-Type': 'application/json'}
  }
})

frisby.create('add a new member')
  .post('http://localhost:8081/register', {"user_name": "test4", "password": "123467", "name" : "tester4", "email" : "kkk@kkk.com"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
  
frisby.create('login')
  .post('http://localhost:8081/login', {"user_name": "test3", "password": "123467"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
  
frisby.create('changePassword')
  .post('http://localhost:8081/changePassword', {"user_name": "test3", "password": "999999", "new_password": "123456"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
  
frisby.create('verify member')
  .post('http://localhost:8081/verifyMember', {"user_name": "test3"}, {json: true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectBody()
  .toss()
/*
describe("member", function () {
    
	it('should clear the list before starting', function() {
		var result = member.all()
		//expect(result).toBe(1);
		console.log(result);
	});
	

    
  it("should multiply 2 and 3", function () {
    var product = calculator.multiply(2, 3);
    expect(product).toBe(6);
  });
});
*/