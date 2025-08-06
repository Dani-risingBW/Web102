import React from 'react'
import {useParams} from 'react-router-dom'
function PostForm() {
  const { category } = useParams();
    // This component can be used to create a new post in the specified category
  return (
    <div>
      <h2>Create a New Post in {category}</h2>
      {/* Form elements go here */}
    </div>
  )
}

export default PostForm
