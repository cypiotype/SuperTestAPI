const request = require('supertest');
const expect = require('chai').expect;
const headers = require('../testdata/header.json')
var deviceId;
describe('Device Management', () => {
		
    it('should fetch all devices', () => { 
        return request(baseUrl)
        .get('/user/device?pageNumber=0&pageSize=100&sortBy=name&sortOrder=ASC')
        .set(headers[env])
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
            let response = JSON.stringify(res.body.content[0].name)
            console.log("Response = "+ response);				
        })
    })
});
