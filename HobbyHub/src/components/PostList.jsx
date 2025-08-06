import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import './Navbar.css'

function PostList() {
  const { category } = useParams(); // This is the category name from URL
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      
      // Step 1: Get the category ID from the first database
      const { data: categoryData, error: categoryError } = await supabase
        .from('Hobby-forum') // First database
        .select('id')
        .eq('category', category) // Match category name
        .single() // Get only one result

      if (categoryError) {
        console.error('Error fetching category:', categoryError)
        setLoading(false)
        return
      }

      const categoryId = categoryData.id

      // Step 2: Use the category ID to fetch posts from second database
      const { data: postsData, error: postsError } = await supabase
        .from('Hobby-subforum') // Second database
        .select('*')
        .eq('subforum_id', categoryId) // Use the ID from first database
        .order('created_at', { ascending: false })

      if (postsError) {
        console.error('Error fetching posts:', postsError)
      } else {
        console.log('Posts fetched successfully:', postsData)
        setPosts(postsData)
      }
      
      setLoading(false)
    }

    fetchPosts()
  }, [category])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Posts in {category}</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="post-item">
            <h3>{post.comment}</h3>
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt={post.comment || "Post image"} 
                style={{ maxWidth: "300px", height: "auto" }}
                onError={(e) => {
                  e.target.style.display = 'none'; // Hide broken images
                }}
              />
            )}
          </div>
        ))
      ) : (
        <p>No posts available in this category.</p>
      )}
    </div>
  )
}

export default PostList
