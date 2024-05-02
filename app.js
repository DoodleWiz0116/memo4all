import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [memo, setMemo] = useState('');

  useEffect(() => {
    fetchMemo();
  }, []);

  const fetchMemo = async () => {
    const response = await axios.get('/api/memo');
    setMemo(response.data.content);
  };

  const handleChange = async (e) => {
    const newMemo = memo + e.target.value;
    setMemo(newMemo);
    await axios.post('/api/memo', { content: newMemo });
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', whiteSpace: 'pre-wrap' }}>
      {memo}
      <input
        type="text"
        maxLength="1"
        onKeyPress={(e) => {
          if (!/^[a-zA-Z0-9]$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;