import express from "express";


const PORT = 4000;

const app = express();

app.get('/health',(req,res)=>{
    res.send("working good✅")
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})