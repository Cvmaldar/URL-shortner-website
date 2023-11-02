const express=require("express");
const urlController=require("../Controllers/Url-controller");
const router=express.Router();

router.post("/",urlController.handleGenerateUrl);
router.get("/analytics/:shortId",urlController.handleAnalytics);


module.exports=router;