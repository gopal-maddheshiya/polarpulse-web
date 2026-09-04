import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { SearchProvider } from './context/SearchContext'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
