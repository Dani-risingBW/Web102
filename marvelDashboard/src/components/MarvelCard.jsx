import React, {useState, useEffect} from 'react'
import md5 from 'md5';



function MarvelCard({charactersList = []}) {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCharacters = characters.filter(character => 
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (character.description && character.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    useEffect(() => {
        const ts = new Date().getTime();
        const publicKey = '311fcca3575999d60e0346cea85bf48a';
        const privateKey = 'ed852f572405119769de40c1eb00f5cfa3181c81';
        const hash = md5(ts + privateKey + publicKey);

        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        fetch(url)
        .then(response => response.json())
        .then(data => setCharacters(data.data.results))
        .catch(error => console.error('Error:', error));

    }, []);

  return (
   <div>
        <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h1>Marvel Characters 🦸‍♀️🦸‍♂️</h1>
        {filteredCharacters.length > 0 ? (
            <ul>
                {filteredCharacters.map(character => (
                <li key={character.id}>
                    <h3>{character.name}</h3>
                    {character.thumbnail && (
                    <img
                        src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
                        alt={character.name}
                    />
                    )}
                    {character.description && <p>{character.description}</p>}
                </li>
                ))}
            </ul>
        ) : (
            <p>No characters found. Try another search term!</p>
        )}

    </div>
  )
}

export default MarvelCard
