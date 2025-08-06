import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

function PostForm({ category, editMode = false, existingPost = null, onSuccess }) {
  const { category: paramCategory } = useParams();
  const [comment, setComment] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // Pre-fill form when editing
  useEffect(() => {
    if (editMode && existingPost) {
      setComment(existingPost.comment || '')
      setImageUrl(existingPost.image_url || '')
    }
  }, [editMode, existingPost])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (editMode) {
      // Call the parent's onSuccess with updated data
      onSuccess({ comment, image_url: imageUrl })
    } else {
      // Create new post logic
      const { data: categoryData } = await supabase
        .from('Hobby-forum')
        .select('id')
        .eq('category', paramCategory)
        .single()

      const { error } = await supabase
        .from('Hobby-subforum')
        .insert([{
          subforum_id: categoryData.id,
          comment,
          image_url: imageUrl,
          username: 'Anonymous' // You can add user authentication later
        }])

      if (!error) {
        onSuccess()
        setComment('')
        setImageUrl('')
      }
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment..."
          required
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (optional)"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Saving...' : (editMode ? 'Update Post' : 'Create Post')}
      </button>
    </form>
  )
}

export default PostForm
