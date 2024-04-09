const express =  require("express");
const authController =  require("../controllers/auth-controller");
const authRouter =  express.Router();



authRouter.post("/sign-up" , authController.signUpUser );
authRouter.post("/login" ,  authController.loginUser)



module.exports =   authRouter;




