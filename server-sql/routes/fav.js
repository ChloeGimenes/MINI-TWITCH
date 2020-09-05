const express = require("express");
const connection = require("../config-sql");
const router = express.Router();
const cors = require("cors");


//*/ RETRIEVE ALL FAVORIS GAMES ///*/
router.get('/favoris/:user', cors(),function(req, res) {

    const us = req.params.user;
  
    console.log(req.params.user)
  
    connection.query(`SELECT * FROM games g JOIN favoris f ON g.id = games_id WHERE f.user = '${us}'` , us, function(err, results) {
    if (err) {
      console.log('Error in the query GET FAVORIS');
      // console.log("[mysql error]",err);
      res.status(500).send(err);
  
    } else { 
      res.json(results);
      console.log('Successful query', results);
     }
    });
  })
  
  
router.post("/fav", cors(), (req, res) => {
    
      console.log(req.body);
    const formData = {
      user: req.body.user,
      games_id: req.body.games_id,
    };
  
    connection.query("INSERT INTO favoris SET ?", formData, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  /* Delete a game in fav */
  router.delete("/favd/:user/:id", cors(), (req, res) => {
  
    const formData = { 
      id : req.params.id,
      user : req.params.user,
     
    }
  
    connection.query(`DELETE FROM favoris WHERE games_id = ${formData.id} AND user = '${formData.user}'`, formData,  (err, results) => {
      console.log(formData)
  
      if (err) {
        res.status(500).send(err);
        console.log(err)
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  