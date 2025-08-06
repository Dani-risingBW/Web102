import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { supabase } from './client'
import { Link } from 'react-router-dom'

function App() {
  const [posts, setPosts] = useState([])
  
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('Hobby-forum')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      console.log('Posts fetched successfully:', data)
      setPosts(data)
    }
  }

  // Add useEffect to call fetchPosts when component mounts
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className='header'>
        <p>Welcome to the Gym Community</p>
      </div>
      <div className="browse">
        <h2>Browse Hobbies</h2>
        <div className="hobby-list">
          {posts.map(post => (
            <div key={post.id} className="hobby-item">
              <Link to={`/forum/${post.category}`}><h3>{post.title}</h3></Link>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
