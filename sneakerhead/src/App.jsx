import { useEffect, useState } from 'react';
import './App.css';
import Sneaker from '../components/Sneaker';


function App() {
  const [sneakers, setSneakers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const queries = ["jordan", "yeezy", "nike", "adidas", "puma", "reebok"];
  const [queryIndex, setQueryIndex] = useState(0);

  // Fetch all sneakers once on mount
  useEffect(() => {
    fetch(`http://localhost:3001/api/sneakers?q=${queries[queryIndex]}`)
      .then(res => res.json())
      .then(data => {
        const sneakersArray = Array.isArray(data) ? data : [data];
        setSneakers(sneakersArray);
        setCurrentIndex(0);
      })
      .catch(err => console.error('Error fetching sneakers:', err));  
    
  }, [queryIndex]);
  
  

  // Shuffle to a random sneaker
  const handleShuffle = () => {
    handleNextQuery();
    if (sneakers.length === 0) return;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * sneakers.length);
    } while (nextIndex === currentIndex && sneakers.length > 1);
    setCurrentIndex(nextIndex);
  };

  const handleNextQuery = () => {
    setQueryIndex((prevIndex) => (prevIndex + 1) % queries.length);
  };

  return (
    <>
      <h1>Sneakerz</h1>
      {sneakers.length > 0 && <Sneaker sneaker={sneakers[currentIndex]} />}
      <button className="shuffle-btn"onClick={handleShuffle}>Shuffle Sneaker</button>
    
    </>
  );
};

export default App
