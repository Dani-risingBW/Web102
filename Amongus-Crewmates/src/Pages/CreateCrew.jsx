import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { supabase } from '../client'
import "./CreateCrew.css"

function CreateCrew() {
   const createCrew = async (event) => {
          event.preventDefault()
          // Create a new post in the database
          const { error } = await supabase
          .from('Crew')
          .insert({ name: crew.name, speed: crew.speed, color: crew.color, role: crew.role});
          if (error) {
              alert("Error: " + error.message);
              return;
          }
          window.location = "/";
      }
      const [crew, setCrew] = useState({name: "", speed: "", color: "", role: ""})

      const handleChange = (event) => {
          const {name, value} = event.target
          setCrew( (prev) => {
              return {
                  ...prev,
                  [name]:value,
              }
          })
      }
      
  return (
    <div>
      <Navbar />
      <form className="create-crew-form">
        <label htmlFor="name">Name</label> <br />
        <input type="text" id="name" name="name" onChange={handleChange} /><br />
        <br/>

        <label htmlFor="speed">Speed</label><br />
        <input type="float" id="speed" name="speed" onChange={handleChange} /><br />
        <br/>

        <label htmlFor="color">Description</label><br />
        <select id="color" name="color" onChange={handleChange}>
        <option value="">Select a color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="pink">Pink</option>
        <option value="purple">Purple</option>
        <option value="black">Black</option>
        <option value="random">Random</option>
        </select>
        <br/>

        <label htmlFor="role">Role</label><br />
        <input type="text" id="role" name="role" onChange={handleChange} /><br />
        <br/>

        <input type="submit" value="Submit" onClick={createCrew} />
      </form>
      
    </div>
  )
}

export default CreateCrew
