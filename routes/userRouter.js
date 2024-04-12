const express =  require("express");
const authController =  require("../controllers/userController");
const { jwtAuthMiddleware } = require("../middleware/jwtAuth");
const authRouter =  express.Router();



authRouter.post("/sign-up" , authController.signUpUser );
authRouter.post("/login" ,  authController.loginUser);
authRouter.put("/update/:id" ,  authController.updateUserInfo)
authRouter.delete("/delete/:id" ,  authController.deleteUser)
authRouter.get("/userProfile" ,  jwtAuthMiddleware ,  authController.getUserProfile)



module.exports =   authRouter;




