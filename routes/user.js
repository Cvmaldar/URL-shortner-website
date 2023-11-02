const express=require("express");
const { Handleusersignup,Handleuserlogin } = require("../controllers/user-controller");

const router=express.Router();

router.post("/",Handleusersignup);
router.post("/login",Handleuserlogin);

module.exports=router;