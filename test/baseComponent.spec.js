const request = require('supertest');
const expect = require('chai').expect;
const userdata = require('../testdata/credentials.json');
const headers = require('../testdata/header.json')
const utility = require('../utilities/commonUtility')
global.baseUrl = process.env.BASE_URL;
global.env ;

before(() => { 
    
	if(baseUrl.includes("qa")){ 
		env = "qa"; 
	} else { 
		env = "test"; 
	}
	const appUser = {
		emailAddress: utility.getUsername("tenant_admin"),
		password: utility.getPassword("tenant_admin")
	};
        
	return request(baseUrl)
	.post('/auth/login')
	.set("Content-Type","multipart/form-data")
	.set(headers[env])
	.field(appUser)
	.expect((res) => { 
		authToken = res.header.authorization.substring("Bearer ".length)
		console.log("Auth Token = " + authToken)
	})		
})