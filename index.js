const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require('dotenv').config()
const mongoURL=process.env.mongoURL

const app = express();
const port = 3001;


const connection = mongoose.connect(mongoURL);

const studentSchema = mongoose.Schema({
  username: String,
  clas: String,
  marks: Number,
});

const User = mongoose.model("Student", studentSchema);

app.use(express.json())
app.use(cors())

app.get("/students", async(req, res) => {
  try{
    const data=User.find()
    res.send(data)
  }catch(err){
    res.status(500).json({Error:"Internal Server Problem"})
  }
});


app.post("/students", async(req, res) => {
  const { username, clas, marks } = req.body;
  try{
    const student = new User({ username,clas, marks });
    await student.save()
    res.status(201).json({Message:"Student data added"})
  }catch(err){
    res.status(500).json({Error:"Internal Server Problem"})
  }
  
});



app.listen(port, async() => {
    try{
        await connection
        console.log("DB is connected")
    }catch(err){
        console.log(err)
    }
    
  console.log(`Server is running on port ${port}`);
});
