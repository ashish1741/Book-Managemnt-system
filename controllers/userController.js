const bcrypt = require("bcrypt");
const connection = require("../config/connection");
const {
  generateJwtToken,
  jwtAuthMiddleware,
} = require("../middleware/jwtAuth");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      statusCode: 400,
      error: "please provide required field",
    });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const createUserQuery = `INSERT INTO user (username , email ,  password ) VALUE (? , ? , ? )`;
    const payload = {
      username,
      email,
    };

    connection.query(
      createUserQuery,
      [username, email, hashPassword],
      async (err, row) => {
        if (err) {
          return res.status(500).json({
            statusCode: 500,
            error: "Internal Server Error",
          });
        }

        if (row.affectedRows === 1) {
          const token = generateJwtToken(payload);
          res.status(200).json({
            statusCode: 200,
            message: "User created successfully",
            token: token,
          });
        }
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
          error: "Invalid email ",
        });
      }

      const user = result[0];
      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res.status(401).json({
          statusCode: 401,
          error: "Invalid  password",
        });
      }

      //generated token

      const payload = {
        id: user.id,
        username: user.username,
      };

      const token = generateJwtToken(payload);

      // Successful login
      return res.status(200).json({
        statusCode: 200,
        message: "Login successful",
        user: user,
        token: token,
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
};

//password change

const getPasswordChange = () => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !!newPassword) {
    res.status(400).json({
      statusCode: 400,
      Error: "Please Provide Require Field",
    });
  }
};

//updateUser Info

const updateUserInfo = async (req, res) => {
  const id = req.params.id;
  const { username, email } = req.body;
  console.log(id);

  if (!username || !email) {
    return res.status(400).json({
      statusCode: 400,
      Error: "Please Provide the file",
    });
  }

  try {
    const query = `UPDATE user SET username = ? ,  email = ? WHERE id = ? `;

    connection.query(query, [username, email, id], (err, result) => {
      if (err) {
        console.error("Error updating book:", err);
        return res.status(500).json({
          statusCode: 500,
          error: "Internal Server Error",
        });
      }

      if (result.affectedRows > 0) {
        res.status(200).json({
          statusCode: 200,
          message: "user information updated successfully",
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          error: "user not found",
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
};

//Delete User
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const query = "DELETE FROM user WHERE id = ? ";

    connection.query(query, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          error: "Internal Server Error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          statusCode: 404,
          error: "user not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        error: "User Deleted !",
      });
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
};

// user profile


const getUserProfile = async (req, res) => {
  try {
    const id = req.userData.id;
    

    const query = `SELECT * FROM user WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          statusCode: 500,
          error: "Internal server error",
        });
      }

      if (result.length > 0) {
        const user = result[0];
        return res.status(200).json({
          statusCode: 200,
          user: user,
        });
      } else {
        return res.status(404).json({
          statusCode: 404,
          error: "User not found",
        });
      }
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
};


module.exports = {
  signUpUser,
  loginUser,
  updateUserInfo,
  deleteUser,
  getUserProfile
};
