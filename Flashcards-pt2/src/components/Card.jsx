import React from 'react'
import "../index.css";

function Card({ front, back, showsFront, handleChange, inputs, onCheckAnswer, answerStatus }) {
  
  return (
    <div className="card-container">
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
      <div className="answer-space">
        <input
          type="text"
          placeholder="Answer..."
          onChange={handleChange}
          onClick={e => e.stopPropagation()} 
          value={inputs.answer || ""}
          className="textbox"
          id={answerStatus}
          name="answer"
        />
        <button type="submit" className="submit" 
          onClick={e => {
          e.stopPropagation();
          onCheckAnswer(e);
          }}>
          Check Answer
        </button>
      </div>
    </div>
  )
}

export default Card
