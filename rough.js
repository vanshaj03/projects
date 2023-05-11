 
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // change the host to the server's IP address
  user: 'root',
  password: 'Vanshaj@2003',
  database: 'nodejs'
});


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/create_account.html', (req, res) => {
  res.sendFile(__dirname + '/addstudent1.html');
});

app.post('/addstudent1.html', (req, res) => {
  let roll = req.body.roll;
  let name = req.body.name;
  let dob = req.body.dob;
  let score = req.body.score;

  connection.query('INSERT INTO studentresult VALUES("' + roll + '","' + name + '","' + dob + '","' + score + '");', (err, results) => {
    if (err) throw err;
    else {
      console.log(results);
      console.log("inserted successfully.");
      res.redirect('/viewallstudents.html');
    }
  });

  connection.end();
});

// const port = 5500;

// app.listen(port, '192.168.0.10', () => console.log(`This app is listening on port ${port} on server '192.168.0.10'`));

const port = 5500;
const ip = '127.0.0.1';

app.listen(port, ip, () => console.log(`This app is listening on port ${port} on IP address ${ip}`));
