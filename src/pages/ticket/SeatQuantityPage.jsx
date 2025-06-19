// src/pages/ticket/SeatQuantityPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeatQuantityPage() {
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(quantity);
    if (!count || count < 1 || count > 10) {
      alert('Masukkan jumlah kursi antara 1–10.');
      return;
    }
    sessionStorage.setItem('maxSeats', count);
    navigate('/ticket');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎟️ Pesan Tiket Teater Whispers</h1>
        <p style={styles.subtitle}>Masukkan jumlah kursi yang ingin kamu pesan</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Jumlah kursi (maks. 10)"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Pilih Kursi →
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '400px',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#1e40af'
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '25px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '14px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }
};

export default SeatQuantityPage;
