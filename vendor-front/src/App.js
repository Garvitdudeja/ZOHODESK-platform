import { useContext, useState } from 'react';
import HomePage from './Layout/HomePageLayout';
import Dashboard from './Pages/Dashboard';
import {Route,Routes} from 'react-router-dom'
import './index.css'
import SignUp from './Pages/SignUp';
import ZohoDesk from './Pages/ZohoDesk';
import SingleTicket from './Pages/SingleTicket';

function App() {
  // const SidebarContext = useContext();
  // const [sideBar, setSideBar] = useState(false);
  return (
    <Routes>
      <Route path='/' element={<HomePage Component={Dashboard}/>}/>
      <Route path="/signIn" element={<SignUp></SignUp>}/>
      <Route path="/zoho" element={<ZohoDesk></ZohoDesk>}/>
      <Route path='/ticket/:id' element={<SingleTicket></SingleTicket>}/>

    </Routes>
  );
}

export default App;
