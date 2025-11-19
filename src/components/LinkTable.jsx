import { useState } from 'react';
import './LinkTable.css';

function LinkTable({ links, onDelete }) {
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [copiedCode, setCopiedCode] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedLinks = [...links].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Handle null values
    if (aVal === null) return 1;
    if (bVal === null) return -1;

    // Sort logic
    if (sortField === 'clicks') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    if (sortField === 'created_at' || sortField === 'last_clicked') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // String comparison
    return sortOrder === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const copyToClipboard = async (code) => {
    const shortUrl = `${window.location.origin}/${code}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      alert('Failed to copy',err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const truncateUrl = (url, maxLength = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  return (
    <div className="table-container">
      <table className="link-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('code')} className="sortable">
              Short Code {sortField === 'code' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('target_url')} className="sortable">
              Target URL {sortField === 'target_url' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('clicks')} className="sortable">
              Clicks {sortField === 'clicks' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('last_clicked')} className="sortable">
              Last Clicked {sortField === 'last_clicked' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedLinks.map((link) => (
            <tr key={link.code}>
              <td>
                <code className="code-badge">{link.code}</code>
              </td>
              <td className="url-cell" title={link.target_url}>
                {truncateUrl(link.target_url)}
              </td>
              <td>{link.clicks}</td>
              <td>{formatDate(link.last_clicked)}</td>
              <td className="actions-cell">
                <button
                  onClick={() => copyToClipboard(link.code)}
                  className="action-btn copy-btn"
                  title="Copy short URL"
                >
                  {copiedCode === link.code ? '✓' : '📋'}
                </button>
                <a
                  href={`/code/${link.code}`}
                  className="action-btn view-btn"
                  title="View stats"
                >
                  📊
                </a>
                <button
                  onClick={() => onDelete(link.code)}
                  className="action-btn delete-btn"
                  title="Delete link"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LinkTable;
