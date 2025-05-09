const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors");
const jwt=require("jsonwebtoken")
const jwt_secret="messi"
const{ user_modal,todo_modal}=require("./db.js")
const app=express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://adityavn03:adityavn@cluster0.6sdfg.mongodb.net/todo-app")
app.post("/signup",async (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    console.log(email)
    console.log(password)
    const checkuser=await user_modal.findOne({email:email,password:password})
    if(checkuser){
        res.json({
            message:"your email has been logned in so use the another email"
        })
    }
    else{

        await user_modal.create({
            email:email,
            password:password,
        })
    }


})

app.post("/signin",async (req,res)=>{
    const {email,password}=req.body
    const checkuser=await user_modal.findOne({email:email,password:password})
    if(checkuser){
        const token=jwt.sign({id:checkuser._id.toString(),email},jwt_secret)
        res.json({
            token
        })
    }
    else{
        res.json({
            message:"tokken does not generated"
        })
    }
})
async function auth(req,res,next){
    const token =req.headers.token;
    const verifytoken=jwt.verify(token,jwt_secret);
    if(verifytoken){
        req.id=verifytoken.id
        next();
    }

    }
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.get("/user", auth ,async (req,res)=>{
    const details=await user_modal.findById(req.id);
    console.log(details)

    res.json({
        email:details.email,
        password:details.password
        
    })

})

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})
