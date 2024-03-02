const request = require('supertest');
const expect = require('chai').expect;
const createUserPayload = require('../testdata/userManagementdata.json');
const headers = require('../testdata/header.json')
var userId;
var userResponse; 
describe('User Management', () => {
    
    it('POST: should create user ', () => { 
        return request(baseUrl)
                .post('/user/user')			
                .set(headers[env])
                .set('Authorization', `Bearer ${authToken}`)
                .send(createUserPayload.createUser)
                .expect(201)
                .expect((res) => {                    
                    let response = JSON.stringify(res.status)
                    console.log("Response = "+ response);				
                })
    })
    
    it('POST: should get user that meet provided filter criteria', () => { 
        return request(baseUrl)
                .post('/user/user-advanced?pageNumber=0&pageSize=1')			
                .set(headers[env])
                .set('Authorization', `Bearer ${authToken}`)
                .send(createUserPayload.searchNewUser)
                .expect(200)
                .expect((res) => { 
                    userResponse = res;    
                    userId = JSON.stringify(res.body.content[0].userId).replace(/["]+/g, '')
                    console.log("User ID = "+ userId);				
                })
    }) 

    it('PUT: should update the user', () => { 
        // update the payload with userId and updating lastname 
        createUserPayload.createUser.user.userId = userId;
        createUserPayload.createUser.user.lastName = "User Updated";
       
        return request(baseUrl)
            .put('/user/user')			
            .set(headers[env])
            .set('Authorization', `Bearer ${authToken}`)
            .send(createUserPayload.createUser.user)
            .expect(200)
            .expect((res) => {                       
                console.log("Response = "+ res.status)			
            })
    })

    it('GET: should fetch all the users', () => { 
        return request(baseUrl)
        .get('/user/user?pageSize=50&pageNumber=0')
        .set(headers[env])
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
            let response = JSON.stringify(res.body)
            console.log("Response = "+ res.status);
        })				
    }) 

    it('PUT: should update the password of the user', () => {
        createUserPayload.updatePassword.userId = userId;
        return request(baseUrl)
        .put('/user/updatepassword')			
        .set(headers[env])
        .set('Authorization', `Bearer ${authToken}`)
        .send(createUserPayload.updatePassword)
        .expect(200)
        .expect((res) => {     
            if(res.err)                  
            console.log("Response = "+ res.err)			
        })
    })

    it('GET: should fetch user given an identifier', () => { 
        return request(baseUrl)
        .get('/user/user/'+userId)
        .set(headers[env])
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
            let response = JSON.stringify(res.status)
            console.log("Response = "+ response);
        })				
    }) 

    it('POST: should get user that match User IDs', () => { 
        return request(baseUrl)
                .post('/user/user/ids')			
                .set(headers[env])
                .set('Authorization', `Bearer ${authToken}`)
                .send(createUserPayload.usedIds)
                .expect(200)
                .expect((res) => { 
                    var response = res.status; 
                    console.log("Response = "+ res.body);				
                })
    }) 

    it('DELETE: should delete newly created user', () => { 
        return request(baseUrl)
                .delete('/user/user?userId='+userId)			
                .set(headers[env])
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200)
                .expect((res) => {     
                    let response = JSON.stringify(res.status)
                    console.log("Response = "+ response);				
                })
    })
});