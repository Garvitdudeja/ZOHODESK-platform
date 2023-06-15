import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function SingleTicket() {
  const {id}= useParams()
  const [message,setMessage]  = useState('')
  const [chat, setChat] = useState([{}])
  useEffect(()=>{
    //get Conversations
    const getChat = async()=>{
      const UserChat = await axios.get(`http://localhost:4000/getChat/${id}`).then(res=>{console.log(res);setChat(res.data);}).catch(err=>{console.log(err);})
      // setChat(UserChat.data)
    return;
    }
     getChat()
  },[])
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setMessage('')
    const data = {message:message,ticketId:id}
    axios.post('http://localhost:4000/addReply', {data:data})
  }
  return (<>
  <h4>Recent Chats</h4>
  {chat.map((ele)=>{
    return(<>
   <h3>{ele.summary}</h3> 
    </>)
  })}
  <form onSubmit={handleSubmit}>
      <textarea placeholder='Enter the Message That you want to Add' onChange={(e)=>{setMessage(e.target.value)}} value={message} rows="3" className='w-60 border-gray-400 border-2'></textarea>
      <br/><button type='submit' className='bg-slate-900 text-white px-4 py-2'>Add The message</button>
    </form></>
  )
}

export default SingleTicket