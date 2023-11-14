import { Router } from "express";
import axios from 'axios';
import fs from 'fs'
 const zoho = Router();




//Function to generate Access Token
const getAccessToken = async(req,res)=>{
    try{
        const readFile = fs.readFileSync('AcessToken.txt','utf-8')
        var fileData = JSON.parse(readFile)
        const storedTime = new Date(JSON.parse(readFile).expiresAt)
        if (
          new Date().getTime() > storedTime.getTime() ||
          fileData.token === "" ||
          fileData.token === undefined ||
          fileData.expiresAt === "" ||
          fileData.expiresAt === undefined
      ) {
        // helios Crm


          // var d = new Date();
        // d.setMinutes(d.getMinutes()+59)
        // console.log("date+30",d)
        // const zohoAcessToken = await axios.post('https://accounts.zoho.com/oauth/v2/token',
        //  {},{params:
        //     {refresh_token: "1000.389484d723f7581f1501fec619cfe8a7.d78b235988bdc904e5fe4f1a6e01197f",
        //         client_id: "1000.G73LKHN42126L4O4L6AGP0Y57B48UA",
        //         client_secret:"b24d8b4b3a7fe61ca795fa59d29c28af2c3d578223",
        //         grant_type:"refresh_token"
        //     }});
        //     fs.writeFileSync("AcessToken.txt",JSON.stringify({token: zohoAcessToken.data.access_token,expiresAt:d}));


        // Kavitha CRM

        var d = new Date();
        d.setMinutes(d.getMinutes()+59)
        console.log("date+30",d)
        const zohoAcessToken = await axios.post('https://accounts.zoho.in/oauth/v2/token',
         {},{params:
            {refresh_token: "1000.9d3860742b58e1ff8796b885c9a6e432.df118f4fc9a72dba69d3ae5fd5cea123",
                client_id: "1000.AOB6K1YFH3ZOWCY214IRBCWR1DU50Z",
                client_secret:"c055b14724902a1352bac6733c78d23307e12886a5",
                grant_type:"refresh_token"
            }});
            console.log(zohoAcessToken)
            fs.writeFileSync("AcessToken.txt",JSON.stringify({token: zohoAcessToken.data.access_token,expiresAt:d}));
            console.log("new token",zohoAcessToken.data)
            return zohoAcessToken.data.access_token;
        }
        else{
          console.log("file read",JSON.parse(readFile))
            return JSON.parse(readFile).token;
        }
    }catch(err){
      console.log(err)
        return err.message
    }
}


// Get all Tickets
zoho.get('/getAllTickets',async (req,res)=>{
    try{
        const accessToken = await getAccessToken();
        console.log(accessToken)
        const tickets = await axios.get('https://desk.zoho.in/api/v1/tickets',
            {headers:
                {Authorization: "Zoho-oauthtoken "+accessToken,
                orgId:"60021964847"}}
        )
    res.json(tickets.data)
    }
    catch(err){
        res.status(401).json({err:err.message})
    }
})

//Add A reply To Ticket
zoho.post('/addReply',async(req,res)=>{
    try{
        // const data = req.body.data;
        // console.log(data.ticketId,data.message)
        // const accessToken = await getAccessToken();
        // const tickets = await axios.post(`https://desk.zoho.in/api/v1/tickets/${data.ticketId}/sendReply`,
        // {
        //     // "ticketStatus" : "Open",
        //     // "channel" : "EMAIL",
        //     // "to" : "bradycoyne97@gmail.com",
        //     // "fromEmailAddress" : "support@dvsportal.zohodesk.in",
        //     // "contentType" : "plainText",
        //     // "content" : data.message+'(   )' ,
        //     // "isForward" : "true"
            
        //       "channel" : "chat",
        //       "content" : "Thank you for your valueable comment."
            
        //   },
        //     {headers:
        //         {Authorization: "Zoho-oauthtoken "+accessToken,
        //         orgId:"60021964847"}}
        // )
        // res.json({data:tickets?.data,success:true})

        let accessToken = await getAccessToken();
        const extTicketId = 2;
        const extContactId = 4;
        const now = new Date().toISOString(); // Assuming you want the current timestamp

        const url = "https://desk.zoho.in/api/v1/channels/115035000000245003/import?orgId=60021964847";

        const postBody = {
          "data": {
            "threads": [
              {
                "extParentId": "ticketExtId" + extTicketId,
                "extId": "threadExtId" + (extTicketId + 232),
                "actor": {
                  "extId": "contactExtId" + extContactId,
                  "name": "E1",
                  "email": "e1@crmnordic.dk"
                },
                "direction": "in",
                "content": extContactId+"another reply"
              }
            ]
          }
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: "Zoho-oauthtoken "+accessToken,
          orgId:"60021964847"
        };

        axios.post(url, postBody, { headers })
          .then(function (response) {
            // Handle the response here
            console.log(response.data);
          })
          .catch(function (error) {
            // Handle any errors here
            console.error(error);
          });
            res.json({"message":"succcess"})
            

            }catch(err){
              console.log(err.message)
                res.status(401).json({err:err.message,success:false})
            }
        })



//Get A conversation of a Chat
zoho.get('/getChat/:id',async(req,res)=>{
    try{
        const accessToken = await getAccessToken();
        const id = req.params.id
        const chat = await axios.get(`https://desk.zoho.in/api/v1/tickets/${id}/conversations`,
            {headers:
                {Authorization: "Zoho-oauthtoken "+accessToken,
                orgId:"60021964847"}}
        )
    return res.json(chat.data.data)
    

    }catch(err){
        return res.status(401).json({err:err.message})
    }
})





// Get All Contacts 

zoho.get("/allcontacts", async (req, res) => {
  
    let usedToken = await getAccessToken();

    await axios
      .get(
        "https://desk.zoho.in/api/v1/contacts",
        {
          headers: {
            Authorization: "Zoho-oauthtoken " + usedToken,
            orgId: "60021964847",
          },
        }
        // { headers: { Authorization: "Bearer " + zohoAccess.data.access_token } }
      )
      .then((resp) => {
        console.log(resp.data);
        res.status(200).json({
          data: resp.data
        });
        return;
      })
      .catch((err) => {
        res.status(500).json(err);
        return;
      });

    
})



//Add a new Ticket
zoho.post("/addTicket", async (req, res) => {
  try {
    /**
     * ?this is where i tested the io operation 👇🏾
     */
    // fs.writeFileSync(
    //   "./Access.txt",
    //   JSON.stringify({
    //     token:
    //       "1000.6640382702bb4796bc243040c681fb13.bf239985b1fe9c3d282f5985abc5b2b6",
    //     expiresAt: "hi hello",
    //   })
    // );
    // const readFile = fs.readFileSync("./Access.txt", "utf-8");
    // console.log(JSON.parse(readFile).token);
    /**
     * ?this is where i tested the io operation ☝🏾
     */

    let usedToken = await getAccessToken();
    
    const data = req.body;
    /**👇🏾 this is where the ticket is created**/

    await axios
      .post(
        "https://desk.zoho.in/api/v1/tickets",
        data,
        {
          headers: {
            Authorization: "Zoho-oauthtoken " + usedToken,
            orgId: "60021964847",
          },
        }
        // { headers: { Authorization: "Bearer " + zohoAccess.data.access_token } }
      )
      .then((res) => {
      })
      .catch((err) => {
        res.status(500).json(err);
      });

    res.status(200).json({ token: usedToken });
  } catch (error) {
    res.json({ error: error.message });
  }
});


export default zoho;