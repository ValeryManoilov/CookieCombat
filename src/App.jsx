import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LeadPage from './components/LeadPage';
import React from 'react'

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
