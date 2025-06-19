// src/pages/ticket/TicketPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TicketPage() {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const maxSeats = parseInt(sessionStorage.getItem('maxSeats') || '0');

  const rows = 'ABCDEFGHIJ'.split('');
  const bookedSeats = ['A1', 'B5', 'C10', 'D15', 'E20'];
  const seats = [];

  rows.forEach(row => {
    for (let seatNum = 1; seatNum <= 30; seatNum++) {
      let section = '';
      if (seatNum <= 10) section = 'Left';
      else if (seatNum <= 20) section = 'Center';
      else section = 'Right';

      seats.push({
        id: `${row}${seatNum}`,
        section,
        isBooked: bookedSeats.includes(`${row}${seatNum}`),
      });
    }
  });

  const handleSelectSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= maxSeats) {
        alert(`Maksimal ${maxSeats} kursi dapat dipilih.`);
        return;
      }
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const handleClear = () => setSelectedSeats([]);
  const handleBack = () => navigate('/');
  const handleProceed = () => {
    sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    navigate('/ticket/booking');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleBack} style={styles.back}>← Kembali</button>
        <h2 style={styles.title}>🎭 Pilih Kursi Teater</h2>
        <div style={styles.stage}>STAGE</div>
      </div>

      <div style={styles.layout}>
        {['Left', 'Center', 'Right'].map(section => (
          <div key={section} style={styles.section}>
            <h4 style={styles.sectionTitle}>{section}</h4>
            <div style={styles.grid}>
              {seats.filter(s => s.section === section).map(seat => {
                const isSelected = selectedSeats.includes(seat.id);
                return (
                  <button
                    key={seat.id}
                    disabled={seat.isBooked}
                    onClick={() => handleSelectSeat(seat.id)}
                    style={{
                      ...styles.seat,
                      backgroundColor: seat.isBooked
                        ? '#f44336'
                        : isSelected
                        ? '#4caf50'
                        : '#fff',
                      color: seat.isBooked || isSelected ? '#fff' : '#333',
                      borderColor: seat.isBooked
                        ? '#f44336'
                        : isSelected
                        ? '#4caf50'
                        : '#ccc',
                      cursor: seat.isBooked ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {seat.id}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <h4>🪑 Kursi Terpilih:</h4>
        <p style={styles.selected}>
          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Belum ada'}
        </p>
        <div style={styles.actions}>
          <button onClick={handleClear} style={styles.clearBtn}>Clear</button>
          <button onClick={handleProceed} style={styles.nextBtn}>Lanjutkan</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Poppins, sans-serif',
    background: '#f0f4f8',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  back: {
    position: 'absolute',
    left: '20px',
    top: '20px',
    padding: '10px 14px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '10px'
  },
  stage: {
    background: '#222',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    maxWidth: '200px',
    margin: '10px auto'
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  section: {
    textAlign: 'center'
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: '10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '8px',
    justifyItems: 'center'
  },
  seat: {
    padding: '12px 0',
    width: '100%',
    borderRadius: '6px',
    fontWeight: '500',
    border: '1px solid #ccc',
    transition: 'all 0.2s ease'
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center'
  },
  selected: {
    fontSize: '14px',
    color: '#333',
    marginTop: '5px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '20px'
  },
  clearBtn: {
    padding: '10px 24px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  nextBtn: {
    padding: '10px 24px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default TicketPage;
