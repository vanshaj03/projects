const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// create mysql connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vanshaj@2003',
  database: 'nodejs'
});

// connect to mysql
connection.connect(function(error) {
  if (error) throw error;
  console.log('Connected to database');
});

// route to render the HTML form
app.get('/update.html', function(req, res) {
    res.sendFile(__dirname + '/update.html');
});

// route to handle the form submission
app.post('/update.html', function(req, res) {
  const roll = req.body.roll;
  const name = req.body.name;
  const dob = req.body.dob;
  const score = req.body.score;

  // update the user record in the database
  connection.query('UPDATE studentresult SET roll = ?, name = ? WHERE dob = ?, SET score = ?', [roll, name, dob, score], function(error, results, fields) {
    if (error) throw error;
    res.send(`User ${name} updated successfully`);
  });
});

// start the server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
