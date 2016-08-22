var member = require("../models/member");
var frisby = require('frisby')

/*  // globalSetup defines any settigs used for ALL requests */
frisby.globalSetup({
  request: {
    headers: {'Authorization': 'Basic dGVzdHVzZXI6cDQ1NXcwcmQ=','Content-Type': 'application/json'}
  }
})
/*
frisby.create('show member')
  .get('http://localhost:8081/test')
  .expectStatus(200)
  .toss()
*/

frisby.create('add a new member')
  .post('http://localhost:8081/register', {"user_name": "test", "password": "123467", "name" : "tester", "email" : "kkk@kkk.com"}, {json: true})
  .expectStatus(200)
  .toss()
  
frisby.create('login')
  .post('http://localhost:8081/register', {"user_name": "test", "password": "123467"}, {json: true})
  .expectStatus(200)
  .toss()
  
frisby.create('changePassword')
  .post('http://localhost:8081/register', {"user_name": "test", "password": "123467", "new_password": "888888"}, {json: true})
  .expectStatus(200)
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