import React from 'react'
import Sidebar from '../Components/Sidebar'



function HomePage(props) {
  const Component = props.Component 
  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar></Sidebar>
      <Component></Component>
    </div>
  )
}

export default HomePage