import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLinkStats } from '../services/api';
import './StatsPage.css';

function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [code]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getLinkStats(code);
      setLink(data);
      setError(null);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Link not found' : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading stats...</div>;
  if (error) return <div className="error-page">{error}</div>;
  if (!link) return null;

  const shortUrl = `${window.location.origin}/${link.code}`;

  return (
    <div className="stats-page">
      <header>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1>📊 Link Statistics</h1>
      </header>

      <div className="stats-card">
        <div className="stat-item">
          <label>Short Code</label>
          <div className="stat-value">
            <code>{link.code}</code>
          </div>
        </div>

        <div className="stat-item">
          <label>Short URL</label>
          <div className="stat-value">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        </div>

        <div className="stat-item">
          <label>Target URL</label>
          <div className="stat-value">
            <a href={link.target_url} target="_blank" rel="noopener noreferrer">
              {link.target_url}
            </a>
          </div>
        </div>

        <div className="stat-item">
          <label>Total Clicks</label>
          <div className="stat-value clicks">{link.clicks}</div>
        </div>

        <div className="stat-item">
          <label>Created At</label>
          <div className="stat-value">
            {new Date(link.created_at).toLocaleString()}
          </div>
        </div>

        <div className="stat-item">
          <label>Last Clicked</label>
          <div className="stat-value">
            {link.last_clicked
              ? new Date(link.last_clicked).toLocaleString()
              : 'Never'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
