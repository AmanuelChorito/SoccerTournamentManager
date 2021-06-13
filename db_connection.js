const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "FIFA",
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("conneced");
});
module.exports = conn;
