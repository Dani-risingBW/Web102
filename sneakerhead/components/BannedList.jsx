import React from 'react'; 


function BannedList({ bannedTags, onRemoveTag }) {
  return (
    <div >
      <h2>Banned List</h2>
      <ul className="banned-tags-section">
        {bannedTags.map(tag => (
          <button className="banned-tags" onClick={() => onRemoveTag(tag)} key={tag}>{tag}</button>
        ))}
      </ul>
    </div>
  );
}

export default BannedList;
