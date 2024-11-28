const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
user: 'yourusername',
password: 'yourpassword',
database: 'my_db'
});

connection.connect(function(err) {
if (err) throw err;
console.log('Connected!');
});