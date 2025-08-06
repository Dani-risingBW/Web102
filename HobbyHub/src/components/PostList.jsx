import React from 'react'
import {useParams} from 'react-router-dom'
function PostList() {
  const { category } = useParams();
  return (
    <div>
      <h2>Posts in {category}</h2>
      {/* List of posts goes here */}
    </div>
  )
}

export default PostList
