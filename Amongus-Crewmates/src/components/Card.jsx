import { useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import more from '../components/more.png'

const Card = (props) =>  {

  const [count, setCount] = useState(props.vote || 0)
  const updateCount = async (event) => {
    event.preventDefault()
    
    await supabase
      .from('Crew')
      .update({ vote: count + 1 })
      .eq('id', props.id)

    setCount((count) => count + 1)
  }

  return (
    <div className="card" key={props.id}>
      <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
      <Link to={`/profile/${props.id}`} style={{ color: "white" }} ><h2 className="name">{props.name || "Unknown"}</h2></Link>
      <Link to={`/profile/${props.id}`} style={{ color: "white" }} ><h3 className="speed">{"speed: " + props.speed || "?"}</h3></Link>
      <p className="color">{"color: " + props.color || "?"}</p>
      <p className="role">{props.role || "?"}</p>
      <button className="votes" onClick={updateCount} >Votes: {count}</button>

    </div>
    
  );
};

export default Card