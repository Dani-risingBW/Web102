import React from 'react'

const Scholarship = ({ title, description, link, list }) => {
  return (
    <div className="scholarship-box">
      <h2>{title}</h2>
      <p>{description}</p>
      {list && list.length > 0 && (
        <ul>
          {list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
       <a href={link} target="_blank" rel="noopener noreferrer" className="scholarship-link-btn">Apply Here</a>
    </div>
  )
}

export default Scholarship
