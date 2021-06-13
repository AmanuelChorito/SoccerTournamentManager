const mysql = require("mysql");
const conn = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b0f3977a8a737c",
  password: "7c66c3c3",
  database: "heroku_082c330c1b339b6",
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("conneced");
});
module.exports = conn;
