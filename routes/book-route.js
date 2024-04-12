const express =  require("express");
const bookController =  require("../controllers/book-controller");
const { jwtAuthMiddleware } = require("../middleware/jwtAuth");
const bookRouter =  express.Router();


bookRouter.get("/books" ,  jwtAuthMiddleware, bookController.getAllBook )
bookRouter.get("/books/:id" , bookController.getBookById )
bookRouter.post("/books" , bookController.createNewBook)
bookRouter.put("/books/:id" , bookController.updateBookInfo)
bookRouter.delete("/books/:id" , bookController.deleteBookInfo)


module.exports = bookRouter