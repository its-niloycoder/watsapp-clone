import { useState } from 'react'
import './App.css'

import Navbar from "../../src/components/Navbar/Navbar"



function App() {
  const [count, setCount] = useState(0)

  return (
    <header>
      <Navbar />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </header>
  )
}

export default App