const shortid=require("shortid");

const URL=require("../models/url");

const handleGenerateUrl=async(req,res)=>{
    const url=req.body.url;
    if(!url){
        return res.status(400).json({error:"url is required"});
    }
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectUrl:url,
        visitHistory:[],
        createdBy:req.user._id,
    });
    return res.render("home",{
      id:shortID,
    })
    // return res.json({id:shortID});
}

const handleAnalytics=async(req, res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
  

exports.handleAnalytics=handleAnalytics;
exports.handleGenerateUrl=handleGenerateUrl;
