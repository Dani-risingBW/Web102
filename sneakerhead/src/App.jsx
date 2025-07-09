import { useEffect, useState } from 'react';
import './App.css';
import Sneaker from '../components/Sneaker';
import BannedList from '../components/BannedList';


function App() {
  const [sneakers, setSneakers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannedTags, setBannedTags] = useState([]);
  
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

  // Filter out sneakers with banned tags
  const filteredSneakers = sneakers.filter(
    sneaker =>
      !bannedTags.includes(sneaker.brand) &&
      !bannedTags.includes(sneaker.colorway) &&
      !bannedTags.includes(sneaker.retailPrice)
      
  );
  
  //Ban a tag 
  const handleBanTag = (tag) => {
    setBannedTags(prev => [...new Set([...prev, tag])]);
  };
  const handleRemoveTag = (tagToRemove) => {
    setBannedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };
  

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
    <div className="App">
      <div className="section">
        <h1>Sneakerz</h1>
        <button className="shuffle-btn"onClick={handleShuffle}>Shuffle Sneaker</button>
        {filteredSneakers.length > 0 && (<Sneaker 
          sneaker={filteredSneakers[currentIndex]} 
          onBanTag={handleBanTag}
        />)}
        
      </div>
      <div className="section" id="banned-list">
        <BannedList 
          bannedTags={bannedTags}  
          onRemoveTag={handleRemoveTag} 
        />
      </div>
    
    </div>
  );
};

export default App
