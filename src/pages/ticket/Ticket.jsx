import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TicketPage() {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const maxSeats = parseInt(sessionStorage.getItem('maxSeats') || '0');

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

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
      if (selectedSeats.length >= maxSeats) return;
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const handleClear = () => setSelectedSeats([]);
  const handleProceed = () => {
    sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    navigate('/ticket/booking');
  };

  return (
    <div style={{
      ...styles.container,
      background: isDarkMode
        ? 'linear-gradient(to bottom right, #0f172a, #1e293b)'
        : 'linear-gradient(to bottom right, #e0f2fe, #f0f4f8)',
      color: isDarkMode ? '#f1f5f9' : '#111'
    }}>
      <div style={styles.header}>
        <h2 style={{ ...styles.title, color: isDarkMode ? '#cbd5e1' : '#1e3a8a' }}>
          🎭 Pilih Kursi Teater
        </h2>
        <div style={{
          ...styles.stage,
          background: isDarkMode ? '#334155' : '#1e293b',
          color: '#fff'
        }}>STAGE</div>
      </div>

      <div style={styles.layout}>
        {['Left', 'Center', 'Right'].map(section => (
          <div key={section} style={styles.section}>
            <h4 style={{
              ...styles.sectionTitle,
              color: isDarkMode ? '#e2e8f0' : '#0f172a'
            }}>{section}</h4>
            <div style={styles.grid}>
              {seats.filter(s => s.section === section).map(seat => {
                const isSelected = selectedSeats.includes(seat.id);
                const isMaxed = selectedSeats.length >= maxSeats;
                const isDisabled = seat.isBooked || (!isSelected && isMaxed);

                return (
                  <button
                    key={seat.id}
                    disabled={isDisabled}
                    onClick={() => handleSelectSeat(seat.id)}
                    style={{
                      ...styles.seat,
                      backgroundColor: seat.isBooked
                        ? '#ef4444'
                        : isSelected
                        ? '#22c55e'
                        : isDarkMode ? '#1e293b' : '#f8fafc',
                      color: seat.isBooked || isSelected ? '#fff' : isDarkMode ? '#e2e8f0' : '#333',
                      borderColor: seat.isBooked
                        ? '#ef4444'
                        : isSelected
                        ? '#22c55e'
                        : '#cbd5e1',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      opacity: isDisabled && !seat.isBooked ? 0.4 : 1,
                      boxShadow: !isDisabled && !seat.isBooked ? '0 0 0 0 transparent' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isDisabled && !isSelected) {
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
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

      <div style={{
        ...styles.footer,
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        color: isDarkMode ? '#f1f5f9' : '#333'
      }}>
        <h4>🪑 Kursi Terpilih:</h4>
        <p style={styles.selected}>
          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Belum ada'}
        </p>
        <div style={styles.actions}>
          <button onClick={handleClear} style={styles.clearBtn}>Reset</button>
          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            style={{
              ...styles.nextBtn,
              opacity: selectedSeats.length === 0 ? 0.5 : 1,
              cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'Poppins, sans-serif',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    position: 'relative'
  },
  back: {
    position: 'absolute',
    left: '20px',
    top: '0',
    padding: '10px 14px',
    backgroundColor: '#64748b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '14px'
  },
  stage: {
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: '600',
    maxWidth: '240px',
    margin: '0 auto',
    fontSize: '16px',
    letterSpacing: '1px'
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    padding: '0 10px'
  },
  section: {
    textAlign: 'center'
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: '14px',
    fontSize: '18px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '10px',
    justifyItems: 'center'
  },
  seat: {
    padding: '12px 0',
    width: '100%',
    borderRadius: '6px',
    fontWeight: '500',
    border: '1px solid #ccc',
    fontSize: '13px'
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    maxWidth: '600px',
    marginInline: 'auto'
  },
  selected: {
    fontSize: '15px',
    marginTop: '10px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '24px',
    flexWrap: 'wrap'
  },
  clearBtn: {
    padding: '10px 24px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '15px'
  },
  nextBtn: {
    padding: '10px 24px',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '15px'
  }
};

export default TicketPage;
