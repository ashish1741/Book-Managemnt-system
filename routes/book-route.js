const express =  require("express");
const bookController =  require("../controllers/book-controller")
const bookRouter =  express.Router();


bookRouter.get("/books" , bookController.getAllBook )
bookRouter.get("/books/:id" , bookController.getBookById )
bookRouter.post("/books" , bookController.createNewBook)
bookRouter.put("/books/:id" , bookController.updateBookInfo)
bookRouter.delete("/books/:id" , bookController.deleteBookInfo)


module.exports = bookRouter