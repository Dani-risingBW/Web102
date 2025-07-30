import {useState} from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

function EditCrew() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    speed: '',
    color: '',
    role: ''
  });

  

  const deleteCrew = async (event) => {
    event.preventDefault()
    // Delete the crew from the database
    await supabase
        .from('Crew')
        .delete()
        .eq('id', id)

    window.location = "/gallery";
  }

  const handleChange = (event) => {
      const {name, value} = event.target
      setFormData( (prev) => {
          return {
              ...prev,
              [name]:value,
          }
      })
    
  }

  const updateCrew = async (e) => {
    e.preventDefault();
    const { name, speed, color, role } = formData;

    const { data, error } = await supabase
      .from('Crew')
      .insert([{ name, speed, color, role }]);
    if (error) {
      console.error('Error creating crew:', error);
    } else {    
      console.log('Crew created successfully:', data);
    } 
    
    window.location = "/gallery";
  };

  return (
    <div>
      <h2>Edit Crew Member</h2>
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

        <input type="submit" value="Update" onClick={updateCrew} />
      </form>
      <div className="edit-buttons">
  
        <button className="deleteButton" onClick={deleteCrew}>Delete</button>
      </div>
    </div>
  )
}

export default EditCrew
