import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const showInfo = {
    date: 'July 27, 2025',
    time: '7:00 PM',
    venue: 'HIDUP JOKOWII'
  };

  const cast = [
    'Bhima Aryasatya',
    'Indira Maheswari',
    'Raka Wijaya',
    'Tania Rahmadani',
    'Aryo Dharma',
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎭 Welcome to Whispers</h1>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>📖 Synopsis</h2>
        <p style={styles.text}>
          “Whispers” adalah kisah yang menggambarkan pergolakan batin antara mimpi dan kenyataan, di tengah dunia teater klasik yang mulai dilupakan.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>🗓️ Show Info</h2>
        <p style={styles.text}><strong>Date:</strong> {showInfo.date}</p>
        <p style={styles.text}><strong>Time:</strong> {showInfo.time}</p>
        <p style={styles.text}><strong>Venue:</strong> {showInfo.venue}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>🎭 Cast</h2>
        <ul style={styles.castList}>
          {cast.map((name, index) => (
            <li key={index} style={styles.castItem}>• {name}</li>
          ))}
        </ul>
      </section>

      <div style={styles.buttonGroup}>
        <Link to="/ticket/quantity" style={styles.link}>
          <button style={styles.button}>🎟️ Get Tickets</button>
        </Link>
        <Link to="/merch" style={styles.link}>
          <button style={styles.button}>🛍️ Visit Merch</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    // margin: '40px auto',
    padding: '30px',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fefefe',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '20px'
  },
  section: {
    marginBottom: '30px'
  },
  subtitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px'
  },
  text: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6'
  },
  castList: {
    listStyle: 'none',
    paddingLeft: '0',
    color: '#444'
  },
  castItem: {
    marginBottom: '6px',
    fontSize: '15px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px'
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1e40af',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600'
  },
  link: {
    textDecoration: 'none'
  }
};

export default LandingPage;
