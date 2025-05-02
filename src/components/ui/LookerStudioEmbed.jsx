import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LookerStudioEmbed = ({ reportId, userId }) => {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateEmbedUrl = async () => {
      try {
        // Get a signed URL with proper auth tokens for the user
        const response = await axios.get(`/api/dashboard/embed-url`, {
          params: {
            reportId,
            userId
          }
        });
        
        setEmbedUrl(response.data.embedUrl);
        setLoading(false);
      } catch (err) {
        console.error('Error generating embed URL:', err);
        setError('Failed to load dashboard');
        setLoading(false);
      }
    };

    generateEmbedUrl();
  }, [reportId, userId]);

  if (loading) {
    return <div className="h-96 w-full flex items-center justify-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="looker-embed w-full">
      <iframe
        src={embedUrl}
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
        title="Dashboard"
      ></iframe>
    </div>
  );
};

export default LookerStudioEmbed;