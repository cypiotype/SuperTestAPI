const request = require('supertest');
const expect = require('chai').expect;
const userdata = require('../testdata/credentials.json');

module.exports = { 
    getUsername: (role) => { 
        if ( env === 'qa'){ 
            return userdata.qa[role].username;
        } else {
            return userdata.test[role].username;
        }
    },
    getPassword: (role) => { 
        if ( env === 'qa'){ 
            return userdata.qa[role].password;
        } else {
            return userdata.test[role].password;
        }
    }
}