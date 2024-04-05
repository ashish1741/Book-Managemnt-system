const mysql = require("mysql2");
require("dotenv").config()


const mysqlConnection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATBASE_NAME,
});


const connection = mysqlConnection.connect((Err) => {
  if (Err) {
    console.log(`SOMETHING WENT WRONG !! DB CANNOT CONNECT`);
  } else {
    console.log(`DB CONNECTED`);
    console.log(Err);
  }
});


module.exports = mysqlConnection;
