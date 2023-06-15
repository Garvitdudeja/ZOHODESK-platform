import { Router } from "express";
import axios from 'axios';
import fs from 'fs'
 const zoho = Router();
// access = JSON.parse(access)
// var TimeNow = new Date().getTime()
// console.log(TimeNow>access[0].expiresAt.getTime())

//Get Access Token
// zoho.get('/accessToken',async(req,res)=>{
//     try{
//         if (Date.now()>access[0].token){
//         const zohoAcessToken = await axios.post('https://accounts.zoho.com/oauth/v2/token',
//          {},{params:
//             {refresh_token: "1000.137e189185691932b0b564a8c537b63c.a96846d3814a3aa9a9e22c2f74ad8701",
//                 client_id: "1000.G73LKHN42126L4O4L6AGP0Y57B48UA",
//                 client_secret:"b24d8b4b3a7fe61ca795fa59d29c28af2c3d578223",
//                 grant_type:"refresh_token"
//             }});
//         const fileres = fs.writeFileSync('accessToken.json',JSON.stringify([{token: zohoAcessToken.data.access_token,expiresAt:new Date()}]))
//         console.log("new Token Created")

//             return res.json(zohoAcessToken.data.access_token );
//         }
//         else{
//             console.log("old Token Used")
//             return access[0].token;
//         }
//     }catch(err){
//         return res.json({err:err.message})
//     }
// })



const getAccessToken = async(req,res)=>{
    try{
        // const storedTime = new Date(access.expiresAt).getTime()
        // const nowTime = new Date().getTime()
        // console.log(nowTime,storedTime)

        const readFile = fs.readFileSync('AcessToken.txt','utf-8')
        const storedTime = new Date(JSON.parse(readFile).expiresAt)
        console.log(storedTime,"storedTime")

        
        if (new Date().getTime()>storedTime.getTime()){
        var d = new Date();
        d.setMinutes(d.getMinutes()+59)
        console.log("date+30",d)
        const zohoAcessToken = await axios.post('https://accounts.zoho.com/oauth/v2/token',
         {},{params:
            {refresh_token: "1000.7709afe7086e0ea02d312e10957c42fc.85edafa96efcdfff5ccc9d3b0e0a5761",
                client_id: "1000.G73LKHN42126L4O4L6AGP0Y57B48UA",
                client_secret:"b24d8b4b3a7fe61ca795fa59d29c28af2c3d578223",
                grant_type:"refresh_token"
            }});
            // const fileres = fs.writeFileSync('accessToken.json',JSON.stringify({token: zohoAcessToken.data.access_token,expiresAt:d}))
            console.log(fs.writeFileSync("AcessToken.txt",JSON.stringify({token: zohoAcessToken.data.access_token,expiresAt:d})));

            console.log("new Token Created")
            return zohoAcessToken.data.access_token;
        }
        else{
            console.log("old Token Used")
            return JSON.parse(readFile).token;
        }
    }catch(err){
        console.log(err.message)
        return err.message
    }
}


// Get all Tickets
zoho.get('/getAllTickets',async (req,res)=>{
    try{
        const accessToken = await getAccessToken();
        const tickets = await axios.get('https://desk.zoho.com/api/v1/tickets',
            {headers:
                {Authorization: "Zoho-oauthtoken "+accessToken,
                orgId:"776972989"}}
        )
    res.json(tickets.data)
    }
    catch(err){
        res.status(401).json({err:err.message})
    }
})


zoho.post('/addReply',async(req,res)=>{
    try{
        const data = req.body.data;
        const accessToken = await getAccessToken();
        const tickets = await axios.post(`https://desk.zoho.com/api/v1/tickets/${data.ticketId}/sendReply`,
        {
            "ticketStatus" : "Open",
            "channel" : "EMAIL",
            "to" : "bradycoyne97@gmail.com",
            "fromEmailAddress" : "support@heliostechlabs.zohodesk.com",
            "contentType" : "plainText",
            "content" : data.message,
            "isForward" : "true"
          },
            {headers:
                {Authorization: "Zoho-oauthtoken "+accessToken,
                orgId:"776972989"}}
        )
    res.json(tickets.data)
    

    }catch(err){
        res.status(401).json({err:err.message})
    }
})

zoho.get('/getChat/:id',async(req,res)=>{
    try{
        const accessToken = await getAccessToken();
        const id = req.params.id
        const chat = await axios.get(`https://desk.zoho.com/api/v1/tickets/${id}/conversations`,
            {headers:
                {Authorization: "Zoho-oauthtoken "+accessToken,
                orgId:"776972989"}}
        )
    return res.json(chat.data.data)
    

    }catch(err){
        return res.status(401).json({err:err.message})
    }
})



export default zoho;