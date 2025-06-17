import React from 'react'
import "../index.css";

function Card({ front, back, showsFront }) {
  return (
    <div className={`card-flip-container${showsFront ? '' : ' flipped'}`}>
      <div className="card-flip">
        <div className="card-front">
          <p>{front}</p>
        </div>
        <div className="card-back">
          <p style={{ whiteSpace: "pre-line" }}>{back}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
