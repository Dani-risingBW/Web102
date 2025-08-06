import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import ForumPage from './pages/ForumPage.jsx'
import PostForm from './components/PostForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<App />} />
        <Route path="/forum/:category" element={<ForumPage />} />
        <Route path="/forum/:category/create" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


