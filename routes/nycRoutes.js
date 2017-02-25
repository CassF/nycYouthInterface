const express = require("express");
const router = express.Router();
const path = require("path");
const request = require('request');
const hash = require('password-hash');
const NYC_API = process.env.NYC_API || 'http://localhost:3000';


//SECURITY
router.post('/secure', (req, res) => {
   
    let username = req.body.username;
    let password = req.body.password;
    req.body = {
        username: username,
        password: password
    }
    request({
        uri: NYC_API + '/security',
        method: "POST",
        form: req.body
    }, 
    function(error, response, body) {
        res.send(body); 
    });
});

router.post('/', (req, res) => {
    request({
        uri:  NYC_API + '/youth',
        method: "POST",
        form: req.body
    }, 
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body); 
        } else{
            res.send(error);
        }
    });
});

//get request to display records from the database
router.get('/', (req, res) => {
    request({
        uri: NYC_API + '/youth',
        method: "GET"
    },

    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body); 
        } else{
            res.json(error);
        }
    });
});

//get request to display records from the database
router.get('/females', (req, res) => {
    request({
        uri: NYC_API + '/youth/females',
        method: "GET"
    },

    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body); 
        } else{
            res.json(error);
        }
    });
});

router.get('/males', (req, res) => {
    request({
        uri: NYC_API + '/youth/males',
        method: "GET"
    },

    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body); 
        } else{
            res.json(error);
        }
    });
});

//TOTAL
router.get('/total', (req, res) => {
    request({
        uri: NYC_API + '/totalpayment',
        method: "GET"
    },

    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body); 
        } else{
            res.json(error);
        }
    });
});


//get request to display records from the database
router.get('/:id', (req, res) => {
    request({
        uri: NYC_API + '/youth/' + req.params.id,
        method: "GET"
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body); 
        } else{
            res.json(error);

        }
    });
});

router.get('/:id/pay', (req, res) => {
    request({
        uri: NYC_API + '/payments/' + req.params.id,
        method: "GET"
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body); 
        } else{
            res.json(error);

        }
    });
});

router.post('/pay', (req, res) => {
    request({
        uri:  NYC_API + '/payments',
        method: "POST",
        form: req.body
    }, 
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body); 
        } else{
            res.send(error);
        }
    });
});

module.exports = router;
