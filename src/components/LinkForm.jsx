// src/components/LinkForm.jsx
import { useState } from 'react';
import './LinkForm.css';

function LinkForm({ onSubmit }) {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Client-side validation
    if (!targetUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (customCode && !/^[A-Za-z0-9]{6,8}$/.test(customCode)) {
      setError('Custom code must be 6-8 alphanumeric characters');
      return;
    }

    setLoading(true);
    const result = await onSubmit(targetUrl, customCode);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTargetUrl('');
      setCustomCode('');
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="link-form-container">
      <form onSubmit={handleSubmit} className="link-form">
        <div className="form-group">
          <label htmlFor="targetUrl">Target URL *</label>
          <input
            id="targetUrl"
            type="url"
            placeholder="https://example.com/your-long-url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customCode">
            Custom Code (optional, 6-8 characters)
          </label>
          <input
            id="customCode"
            type="text"
            placeholder="abc123"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            disabled={loading}
            maxLength={8}
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : '✨ Create Short Link'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">✅ Link created successfully!</div>}
    </div>
  );
}

export default LinkForm;
