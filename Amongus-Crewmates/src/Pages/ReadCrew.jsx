import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { supabase } from '../client';
import Card from '../components/Card';

function ReadCrew() {
  const navigate = useNavigate();
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchCrew = async () => {
      const { data } = await supabase
        .from('Crew')
        .select()
        .order('created_at', { ascending: true });
      setCrew(data || []);
    };
    fetchCrew().catch(console.error);
  }, []); // Only run on mount

  return (
    <div>
      <Navbar />
      <p>Here you can view all the Among Us Crewmates!</p>
      <button onClick={() => navigate('/new')}>Create New Crewmate</button>
      <div className="crew-gallery">
        {crew && crew.length > 0 ? (
          crew
            .sort((a, b) => a.id - b.id)
            .map((crew) => (
              <Card
                key={crew.id}
                id={crew.id}
                name={crew.name}
                speed={crew.speed}
                color={crew.color}
                role={crew.role}
                vote={crew.vote}
              />
            ))
        ) : (
          <h2>No Characters Made Yet 😞</h2>
        )}
      </div>
    </div>
  );
}

export default ReadCrew;


