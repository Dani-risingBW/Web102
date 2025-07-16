import { useState, useEffect } from 'react'
import './App.css'
import MarvelCard from './components/MarvelCard'
const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
import md5 from 'md5';

function App() {
  const [list, setList] = useState(null);
  

  useEffect(() => {
    const fetchMarvelData = async () => {
      const ts = new Date().getTime(); // 🕒 Timestamp
      const hash = md5(ts + privateKey + publicKey); // 🔒 Generate hash

      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setList(data.data.results);
        console.log(data); // 🧾 This shows your JSON data
      } catch (error) {
        console.error('Error fetching Marvel data:', error);
      }
    };

    fetchMarvelData();
  }, []);



  return (
    <div className="App">
      <div className="Navigation">
        <h1>Marvel Dashboard</h1>
        <div className="nav-links">
          <a href="#characters">Characters</a>
          <a href="#comics">Comics</a>
          <a href="#series">Series</a>

        </div>

      </div>
      <div className="Content">
        <div className="cards"> 
          <section className="section" id="characters">
            <h2>Characters</h2>
            <p>Character data will be displayed here.</p>
          </section>

          <section className="section" id="comics">
            <h2>Comics</h2>
            <p>Comic data will be displayed here.</p>
          </section>

          <section className="section" id="series">
            <h2>Series</h2>
            <p>Series data will be displayed here.</p>
          </section>
        </div>
        <div>
          <section className="section" id="marvel-list">
            <ul>
              <MarvelCard  charactersList={list}/>
            </ul>
          
          </section>
        </div>
        
      </div>
      <footer className="Footer">
        <p>&copy; 2024 Marvel Dashboard. All rights reserved.</p>
      </footer>
    </div>
    
  )
}

export default App
