import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import { swaggerJsdoc } from './config/swagger.js';
import { sequelize } from './config/db.js';
import { logger } from './utils/logger.js';

//Routes
import authRouter from './routes/authRoute.js';
import leadRouter from './routes/leadRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

//Midileware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined',{
    stream:{write: (msg) => logger.info(msg.trim())}
}));

//api documentation
app.use('/api/docs',swagger.serve, swagger.setup(swaggerJsdoc,{
    customSiteTitle:'Lead API Documentaion'
}))

app.get('/health',(req,res)=>{
    res.send("working good✅")
})

//app routes
app.use('/api/auth',authRouter)
app.use('/api/leads',leadRouter)



const startServer = async () =>{
    try {
        await sequelize.authenticate();
        logger.info(' PostgreSQL connected successfully');

        app.listen(PORT,()=>{
            logger.info(` Server running on http://localhost:${PORT}`);
            logger.info(` Swagger Docs: http://localhost:${PORT}/api/docs`);
        })
    } catch (error) {
        logger.error('Server startup error:', error);
        process.exit(1)
    }
}

startServer();