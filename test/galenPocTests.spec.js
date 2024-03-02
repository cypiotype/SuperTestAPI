const request = require('supertest');
const expect = require('chai').expect;
const userdata = require('../testdata/credentials.json');
const headers = require('../testdata/header.json')
describe('POC for API tests using supertest', () => {
		
		it('should fetch all the suppliers', () => { 
			return request(baseUrl)
			.get('/user/supplier')
			.set(headers[env])
			.set('Authorization', `Bearer ${authToken}`)
			.expect(200)
			.expect((res) => {
				let response = JSON.stringify(res.body)
				console.log("Response = "+ res.status);
			})				
		})

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

		xit('should create device data for a device', () => { 

			const payload = {
				deviceDataModelId:"ebad6722-c354-432c-afdf-b468d0034af5",
				devicePropertySetId:"efeb18ed-e1c4-4807-94b5-20106f568d5e",
				data:
				{
					"Text":"Testing API Automation",
					"Number": 1455
				}
			};
			return request(baseUrl)
			.post('/data/devicedata')			
			.set(headers[env])
			.set('Authorization', `Bearer ${authToken}`)
			.send(payload)
			.expect(201)
			.expect((res) => {
				let response = JSON.stringify(res.status)
				console.log("Response = "+ response);				
			})
		})

		xit('should upload file larger than 100MB for an existing device data', async() => { 
			const payload2 = {
                deviceDataModelId:"c5390d18-25f3-4755-9841-4a27039a1e96",
                propertyCode:"Video"
            };
			return await request(baseUrl)
			.post('/data/devicedata/a7d7dd89-07b5-4c19-be2b-b28728d20521')
			.set(headers[env])			
			.set('Authorization', `Bearer ${authToken}`)
			.set("Content-Type","multipart/form-data")
			.field(payload2)
			.attach("data","./uploads/sample-mp4-file.mp4")		
			.expect(201)	
			.expect((res) => { 
				let response = JSON.stringify(res.status)
				console.log("Response = "+ response);								
		 })
		
		
      });
	});
