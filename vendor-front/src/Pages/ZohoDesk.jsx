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
          console.log(response.data.data);
          setData(response.data.data);
        }
        catch(err){
          console.log(err)
        }

    }

    useEffect(()=>{
      getData()
    },[])
  return (<>
<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">First</th>
              <th scope="col" className="px-6 py-4">Last</th>
              <th scope="col" className="px-6 py-4">Handle</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e)=>{  
              return(<>
              <tr onClick={()=>{goRouteId(e)}} className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600" >
              <td className="whitespace-nowrap px-6 py-4 font-medium">{e.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{e.priority}</td>
              <td className="whitespace-nowrap px-6 py-4">{e.lastThread!=null? e.lastThread.channel:""}</td>
              <td className="whitespace-nowrap px-6 py-4">@fat</td>
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