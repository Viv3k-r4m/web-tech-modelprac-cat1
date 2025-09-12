const {MongoClient,ObjectId}=require('mongodb');
const cors=require('cors');
const express=require('express');
const bcrypt=require('bcryptjs');

const app=express();
app.use(cors());
app.use(express.json());

const uri="mongodb://localhost:27017";
const client=new MongoClient(uri);
let db;

async function connectMongo(){
    try{
        await client.connect();
        db=client.db("users");
        console.log("DB connected");
    }
    catch(err){
        console.log(err);
    }
}

connectMongo();

app.post('/api/sub',async (req,res)=>{
    try{
        let record=req.body;
        const {name,email,password,dob}=record;
        const pass=await bcrypt.hash(password,10);
        record={name,email,pass,dob};
        const result=await db.collection("register").insertOne(record);
        res.json({message:"User added"});
    }
    catch(err){
        res.status(500).json({error:"MongoDB insert failed"});
    }
});

app.get('/api/sub',async (req,res)=>{
    try{
        const rec=await db.collection("register").find().toArray();
        res.json(rec);
    }
    catch(err){
        console.log(err);
    }
});

// app.get('/api/sub/:id',async (req,res)=>{
//     try{
//         const id=req.params.id;
//         const rec=await db.collection("register").findOne({_id:new ObjectId(id)});
//         if(!rec) res.json({error:"User not found"});
//         res.json(rec);
//     }
//     catch(err){
//         console.log(err);
//     }
// });

app.delete('/api/sub/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const rec=await db.collection("register").deleteOne({_id:new ObjectId(id)});
        if(rec.deletedCount==0){
            res.json({error:"Record not found"});
        }
        res.json({success:"Deleted record"});
    }catch(err){
        console.log(err);
    }
});

app.put('/api/sub/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        let updates=req.body;
        const {password,name,email,dob}=updates;
        const pass=await bcrypt.hash(password,10);
        updates={name,email,dob,pass};
        const rec=await db.collection("register").updateOne({_id:new ObjectId(id)},{$set:updates});
        if(rec.matchedCount==0){
            res.json({error:"Record not found"});
        }
        res.json({success:"Updated record"});
    }catch(err){
        console.log(err);
    }
});

// app.get("/api/login/:mail/:pass", async (req, res) => {
//     try {
//         const { mail, pass } = req.params;
//         const rec = await db.collection("register").findOne({ email: mail });

//         if (!rec) {
//             return res.json({ error: "User not found" });
//         }

//         const match = await bcrypt.compare(pass, rec.pass);
//         if (match) {
//             res.json({ success: "Login successful", user: rec });
//         } else {
//             res.json({ error: "Incorrect password" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });incorrect but see for ref

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const rec = await db.collection("register").findOne({ email: email });

        if (!rec) {
            return res.status(401).json({ error: "User not found" });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, rec.pass);

        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // If login successful
        res.json({ success: "Login successful"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});



// app.listen(5000,()=>console.log("Server started on http://localhost:5000"));


// const express=require('express');
// const cors=require('cors');
// const mysql=require('mysql2/promise');

// const app=express();
// app.use(cors());
// app.use(express.json());
// let con;

// async function conmysql(){
//     try{
//         con=await mysql.createConnection(
//         {
//             host:"localhost",
//             user:"root",
//             password:"",
//             database:"users"
//         }
//     );
//     console.log("Connected");
//     }catch(err){
//         console.log(err);
//     }
// }

// conmysql();

// app.post('/api/sub',async (req,res)=>{
//     try{
//         const {name,email,password,dob}=req.body;
//         const [result]=await con.query("INSERT INTO user values(?,?,?,?)",[name,password,email,dob]);
//         res.json({success:"Added"});
//     }catch(err){
//         console.log(err);
//     }
    
// });

app.listen(3000,()=>console.log("Server on localhost:3000"));