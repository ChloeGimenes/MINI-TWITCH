const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express');
const mysql = require("mysql");
const app = express();

const dotenv = require("dotenv")
dotenv.config();

// SQL CONNEXION
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

connection.connect(function(err) {
  
  if(err) {
    // throw new err("oops something happened");
    console.log(typeof(err));
    console.log("[mysql error]",err)
  
  } else {
    console.log('Node connected to mysql server')
  }
  
})

// CONN PARAMS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen('3040', () => {
 console.log('Server started on port 3040')
});

app.use(cors({
 credentials: true,
 crossorigin: true,
 origin: 'http://localhost:3000'
}));

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



//// GAMES ///////////////////

/*RETRIEVE ALL GAMES*/
app.get('/db', cors(),function(req, res) {

  connection.query("SELECT * FROM games", function(err, results) {
  if (err) {
    // console.log('Error in the query');
    // console.log("[mysql error]",err);
    res.status(500).send(err);

  } else { 
    res.json(results);
    console.log('Successful query DU GET');
   }
  });
})

// CATEGORIES /////////////////////

// RETRIEVE ALL KIDS CATEGORIE CAT
app.get('/kids', cors(),function(req, res) {
  
  connection.query("SELECT * FROM games_categories JOIN games on games.id = games_id WHERE categories_id = 1", function(err, results) {
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

// RETRIEVE ALL FIGHT CAT
app.get('/fights', cors(),function(req, res) {
 
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

// FAV ///////////////////

//RETRIEVE ALL FAV GAMES
app.get('/favoris/:user', cors(),function(req, res) {

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

//ADD FAV
app.post("/fav", cors(), (req, res) => {

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

// DELETE FAV
app.delete("/favd/:user/:id", cors(), (req, res) => {

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



