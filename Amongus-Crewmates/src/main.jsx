import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import CrewProfile from './Pages/CrewProfile'
import ReadCrew from './Pages/ReadCrew'
import CreateCrew from './Pages/CreateCrew'
import EditCrew from './Pages/EditCrew'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/gallery" element={<ReadCrew />} />
        <Route path="/new" element={<CreateCrew />} />
        <Route path="/gallery/edit/:id" element={<EditCrew />} />
        <Route path="/profile/:id" element={<CrewProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)