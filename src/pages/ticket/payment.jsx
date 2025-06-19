import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();

  const seats = JSON.parse(sessionStorage.getItem('selectedSeats') || '[]');
  const biodata = JSON.parse(sessionStorage.getItem('biodata') || '{}');

  const [metode, setMetode] = useState('');
  const [bukti, setBukti] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    setBukti(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!metode) {
      alert('Pilih metode pembayaran terlebih dahulu.');
      return;
    }

    if (!bukti) {
      alert('Upload bukti pembayaran terlebih dahulu.');
      return;
    }

    // Simpan data simulasi
    sessionStorage.setItem("payment_method", metode);
    sessionStorage.setItem("bukti_file_name", bukti.name);

    // Tampilkan modal sukses
    setIsSuccess(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💳 Pembayaran Tiket</h2>

      <p style={styles.info}><strong>Seats:</strong> {seats.join(', ')}</p>
      <p style={styles.info}><strong>Nama Pemesan:</strong> {biodata?.nama}</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Pilih Metode Pembayaran:</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioOption}>
            <input
              type="radio"
              value="qris"
              checked={metode === 'qris'}
              onChange={(e) => setMetode(e.target.value)}
            />
            QRIS
          </label>
          <label style={styles.radioOption}>
            <input
              type="radio"
              value="bca"
              checked={metode === 'bca'}
              onChange={(e) => setMetode(e.target.value)}
            />
            Transfer Bank BCA
          </label>
        </div>

        {metode === 'bca' && (
          <div style={styles.transferInfo}>
            <p><strong>Nama Bank:</strong> BCA</p>
            <p><strong>No. Rekening:</strong> 1234567890</p>
            <p><strong>Nama:</strong> Panitia Whispers</p>
          </div>
        )}

        {metode === 'qris' && (
          <div style={styles.transferInfo}>
            <img src="/assets/qris.png" alt="QRIS" style={styles.qrisImage} />
            <p>Silakan scan QRIS ini dan kirim bukti transfer di bawah.</p>
          </div>
        )}

        <label style={styles.label}>Upload Bukti Pembayaran:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.inputFile}
        />

        <button type="submit" style={styles.button}>
          Submit & Selesaikan
        </button>
      </form>

      {/* MODAL POPUP */}
      {isSuccess && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>✅ Pembayaran Berhasil!</h3>
            <p style={styles.popupText}>E-ticket akan dikirim ke email kamu.</p>
            <button style={styles.popupBtn} onClick={() => navigate('/')}>
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fefefe',
    border: '1px solid #ddd',
    borderRadius: '10px'
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '600'
  },
  info: {
    color: '#555',
    textAlign: 'center',
    marginBottom: '10px'
  },
  form: {
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  label: {
    fontWeight: '500'
  },
  radioGroup: {
    color: '#333',
    display: 'flex',
    gap: '20px',
    marginTop: '5px'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#333'
  },
  transferInfo: {
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '8px',
  },
  qrisImage: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '10px'
  },
  inputFile: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '6px'
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  // Popup Styles
  popupOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  popup: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif'
  },
  popupTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#28a745',
    marginBottom: '10px'
  },
  popupText: {
    fontSize: '14px',
    color: '#444',
    marginBottom: '20px'
  },
  popupBtn: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default PaymentPage;
