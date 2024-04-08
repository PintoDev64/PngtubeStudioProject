import './assets/base.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Header from './Header'
import AudioProvider from './context/audio'
import MemoryProvider from './context/memory'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MemoryProvider>
      <AudioProvider>
        <Header />
        <App />
      </AudioProvider>
    </MemoryProvider>
  </StrictMode>
)
