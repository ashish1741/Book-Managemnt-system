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
   
    // const UserExistQuery = "SELECT * FROM user WHERE email = ?";

    // const userExist =  connection.query(UserExistQuery ,  email , (err , result) => {
    //   if (err) {
    //     return false
        
    //   }

    //   return true ;

    // } )

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const createUserQuery = `INSERT INTO user (username , email ,  password ) VALUE (? , ? , ? )`;

    connection.query(
      createUserQuery,
      [username, email, hashPassword],
     async  (err , result) => {
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

//login End Point

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      error: "Please provide email and password",
    });
  }


  try {
    const query = `SELECT * FROM user WHERE email = ?`;

    connection.query(query, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          error: "Internal server error",
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          statusCode: 401,
          error: "Invalid email or password",
        });
      }

      const user = result[0];
      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res.status(401).json({
          statusCode: 401,
          error: "Invalid email or password",
        });
      }

      // Successful login
      return res.status(200).json({
        statusCode: 200,
        message: "Login successful",
        user: user,
      });

    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
}


//password change

const getPasswordChange = () => {
  const {oldPassword ,  newPassword} =  req.body ;

  if (!oldPassword || !! newPassword) {
    res.status(400).json({
      statusCode:400 ,
      Error:'Please Provide Require Field'
    })
    
  }


}













module.exports = {
  signUpUser,
  loginUser,
};
