import React from 'react'
import CustomTabs from "../components/Tabs";
import {AppBar} from "../components/AppBar"

const Home= () => {
  return (
    <div>
         <AppBar></AppBar>
        <div className='mx-3'>
        <CustomTabs></CustomTabs>
        </div>

    </div>
  )
}

export default Home;
