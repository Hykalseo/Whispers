// src/pages/ticket/BookingFormPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingFormPage() {
  const navigate = useNavigate();
  const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats') || '[]');

  const [form, setForm] = useState({
    nama: '',
    email: '',
    hp: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, email, hp } = form;

    if (!nama || !email || !hp) {
      alert('Semua data wajib diisi.');
      return;
    }

    sessionStorage.setItem('biodata', JSON.stringify(form));
    navigate('/ticket/payment');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🧾 Isi Biodata Pemesan</h2>
        <p style={styles.subtitle}>Kursi yang dipilih: <strong>{selectedSeats.join(', ')}</strong></p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Aktif"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="tel"
            name="hp"
            placeholder="Nomor HP"
            value={form.hp}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Lanjut ke Pembayaran →
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
    maxWidth: '500px',
    width: '100%',
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
    borderRadius: '10px',
    fontSize: '16px',
    border: '1px solid #ccc'
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

export default BookingFormPage;
