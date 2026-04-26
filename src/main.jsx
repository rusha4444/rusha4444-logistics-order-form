// main.jsx - This is the STARTING POINT of every React app
// It grabs the <div id="root"> from index.html and "injects" our React app inside it

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// StrictMode helps catch bugs during development (shows extra warnings)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
