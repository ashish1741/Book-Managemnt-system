const bcrypt = require("bcrypt");
const connection = require("../config/connection");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      statusCode: 400,
      error: "please provide required field",
    });
  }

  try {
    const userExitQuery = `SELECT email FROM user`;
    const userExist = connection.query(userExitQuery, (err, rows) => {
      if (err) {
        console.error("Error retrieving emails:", err);
        return;
      }

      const userEmails = rows.map((curEle) => curEle.email);
      if (userEmails.includes(email)) {
        console.log(`User already exists`);
        return true;
      }
    });
    console.log(userExist);

    const hashPassword = await bcrypt.hash(password, 6);
    const createUserQuery = `INSERT INTO user (username , email ,  password ) VALUE (? , ? , ? )`;

    connection.query(
      createUserQuery,
      [username, email, hashPassword],
      (err) => {
        if (err) {
          return res.status(500).json({
            statusCode: 500,
            error: "Internal Server Error",
          });
        }

        res.status(200).json({
          statusCode: 200,
          message: "User created successfully",
        });
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  signUpUser,
};

//login End Point

const loginUser = (res, req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      statusCode: 400,
      error: "please provide email and password",
    });
  }

  try {

   const   query = `SELECT * FROM user WHERE email = ${email} & password = ${password}`;



  } catch (error) {}
};
