import { useParams } from 'react-router-dom';
import {React, useEffect} from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList.jsx';
import PostForm from '../components/PostForm.jsx';

function ForumPage() {
    const { category } = useParams();
  // Optionally convert the category to a readable format
  const formattedTitle = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

    // Render the forum page with a title, a form to create a new post, and a list of posts
    // Note: You can replace this with your own logic to fetch posts based on the category
    // For example, you might want to fetch posts from a database or API based on the category
   
  return (
    <Layout>
        <h1>{formattedTitle} Forum</h1>
        
        {/* Form to create a new post in this category*/}
        <PostForm category={category} />

        {/* List of posts filtered by category */}
        <PostList category={category} />
        
    </Layout>
  );
}

export default ForumPage;
