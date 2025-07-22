import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Not Found!</h1>
      <Link to="/" style={{ color: "white" }}>Go back to Home</Link>
    </div>
    
  )
}

export default NotFound
