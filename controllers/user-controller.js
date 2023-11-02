const { v4 :uuidv4 } =require("uuid");
const User=require("../models/user");
const {setUser}=require("../Utils/auth");

async function Handleusersignup(req,res){

    const {name,email,password}=req.body;

        await User.create({
        name,
        email,
        password,
    });
   return res.redirect("/");

}
async function Handleuserlogin(req,res){

    const {email,password}=req.body;

    const user=await User.findOne({email,password});
    if(!user){

        return res.render("login",{
            error:"Invalid username or password"
        });
    }
 
    const token=setUser(user);
    res.cookie("token",token);
return res.redirect("/");

}

module.exports={
    Handleusersignup,
    Handleuserlogin,
}