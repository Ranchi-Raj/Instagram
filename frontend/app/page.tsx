"use client";

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("username", username);

    try {
      const res = await fetch("http://localhost:8000/download-dp", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error);
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${username}_dp.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (e) {
      alert("Failed to fetch DP");
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Instagram DP Downloader</h1>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          placeholder="Enter Instagram username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          {loading ? "Downloading..." : "Download"}
        </button>
      </form>
    </div>
  );
}
