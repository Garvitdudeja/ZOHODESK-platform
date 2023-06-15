import express from 'express';
import zoho from './routes/zoho.js'
import cors from 'cors'



const Tom = express();
Tom.use(express.json())
Tom.use(cors())


Tom.use('/',zoho)

Tom.get('/',(req,res)=>{
    res.json({temp: "worked"})
})


Tom.listen(4000,()=>{console.log("Tom running")})