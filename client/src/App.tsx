import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FormLocation from './components/FormLocation'
import FormContact from './components/FormContact'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Navigate to="/chci-nabidku" />} />
          <Route path="/chci-nabidku" element={<FormLocation />} />
          <Route path="/chci-nabidku/contact" element={<FormContact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
