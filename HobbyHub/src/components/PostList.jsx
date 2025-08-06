import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import Modal from './Modal'
import PostForm from './PostForm'
import './Navbar.css'

function PostList() {
  const { category } = useParams();
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  
  // Helper function to calculate time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);

    if (diffInSeconds < 60) {
      return 'now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };

  // Move fetchPosts OUTSIDE of useEffect
  const fetchPosts = async () => {
    setLoading(true)
    
    const { data: categoryData, error: categoryError } = await supabase
      .from('Hobby-forum')
      .select('id')
      .eq('category', category)
      .single()

    if (categoryError) {
      console.error('Error fetching category:', categoryError)
      setLoading(false)
      return
    }

    const categoryId = categoryData.id

    const { data: postsData, error: postsError } = await supabase
      .from('Hobby-subforum')
      .select('*')
      .eq('subforum_id', categoryId)
      .order('created_at', { ascending: false })

    if (postsError) {
      console.error('Error fetching posts:', postsError)
    } else {
      console.log('Posts fetched successfully:', postsData)
      setPosts(postsData)
    }
    
    setLoading(false)
  }

  // Now useEffect just calls the function
  useEffect(() => {
    fetchPosts()
  }, [category])

  if (loading) return <div>Loading...</div>


    const handleDeletePost = async (postId) => {
      const { error } = await supabase
        .from('Hobby-subforum')
        .delete()
        .eq('id', postId)

      if (error) {
        console.error('Error deleting post:', error)
      } else {
        setPosts(posts.filter(post => post.id !== postId))
      }
    }
    const handleEditPost = (post) => {
    setEditingPost(post)
    setIsEditModalOpen(true)
  }

  const handleUpdatePost = async (updatedData) => {
    const { error } = await supabase
      .from('Hobby-subforum')
      .update({
        comment: updatedData.comment,
        image_url: updatedData.image_url
      })
      .eq('id', editingPost.id)

    if (error) {
      console.error('Error updating post:', error)
    } else {
      // Update the posts list with the edited post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, comment: updatedData.comment, image_url: updatedData.image_url }
          : post
      ))
      setIsEditModalOpen(false)
      setEditingPost(null)
    }
  }

    const handleUpvote = async (postId, currentUpvotes) => {
    const newUpvotes = (currentUpvotes || 0) + 1;
    
    const { error } = await supabase
      .from('Hobby-subforum')
      .update({ upvotes: newUpvotes })
      .eq('id', postId);

    if (error) {
      console.error('Error updating upvotes:', error);
    } else {
      // Update the local state to reflect the change immediately
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, upvotes: newUpvotes }
          : post
      ));
    }
  };

  return (
    <div className="posts-container">
      <div className="header-with-button">
        <h2>Create New Post</h2>
        <button 
          className="create-post-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Post
        </button>
      </div>

      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="post-item">
            <div className="author-info">{post.username}</div>
            <h3>{post.comment}</h3>
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt={post.comment || "Post image"} 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}

            <div className="timestamp">
              <div className="upvote-section">
                <button 
                  className="upvote-btn" 
                  onClick={() => handleUpvote(post.id, post.upvotes)}
                  aria-label="Upvote post"
                >
                  ↑
                </button>
                <span className='likes'>{post.upvotes || 0}</span>
              </div>
              <span>Posted {getTimeAgo(post.created_at)}</span>
              <span className="edit-post" onClick={() => handleEditPost(post)}>Edit</span>
              <span className="delete-post" onClick={() => handleDeletePost(post.id)}>Delete</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available in this category.</p>
      )}

      {/* Create New Post Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Create New Post in {category}</h3>
        <PostForm 
          category={category} 
          onSuccess={() => {
            setIsModalOpen(false)
            fetchPosts() // Now this will work!
          }}
        />
      </Modal>

      {/* Edit Post Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => {
        setIsEditModalOpen(false)
        setEditingPost(null)
      }}>
        <h3>Edit Post</h3>
        <PostForm 
          category={category}
          editMode={true}
          existingPost={editingPost}
          onSuccess={(updatedData) => {
            handleUpdatePost(updatedData)
          }}
        />
      </Modal>
    </div>
  )
}

export default PostList
