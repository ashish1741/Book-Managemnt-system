const connection = require("../config/connection");

const getAllBook = (req, res) => {
  try {
    connection.query("SELECT * FROM books", (err, rows) => {
      if (err) {
        console.error("Error fetching books:", err);
        return res
          .status(500)
          .json({ statusCode: 500, error: "Internal Server Error" });
      }
      res.status(200).json({
        statusCode: 200,
        data: rows,
      });
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
  }
};

const getBookById = (req, res) => {
  const id = req.params.id;
  try {
    connection.query("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error("Error fetching books:", err);
        return res
          .status(500)
          .json({ statusCode: 500, error: "Internal Server Error" });
      }
      res.status(200).json({
        statusCode: 200,
        data: row,
      });
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
  }
};

// create a new book
const createNewBook = (req, res) => {
  try {
    const { title, author, published_year } = req.body;

    if (!title || !author || !published_year) {
      return res.status(400).json({
        statusCode: 400,
        error: "No information is provided",
      });
    }

    connection.query(
      `INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)`,
      [title, author, published_year],
      (err, result) => {
        if (err) {
          console.error("Error inserting book:", err);
          return res.status(400).json({
            statusCode: 400,
            error: "Something went wrong",
          });
        }

        if (result.affectedRows > 0) {
          return res.status(200).json({
            statusCode: 200,
            message: "Book added to database",
          });
        } else {
          return res.status(400).json({
            statusCode: 400,
            error: "Failed to add book to database",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error creating new book:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
    });
  }
};

//update specifice  Book

const updateBookInfo = (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, published_year } = req.body;

    if (!title || !author || !published_year) {
      return res.status(400).json({
        statusCode: 400,
        error: "No information is provided",
      });
    }

    const query = `UPDATE books SET title = ? ,  author = ?  ,  published_year = ?  WHERE id = ? `;

    connection.query(
      query,
      [title, author, published_year, id],
      (err, result) => {
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
            message: "Book information updated successfully",
          });
        } else {
          res.status(200).json({
            statusCode: 200,
            error: "book not found",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
    });
  }
};

const deleteBookInfo = (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM books WHERE id = ?`;

    connection.query(query, id, (err, result) => {
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
          message: "Book information deleted successfully",
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          error: "book not found",
        });
      }
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
    });
  }
};



module.exports = {
  getAllBook,
  getBookById,
  createNewBook,
  updateBookInfo,
  deleteBookInfo,
};
