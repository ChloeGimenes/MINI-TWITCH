const express = require("express");
const connection = require("../config-sql");
const router = express.Router();
const cors = require("cors");


/*RETRIEVE ALL KIDS CATEGORIE GAMES */
router.get('/kids', cors(),function(req, res) {
    // const idUrl = req.params.id;
    connection.query("SELECT * FROM games_categories JOIN games on games.id = games_id WHERE categories_id = 1", function(err, results) {
    if (err) {
      res.status(500).send(err);
  
    } else { 
      res.json(results);
      console.log('Successful query');
     }
    });
  })
  
  //*RETRIEVE ALL FIGHT CATEGORIE GAMES*/
  router.get('/fights', cors(),function(req, res) {
   
    connection.query("SELECT * FROM games_categories JOIN games on games.id = games_id WHERE categories_id = 2", function(err, results) {
    if (err) {
      // console.log('Error in the query');
      // console.log("[mysql error]",err);
      res.status(500).send(err);
  
    } else { 
      res.json(results);
      console.log('Successful query');
     }
    });
  })