import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './routes/Layout'
import DetailView from './routes/DetailView.jsx'
import NotFound from './routes/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route index element={<App />} /> {/*This has a closing tag, look closly */}
        <Route path="/weatherDetails/:symbol" element={<DetailView />} />
      </Route>
      <Route path="*" element={ <NotFound />} />
        {/* This is the NotFound component, it will be rendered if no other route matches */}
    </Routes>
  </BrowserRouter>
)