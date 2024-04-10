import './assets/base.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Header from './Header'
import AudioProvider from './context/audio'
import MemoryProvider from './context/memory'
import SettingsProvider from './context/settings'
import AvatarsProvider from './context/avatars'
import Creator from './Creator'

const { Checker } = window.api.App

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <SettingsProvider>
        <AvatarsProvider>
          <MemoryProvider>
            <AudioProvider>
              <Header />
              <App />
            </AudioProvider>
          </MemoryProvider >
        </AvatarsProvider >
      </SettingsProvider >
    </StrictMode>
  )
