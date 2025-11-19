// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StatsPage from './pages/StatsPage';
import RedirectHandler from './components/RedirectHandler';  // ← Add this
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<StatsPage />} />
          <Route path="/:code" element={<RedirectHandler />} />  {/* ← Add this */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
