import './assets/base.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Header from './Header'
import AudioProvider from './context/audio'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AudioProvider>
      <Header />
      <App />
    </AudioProvider>
  </React.StrictMode>
)
