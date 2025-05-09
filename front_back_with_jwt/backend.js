const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {z}=require("zod");
const app=express();
const jwt_secret="messi"
app.use(express.json());
const user=[]

app.post("/signup",async (req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    const verification=z.object({
        username:z.string().min(5).max(100).email(),
        password:z.string()
    })
    const {success,error}=verification.safeParse({username,password})
    if(!success){
        console.log(error)
        res.json({
            message:"does not require the above condition",
            error
        })
        return
    }
    const hashedpassword=await bcrypt.hash(password,5);
    let exist_user=user.find((u)=>{
        return u.username==username
    })
    if(exist_user){
        res.json({
            Message:"existing username"
        })
    }
    else{
        user.push({
            username,
            password:hashedpassword
        })
        console.log(user)
        res.json({
            Message:"account created successfully"
        })
    }

})
app.post("/signin",async (req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let exist_user=user.find((u)=>{
        return username==u.username
    })
    console.log(exist_user)
    const verifypassword=await bcrypt.compare(password,exist_user.password)
    if(verifypassword){
        let token=jwt.sign({username},jwt_secret);
        console.log(token)
        res.json({
            token:token,
            message:"token has crested successfully"
    })
    }
})
   
function auth(req,res,next){
    let token=req.headers.token;
    let verifytoken=jwt.verify(token,jwt_secret);
    if(verifytoken){
        
        req.username=verifytoken.username;
        next()
    }
    else{
        res.json({
            message:"token are miss matched "
        })
    }

}
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})
 app.get("/me",auth,(req,res)=>{
    let q=user.find((u)=>{
        return u.username==req.username
    })
    if(q){
        res.json({
            username:q.username,
            password:q.password
        })
    }
    else{
        res.json({
            message:"user detail mismatch"
        })
    }
 })

app.listen(3001)