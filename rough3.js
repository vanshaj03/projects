const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
  user: "root",
  password: "Vanshaj@2003",
  database:"nodejs"
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/addstudent.html', (req, res) => {
    res.sendFile(__dirname + '/addstudent.html');
});

app.post('/addstudent.html', (req, res) => 
{
    let roll=req.body.roll;
    let name = req.body.name;
    let dob = req.body.dob;
    let score=req.body.score;
    // let state=req.body.state;
    // let zip_code=req.body.zip;
    
    connection.query('INSERT INTO studentresult VALUES("' + roll + '","' + name + '","' + dob + '","' + score +  '");', (err, results) => {
        if (err) throw err;
        else {
          console.log(results);
          console.log("inserted successfully.");
          res.redirect('/viewallstudents.html');
        }
      });
    
      connection.end();
    });
    
    const port = 5500;
    const ip = '127.0.0.1';
    
    app.listen(port, ip, () => console.log(`This app is listening on port ${port} on IP address ${ip}`));