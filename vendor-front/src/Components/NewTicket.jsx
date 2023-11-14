import React from 'react'
import axios from "axios"
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const NewTicket = () => {

  const navigate = useNavigate();
  const [Contacts, setContacts] = useState([]);
  const [Reload, setReload] = useState(true);

  useEffect( () => {
    
        axios.get("http://localhost:4000/allcontacts").then((res) => {         
          setContacts(res.data.data.data); 
          setReload(false);
          
        }).catch((err) => {
          alert("Somthing went wrong")
        });
    
   
  }, [])



 
      // const setUserCookie = (data) => {
      //   Cookies.set("userDetailsCookie", "data");
      //   console.log(Cookies.get("userDetailsCookie"));
      //   navigate("/invoice");
      // };
   
  
  
  const formsubmit = (e) => {
     e.preventDefault();
      let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    let finalData = {
      ...formData,
      departmentId: "722569000000006907"
    };

    const id = toast.loading("Please wait...");


    axios
      .post("http://localhost:4000/addTicket", finalData)
      .then((res) => {
        toast.update(id, {
          render: "ticket added 🫱🏾‍🫲🏿",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 5000,
        });
      })
      .catch((res) => {
        toast.update(id, {
          render: "Something went wrong!!!!",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          autoClose: 5000,
        });
      });
  };
  

    if (Reload) {
      return <div>Loading....</div>;
    }

  return (
    <>
      <div className=" mt-16">
        <h1 className="text-3xl" style={{ textAlign: "center" }}>
          add Ticket
        </h1>
        <div className="container w-4/5 mt-5 mx-auto px-16 py-10">
          <form
            onSubmit={(e) => {
              formsubmit(e);
            }}
          >
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                {/* <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                /> */}
                <label
                  htmlFor="ContactName"
                  className="text-lg peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <select
                  id="ContactName"
                  name="contactId"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  {Contacts.map((contact) => {
                    return (
                      <option value={contact.id} key={contact.id}>
                        {contact.firstName} {contact.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* {Contacts.map((contact) => {
                return (<div>{contact.email}</div>)
              })} */}
              <div className="relative z-0 w-full mb-6 group">
                {/* <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                /> */}
                <label
                  htmlFor="Status"
                  className="text-lg peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="Status"
                  name="status"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="subject"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Subject (max char : 255){" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="description"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
              {/* <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_company"
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_company"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  department <span className="text-red-500">*</span>
                </label>
              </div> */}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email <span className="text-red-500">*</span>
              </label>
            </div>

            <button
              type="submit"
              className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
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
                Submit
              </span>
            </button>
          </form>
        </div>
      </div>
    </>

    // <>
    //   <div className=" mt-16">
    //     <h1 className="text-3xl" style={{ textAlign: "center" }}>
    //       Vendor Registeration
    //     </h1>
    //     <div className="container w-4/5 mt-5 mx-auto px-16 py-10">
    //       <form>
    //         <div className="relative z-0 w-full mb-6 group">
    //           <input
    //             type="email"
    //             name="floating_email"
    //             id="floating_email"
    //             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //             placeholder=" "
    //             required
    //           />
    //           <label
    //             htmlFor="floating_email"
    //             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //           >
    //             Email address
    //           </label>
    //         </div>
    //         <div className="relative z-0 w-full mb-6 group">
    //           <input
    //             type="password"
    //             name="floating_password"
    //             id="floating_password"
    //             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //             placeholder=" "
    //             required
    //           />
    //           <label
    //             htmlFor="floating_password"
    //             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //           >
    //             Password
    //           </label>
    //         </div>
    //         <div className="relative z-0 w-full mb-6 group">
    //           <input
    //             type="password"
    //             name="repeat_password"
    //             id="floating_repeat_password"
    //             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //             placeholder=" "
    //             required
    //           />
    //           <label
    //             htmlFor="floating_repeat_password"
    //             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //           >
    //             Confirm password
    //           </label>
    //         </div>
    //         <div className="grid md:grid-cols-2 md:gap-6">
    //           <div className="relative z-0 w-full mb-6 group">
    //             <input
    //               type="text"
    //               name="floating_first_name"
    //               id="floating_first_name"
    //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //               placeholder=" "
    //               required
    //             />
    //             <label
    //               htmlFor="floating_first_name"
    //               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //             >
    //               First name
    //             </label>
    //           </div>
    //           <div className="relative z-0 w-full mb-6 group">
    //             <input
    //               type="text"
    //               name="floating_last_name"
    //               id="floating_last_name"
    //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //               placeholder=" "
    //               required
    //             />
    //             <label
    //               htmlFor="floating_last_name"
    //               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //             >
    //               Last name
    //             </label>
    //           </div>
    //         </div>
    //         <div className="grid md:grid-cols-2 md:gap-6">
    //           <div className="relative z-0 w-full mb-6 group">
    //             <input
    //               type="tel"
    //               pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    //               name="floating_phone"
    //               id="floating_phone"
    //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //               placeholder=" "
    //               required
    //             />
    //             <label
    //               htmlFor="floating_phone"
    //               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //             >
    //               Phone number (123-456-7890)
    //             </label>
    //           </div>
    //           <div className="relative z-0 w-full mb-6 group">
    //             <input
    //               type="text"
    //               name="floating_company"
    //               id="floating_company"
    //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-300 dark:focus:border-indigo-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //               placeholder=" "
    //               required
    //             />
    //             <label
    //               htmlFor="floating_company"
    //               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //             >
    //               Company (Ex. Google)
    //             </label>
    //           </div>
    //         </div>
    //         <button type="submit">
    //           <a
    //             href="#_"
    //             className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
    //           >
    //             <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
    //             <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
    //               <svg
    //                 className="w-5 h-5 text-green-400"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth="2"
    //                   d="M14 5l7 7m0 0l-7 7m7-7H3"
    //                 ></path>
    //               </svg>
    //             </span>
    //             <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
    //               <svg
    //                 className="w-5 h-5 text-green-400"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth="2"
    //                   d="M14 5l7 7m0 0l-7 7m7-7H3"
    //                 ></path>
    //               </svg>
    //             </span>
    //             <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
    //               Submit
    //             </span>
    //           </a>
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </>
  );
}

export default NewTicket