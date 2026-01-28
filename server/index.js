// // Import the libraries - express - mongoose - cors
// const express=require("express");
// const mongoose=require("mongoose");
// const cors=require("cors");

// // Creare Express Server
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// // mongodb://localhost:27017/ = this we got from cmd prompt - give mongosh in cmd and get 27017
// mongoose.connect("mongodb://localhost:27017/testdb")
// .then(()=>console.log("MongoDB Connected."))
// .catch(err=>console.error(err))

// // Create a Model
// const Person = mongoose.model("Person", {name:String,age:Number},"person");

// //Read all the peoples
// app.get("/",async(req,res)=>{
//     const people = await Person.find();
//     res.json(people);
// });

// // Add new people
// app.post("/",async(req,res)=>{
//     const newPerson = await Person.create(req.body);
//     res.json(newPerson);
// })

// // Update poeple
// app.put("/:id",async(req,res)=>{
//     const updated=await Person.findByIdAndUpdate(req.params.id,req.body,{new:true});
//         res.json(updated);
//     });

// // Connection
// app.listen(5000,()=>{
//     console.log("Server is running on http://localhost:5000");
// });


//Import the thr libraries - express - mongoose - cors
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB connected."))
.catch(err => console.error(err))

//create a Model
const person = mongoose.model("Person",{name: String, age: Number},"person");

//Read all the people
app.get("/",async(req,res) =>{
    const people=await person.find();
    res.json(people);
});


//Add new people
app.post("/",async(req,res)=>{
    const newPerson = await person.create(req.body);
    res.json(newPerson);
})

//Update People
app.use("/:id",async(req,res)=>{
    const update = await person.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.json(update);
});

// Delete people
app.delete("/:id",async(req,res)=>{
    await Person.findByIdAndDelete(req.params.id);
    res.json({message:"Person Deleted"});
});

//Connection
app.listen(4000,() =>{
    console.log("server is running on http://localhost:4000")
})