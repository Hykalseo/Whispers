import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

function PaymentPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [metode, setMetode] = useState('');
  const [bukti, setBukti] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const seats = JSON.parse(sessionStorage.getItem('selectedSeats') || '[]');
  const biodata = JSON.parse(sessionStorage.getItem('biodata') || '{}');

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

  const handleFileChange = (e) => {
    setBukti(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!metode) return alert('Pilih metode pembayaran terlebih dahulu.');
    if (!bukti) return alert('Upload bukti pembayaran terlebih dahulu.');

    sessionStorage.setItem("payment_method", metode);
    sessionStorage.setItem("bukti_file_name", bukti.name);
    setIsSuccess(true);
  };

  const textColor = isDarkMode ? '#f8fafc' : '#1f2937';
  const bgCard = isDarkMode ? '#1e293b' : '#ffffff';
  const inputBg = isDarkMode ? '#334155' : '#f8fafc';
  const inputBorder = isDarkMode ? '#475569' : '#cbd5e1';

  return (
    <div style={{
      ...styles.container,
      background: isDarkMode ? '#0f172a' : '#f1f5f9',
      color: textColor
    }}>
      <div style={{ ...styles.card, backgroundColor: bgCard, color: textColor }}>
        <h2 style={styles.title}>💳 Pembayaran Tiket</h2>
        <p style={styles.info}><strong>Seats:</strong> {seats.join(', ')}</p>
        <p style={styles.info}><strong>Nama Pemesan:</strong> {biodata?.nama}</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Pilih Metode Pembayaran:</label>
          <div style={styles.radioGroup}>
            <label style={{ ...styles.radioOption, color: textColor }}>
              <input
                type="radio"
                value="qris"
                checked={metode === 'qris'}
                onChange={(e) => setMetode(e.target.value)}
              /> QRIS
            </label>
            <label style={{ ...styles.radioOption, color: textColor }}>
              <input
                type="radio"
                value="bca"
                checked={metode === 'bca'}
                onChange={(e) => setMetode(e.target.value)}
              /> Transfer Bank BCA
            </label>
          </div>

          {metode === 'bca' && (
            <div style={{ ...styles.transferInfo, backgroundColor: inputBg, color: textColor }}>
              <p><strong>Nama Bank:</strong> BCA</p>
              <p><strong>No. Rekening:</strong> 1234567890</p>
              <p><strong>Nama:</strong> Panitia Whispers</p>
            </div>
          )}

          {metode === 'qris' && (
            <div style={{ ...styles.transferInfo, backgroundColor: inputBg, color: textColor }}>
              <QRCodeCanvas
                value="https://dummy-whispers-payment.com/qris-demo"
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
              <p style={{ marginTop: 10 }}>Silakan scan QRIS ini dan kirim bukti transfer di bawah.</p>
            </div>
          )}

          <label style={styles.label}>Upload Bukti Pembayaran:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              ...styles.inputFile,
              backgroundColor: inputBg,
              borderColor: inputBorder,
              color: textColor
            }}
          />

          <button type="submit" style={styles.submitBtn}>
            Submit & Selesaikan
          </button>
        </form>
      </div>

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
    minHeight: '100vh',
    padding: '40px 16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    padding: '30px',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#facc15'
  },
  info: {
    textAlign: 'center',
    marginBottom: '6px',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px'
  },
  label: {
    fontWeight: '600',
    fontSize: '14px'
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px'
  },
  transferInfo: {
    borderRadius: '8px',
    padding: '16px',
    fontSize: '14px'
  },
  inputFile: {
    border: '1px solid',
    borderRadius: '8px',
    padding: '10px'
  },
  submitBtn: {
    backgroundColor: '#22c55e',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  popupOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  popup: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    maxWidth: '400px',
    width: '90%',
    fontFamily: 'Poppins, sans-serif'
  },
  popupTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#22c55e',
    marginBottom: '10px'
  },
  popupText: {
    color: '#444',
    marginBottom: '20px'
  },
  popupBtn: {
    padding: '10px 24px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default PaymentPage;
