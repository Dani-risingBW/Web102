import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const cards = [
    { question: "What is React?", answer: "A JavaScript library for building user interfaces." },
    { question: "How do you start a vite project?", answer: "npm create vite@latest\ncd project\nnpm install\nnpm run dev" },
    { question: "What is the difference between state and props in React?", answer: " Props are read-only data passed from a parent to a child component. While State is data managed internally by the component and can change over time." },
    { question: "How do you define and use a function in a React component?", answer: "const [count, setCount] = useState(0);\nfunction increaseCount(){\n  setCount(count + 1);\n}\nreturn <button onClick=(increaseCount}>Add 1</button>" },
    { question: "What does const handleNext = () => { ... } mean in React?", answer: "It's an arrow function assigned to a constant variable. An arrow function syntax (a shorter way to define a function)." },
    { question: "How to declare a useState hook?", answer: "const [state, setState] = useState(initalValue); Where state is the current state value and setStae is the function to update the state" },
    { question: "What does JSX stand for?", answer: " JSX stands for JavaScript XML. It lets you write HTML-like code inside JavaScript." },
    { question: "How do you display dynamic data in JSX?", answer: "Use curly braces {} to insert variables: <p>{name}</p>" },
    { question: "How do you handle a button click in React?", answer: "Use the onClick prop: <button onClick={handleClick}>Click Me</button>" },
    { question: "Can you use if statements inside JSX?", answer: "No, but you can use ternary (? :) or logical (&&) expressions instead." }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setShowFront(true);
  };

  const handleBack = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setShowFront(true);
  };

  const currentCard = cards[currentIndex];

  const handleFlip = () => setShowFront(!showFront);
  return (
    <div className="App">
      <header className="header">
        <h1>React Learner Flashcards</h1>
        <p>Learning about React? Test yourself on some basic functions!</p>
        <h2>Card {currentIndex + 1} of {cards.length}</h2>

      </header>
      <div onClick={handleFlip} className='card-area'>
        <Card
          front={currentCard.question}
          back={currentCard.answer}
          showsFront={showFront}
        />
      </div>
      <div className='button-group'>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <p>(Click the card to flip)</p>
    </div>
  )
}

export default App
