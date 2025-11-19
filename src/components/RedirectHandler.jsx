// frontend/src/components/RedirectHandler.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RedirectHandler() {
  const { code } = useParams();
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Redirect to backend which handles the actual 302 redirect
    window.location.href = `${backendUrl}/${code}`;
  }, [code, backendUrl]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px',
      color: '#6b7280'
    }}>
      Redirecting...
    </div>
  );
}

export default RedirectHandler;
