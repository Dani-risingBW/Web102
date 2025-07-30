import { useState } from 'react'
import './App.css'
import amongusLogo from './assets/Among-Us.png';
import Navbar from './components/Navbar.jsx'
import { useRoutes } from 'react-router-dom'
import ReadCrew from './Pages/ReadCrew.jsx'
import CreateCrew from './Pages/CreateCrew.jsx';
import CrewProfile from './Pages/CrewProfile.jsx';
import EditCrew from './Pages/EditCrew.jsx';

function App() {
  const [count, setCount] = useState(0)

  
  // Sets up routes
  let element = useRoutes([
    {
      path: "/gallery",
      element:<ReadCrew />
    },
    {
      path:"/gallery/edit/:id",
      element: <EditCrew />
    },
    {
      path:"/new",
      element: <CreateCrew />
    },
    {
      path: "/profile/:id",
      element: <CrewProfile />
    }
  ]);

  return (
    
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div>
        <h1>Among Us Crewmates</h1>
        <p>Welcome to the Among Us Crewmates app! Here is where you can create your own characters before sending them into the game!</p>
        <img src={amongusLogo} className="amongus-logo" alt="Among Us logo" />
      </div>
      {element}
    </div>

  )
}

export default App
