import { useState } from 'react'
import './App.css'
import BaristaForm from './Components/BaristaForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="title-container">
        <h1 className="title">On my Grind</h1>
        <p>So you think you can barista? Let's put that to the test... </p>
      </div>
      <BaristaForm />

    </>
  )
}

export default App
