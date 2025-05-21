const mongoose=require("mongoose")
const sechema=mongoose.Schema
const objectid=mongoose.ObjectId;
const userschema=new sechema({
    email:String,
    password:String,
    
})
const todoschema=new sechema({
    description:String,
    complete:Boolean,
    userid:objectid
})

const user_modal=mongoose.model("user",userschema)
const todo_modal=mongoose.model("todo",todoschema)

module.exports={
    user_modal,
    todo_modal
}