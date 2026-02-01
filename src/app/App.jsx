import { NavLink, Route, Routes } from 'react-router-dom'
import '../styles/App.css'

import HomePage from '../pages/HomePage.jsx'
import RaccoltaPage from '../pages/RaccoltaPage.jsx'
import SportelloPage from '../pages/SportelloPage.jsx'

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ fontWeight: 700 }}>Municipal Hub UI</div>

        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/raccolta">Raccolta</NavLink>
          <NavLink to="/sportello">Sportello</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/raccolta" element={<RaccoltaPage />} />
        <Route path="/sportello" element={<SportelloPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: 24 }}>
              <h1>404</h1>
              <p>Pagina non trovata.</p>
            </main>
          }
        />
      </Routes>
    </div>
  )
}

export default App
