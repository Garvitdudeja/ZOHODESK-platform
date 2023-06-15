import React, { useState } from 'react'
import logo from '../assets/Logo.svg'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import {IoIosArrowDown, IoIosArrowUp,IoMdClose} from 'react-icons/io'
import {GiMoneyStack} from 'react-icons/gi'
import {MdTrackChanges,MdPeople} from 'react-icons/md'
import {BsNewspaper,BsListNested} from 'react-icons/bs'
import {FaMailBulk} from 'react-icons/fa'
import {RiAdminFill} from 'react-icons/ri'
function Sidebar() {
  const [RFQ,setRFQ] = useState(false);
  const [Vendor,setVendor] =useState(false);
  const [side, setSide] = useState(true)
  return (<>
    <button className={`lg:hidden w-12 text-right p-4 ${!side? "hidden lg:block":""}`} onClick={()=>{setSide(e=>!e)}} ><BsListNested className='w-full h-full'/></button>
    <div className={`w-full lg:w-[19.4%] bg-[#1C2434] text-[#DEE4EE] min-h-[100vh] ${side? "hidden lg:block":""}`}>
      <div><button className='lg:hidden absolute right-8 top-7 w-8' onClick={()=>{setSide(e=>!e)}}><IoMdClose className='w-full h-full'/></button></div>
      <div className='mx-auto  '>
        <div className='flex flex-col gap-10 '>
          {/* logo */}
            <div className='flex flex-row  text-white gap-2 mx-auto mt-16'>
                <div className=''>
                <img src={logo} alt="" className='h-[32px]' />
                </div>
                <div className='font-weight-500 text-3xl/[20px] pt-1'>
                    SA ADMIN
                </div>
            </div>
            <div className='flex flex-col gap-8 mx-auto mt-4'>
            {/* Dasboard */}
            <div className='flex flex-row  text-white gap-2   '>
            <HiOutlineDesktopComputer className='mt-1'/>
            <h6>Dashboard</h6>
            </div>
            {/* RFQ Master */}
            <div className=''>
            <div className='flex flex-row text-white ' onClick={()=>{setRFQ(e=>!e);}}>
            
            <div className='flex flex-row justify-between w-48'>
            <div className='flex flex-row gap-2'><BsNewspaper className='mt-1'/>
            <h6>RFQ Master</h6></div>
            {RFQ ? <IoIosArrowUp className='mt-1 ml-8'/>: <IoIosArrowDown className='mt-1 ml-8'/>}
            </div>
            </div>
            <div className={`ml-6 flex flex-col gap-2 mt-4 ${RFQ ? '': 'hidden'}`}><h6>Create RFQ</h6>
            <h6>Search RFQ</h6></div>
            </div>
            {/* Vendor Master */}
            <div className=''>
            <div className='flex flex-row text-white ' onClick={()=>{setVendor(e=>!e);}}>
            
            <div className='flex flex-row justify-between w-48'>
            <div className='flex flex-row gap-2'><BsNewspaper className='mt-1'/>
            <h6>Vendor Master</h6></div>
            {Vendor ? <IoIosArrowUp className='mt-1 ml-8'/>: <IoIosArrowDown className='mt-1 ml-8'/>}
            </div>
            </div>
            <div className={`ml-6 flex flex-col gap-2 mt-4 ${Vendor ? '': 'hidden'}`}><h6>Create Vendor</h6>
            <h6>Search Vendor</h6></div>
            </div>
            {/* Tracking */}
            <div className='flex flex-row  text-white gap-2   '>
            <MdTrackChanges className='mt-1'/>
            <h6>Tracking</h6>
            </div>
            {/* Bids */}
            <div className='flex flex-row  text-white gap-2   '>
            <GiMoneyStack className='mt-1'/>
            <h6>Bids</h6>
            </div>
            {/* Communication */}
            <div className='flex flex-row  text-white gap-2   '>
            <FaMailBulk className='mt-1'/>
            <h6>Communication</h6>
            </div>
            {/* Attachment */}
            <div className='flex flex-row  text-white gap-2   '>
            <HiOutlineDesktopComputer className='mt-1'/>
            <h6>Attachment</h6>
            </div>
            {/* Admin */}
            <div className='flex flex-row  text-white gap-2   '>
            <RiAdminFill className='mt-1'/>
            <h6>Admin</h6>
            </div>
            </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default Sidebar