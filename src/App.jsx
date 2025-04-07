import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LeadPage from './components/LeadPage';
import React from 'react'
import { observer } from 'mobx-react';

const App = observer(() => {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadPage/>}/>
      </Routes>
    </BrowserRouter>
  )
})

export default App
