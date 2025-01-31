const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");
require("dotenv").config();

mongo.connect(process.env.MONGO_URL)
    .then(()=>console.log("successfully conncted to DB"))
    .catch((err)=>console.log("some error occured with connection : ",err))

const userSchema = new mongo.Schema({
    UserName : {type: String , required:true , trim: true , maxLength: 50},
    FirstName: {type: String , required:true , trim: true , maxLength: 50},
    LastName: {type: String , required:true , trim: true , maxLength: 50},
    password: {type: String , required:true , trim: true , minLength: 6 },
})

const accountSchema = new mongo.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId,ref: "Users"},
    Balance: {type: Number , default: 0 , required: true}
})

const Users = mongo.model("Users",userSchema);
const Accounts = mongo.model("Accounts",accountSchema)

module.exports = {
    Users,
    Accounts
};