const express=require("express");
const { connection } = require("./db");
const { authRouter } = require("./routes/auth.routes");
const app=express();
app.use(express.json());
require("dotenv").config()
const cors=require("cors")
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Homepage");
})

app.use("/user",authRouter)

app.listen(process.env.PORT||8080,async()=>{
    try{
        await connection;
        console.log("connected to DB")
    }
    catch(err){
        console.log(err)
        console.log("cannot connected to DB");
    }
    console.log("server is running at port 8080")
})

