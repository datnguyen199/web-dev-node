let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'node-db'
});
connection.connect(err => {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected!');
  }
});

module.exports = connection;
