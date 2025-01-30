const mongo = require("mongoose");
require("dotenv").config();

mongo.connect(process.env.MONGO_URL)
    .then(()=>console.log("successfully conncted to DB"))
    .catch((err)=>console.log("some error occured with connection : ",err))

const userSchema = new mongo.Schema({
    FirstName: {type: String , required:true , trim: true , maxLength: 50},
    LastName: {type: String , required:true , trim: true , maxLength: 50},
    password: {type: String , required:true , trim: true , minLength: 6 },
})

const Users = mongo.model("users",userSchema);

model.exports = Users;