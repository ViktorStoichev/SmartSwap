// Application Entry Point
// Initializes React application and renders the root App component
// Sets up React StrictMode for development debugging and error detection

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create and render the React application
createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems during development
  <StrictMode>
    <App />
  </StrictMode>,
)
