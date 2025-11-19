import { useState, useEffect } from 'react';
import { createLink, getAllLinks, deleteLink } from '../services/api';
import LinkForm from '../components/LinkForm';
import LinkTable from '../components/LinkTable';
import './Dashboard.css';

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all links on component mount
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const data = await getAllLinks();
      setLinks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch links');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLink = async (targetUrl, customCode) => {
    try {
      const newLink = await createLink(targetUrl, customCode);
      setLinks([newLink, ...links]); // Add to beginning of list
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create link';
      return { success: false, error: errorMsg };
    }
  };

  const handleDeleteLink = async (code) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      await deleteLink(code);
      setLinks(links.filter((link) => link.code !== code));
    } catch(err) {
      alert('Failed to delete link',err.message);
    }
  };

  // Filter links by search term
  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.target_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🔗 TinyLink Dashboard</h1>
        <p>Create, manage, and track your short links</p>
      </header>

      <LinkForm onSubmit={handleCreateLink} />

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {error && <div className="error">{error}</div>}

      {filteredLinks.length === 0 ? (
        <div className="empty-state">
          <p>No links found. Create your first short link above! 👆</p>
        </div>
      ) : (
        <LinkTable links={filteredLinks} onDelete={handleDeleteLink} />
      )}
    </div>
  );
}

export default Dashboard;
