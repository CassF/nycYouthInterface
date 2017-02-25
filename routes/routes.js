const express = require("express");
const router = express.Router();
const path = require("path");
const request = require('request');
const NYC_API = process.env.NYC_API || 'http://localhost:3000';



//any route will be handled by Vue
router.get('*', (req, res) => {
    res.sendFile(`index.html`,{root:path.resolve('./public')});
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


module.exports = router;
