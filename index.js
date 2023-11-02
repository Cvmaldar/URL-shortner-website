const express=require("express");
const path=require("path");
const app=express();
const {checkforAuthentication,restrictTo}=require("./middleware/auth")
const PORT=3000;
const {connectionToMongoDB}=require("./connection");
const URL=require("./models/url");

connectionToMongoDB("mongodb://127.0.0.1:27017/shortId").then(()=>{
    console.log("mongoDB connected");
})


const StaticRouter=require("./routes/staticRouter");
const urlRoute=require("./routes/url-router");
const userRoute=require("./routes/user");
const cookieParser=require("cookie-parser");


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkforAuthentication);

app.use("/url", restrictTo(["NORMAL"]),urlRoute);
app.use("/user",userRoute);
app.use("/",StaticRouter);




app.get("/urls/test",async(req,res)=>{
const allurls=await URL.find({});
return res.render("home",{
  urls:allurls,
});
});

app.get("/urls/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
     
      
    );
   

    res.redirect(entry.redirectUrl);
  });
  



app.listen(PORT,()=>{
console.log(`server is on port ${PORT} `);
})