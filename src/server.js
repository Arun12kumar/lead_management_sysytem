import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import { sequelize } from './config/db.js';
//const logger from ''

const PORT = process.env.PORT || 4000;
const app = express();

//Midileware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(morgan('combined',{
//     stream:{write: (msg) => lo}
// }))

app.get('/health',(req,res)=>{
    res.send("working good✅")
})

const startServer = async () =>{
    try {
        await sequelize.authenticate();

        app.listen(PORT,()=>{
            console.log(`server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        process.exit(1)
    }
}

startServer();