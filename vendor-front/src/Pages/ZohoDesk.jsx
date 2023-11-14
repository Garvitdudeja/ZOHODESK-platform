import React, { useState, useEffect } from 'react'
import {Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

function ZohoDesk() {

  const navigate = useNavigate();
  const goRouteId = (e) => {
   navigate(`/ticket/${e.id}`);
  }


  const [data,setData]= useState([])
  const [form, setFrom] = useState({})
  const [value, setvalue] = useState("");

    const  getData = async()=>{
        try{
          const response = await axios.get('http://localhost:4000/getAllTickets');
          setData(response.data.data);
        }
        catch(err){
        }

    }

    useEffect(()=>{
      getData()
    },[])
  return (<>
  <Link to='/zoho/addTicket'> 
  <div className='text-center'>
            <button 
              className="text-center relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group my-16 mx-auto"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                Add a new Ticket
              </span>
            </button></div></Link>
<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">priority</th>
              <th scope="col" className="px-6 py-4">Channel</th>
              <th scope="col" className="px-6 py-4">Ticket Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e)=>{  
              return(<>
              <tr onClick={()=>{goRouteId(e)}} className="border-b bg-white " >
              <td className="whitespace-nowrap px-6 py-4 font-medium">{e.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{e.priority}</td>
              <td className="whitespace-nowrap px-6 py-4">{e.lastThread!=null? e.lastThread.channel:""}</td>
              <td className="whitespace-nowrap px-6 py-4">{e.ticketNumber}</td>
              {/* <td>
                <form onSubmit={handleSubmit}>sdfsd
                  <input className='border-2' label="ewqewq" id={e.id} value={value} onChange={(e)=>{setvalue(e.target.value);console.log()}}>
                </input>
                <button type='submit' id={e.id}>Add Message</button>
              </form>
              </td> */}
            </tr>
            
            </>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default ZohoDesk