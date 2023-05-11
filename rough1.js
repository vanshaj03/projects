const http = require('http');
const url = require('url');
const fs = require('fs');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vanshaj@2003",
  database: "nodejs"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

http.createServer(function(req, res) {
  const q = url.parse(req.url, true);
  const filename = "." + q.pathname;
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const roll = formData.get('roll');
      const name = formData.get('name');
      const dob = formData.get('dob');
      const score = formData.get('score');
      const sql = "INSERT INTO studentresult (roll, name, dob, score) VALUES (?, ?, ?, ?)";
      con.query(sql, [roll, name, dob, score], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.writeHead(302, {'Location': '/addstudent1.html'});
        return res.end();
      });
    });
  } else {
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': '/addstudent1.html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': '/addstudent1.html'});
      res.write(data);
      return res.end();
    });
  }
}).listen(3000);

