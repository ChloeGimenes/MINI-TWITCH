const express = require("express");
const connection = require("../config-sql");
const router = express.Router();
const cors = require("cors");


router.get('/db', cors(),function(req, res) {

    connection.query("SELECT * FROM games", function(err, results) {
    if (err) {
      res.status(500).send(err);
  
    } else { 
      res.json(results);
      console.log('Successful query DU GET');
     }
    });
  })