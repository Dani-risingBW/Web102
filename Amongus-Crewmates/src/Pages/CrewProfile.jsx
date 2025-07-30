import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import profileAmongus from '../assets/profile-amongus.png'; // Adjust path if needed
import './CrewProfile.css'; // Optional: Add CSS for styling
import Navbar from '../components/Navbar';

function CreateProfile() {
  const { id } = useParams();
  const [crew, setCrew] = useState(null);

  useEffect(() => {
    const fetchCrew = async () => {
      const { data } = await supabase
        .from('Crew')
        .select()
        .eq('id', id)
        .single();
      setCrew(data);
    };
    fetchCrew();
  }, [id]);

  if (!crew) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-card">
        <h1>{"Crewmate: " + crew.name}</h1>
        <h2>Stats:</h2>
        <p>Speed: {crew.speed}</p>
        <p>Color: {crew.color}</p>
      <p>Role: {crew.role}</p>
      <p>Voted to eject: {crew.vote}</p>

      <br />
      <button onClick={() => { window.location.href = `/gallery/edit/${crew.id}` }}>Edit Profile</button>
      <img  
        src={profileAmongus} 
        alt="Among Us Profile" 
        style={{ width: "120px", marginBottom: "18px", borderRadius: "16px" }} 
      />
    </div>
    </>
  );
}

export default CreateProfile;
