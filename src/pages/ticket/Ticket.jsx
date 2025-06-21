import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Tambahkan ini

function TicketPage() {
  const navigate = useNavigate(); // ✅ Tambahkan ini
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({ nama: '', email: '' });

  const maxSeats = parseInt(sessionStorage.getItem('maxSeats') || '0');
  const rows = 'ABCDEFGHIJ'.split('');
  const bookedSeats = ['C10', 'D15', 'E20'];
  const vipSeats = [];

  for (let i = 11; i <= 20; i++) {
    vipSeats.push(`A${i}`, `B${i}`);
  }

  const seats = [];

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

  rows.forEach(row => {
    for (let num = 1; num <= 30; num++) {
      const id = `${row}${num}`;
      const floor = ['H', 'I', 'J'].includes(row) ? '2nd' : '1st';
      const isVIP = vipSeats.includes(id);
      const price = floor === '1st' ? 50000 : 35000;

      seats.push({
        id,
        row,
        num,
        floor,
        isBooked: bookedSeats.includes(id),
        isVIP,
        price
      });
    }
  });

  const handleSelectSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= maxSeats) return;
      const seat = seats.find(s => s.id === seatId);
      if (!seat?.isVIP && !seat?.isBooked) {
        setSelectedSeats(prev => [...prev, seatId]);
      }
    }
  };

  const handleClear = () => setSelectedSeats([]);
  const handleProceed = () => {
    setShowPopup(true);
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, id) => {
      const seat = seats.find(s => s.id === id);
      return seat ? total + seat.price : total;
    }, 0);
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const { nama, email } = form;

  if (!nama || !email) {
    alert('Nama dan Email wajib diisi.');
    return;
  }

  sessionStorage.setItem('biodata', JSON.stringify(form));
  sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  setShowPopup(false);
  navigate('/ticket/payment'); // pakai useNavigate
};

  const renderSeats = (row, floor) => {
    const rowSeats = seats.filter(s => s.row === row && s.floor === floor);
    return (
      <div key={row} style={styles.rowBlock}>
        <div style={styles.rowLabel}>{row}</div>
        <div style={styles.seatRow}>
          {rowSeats.map(seat => {
            const isSelected = selectedSeats.includes(seat.id);
            const isMaxed = selectedSeats.length >= maxSeats;
            const isDisabled = seat.isBooked || seat.isVIP || (!isSelected && isMaxed);
            const isAisle = seat.num === 11 || seat.num === 21;

            return (
              <React.Fragment key={seat.id}>
                {isAisle && <div style={styles.aisle}></div>}
                <button
                  disabled={isDisabled}
                  onClick={() => handleSelectSeat(seat.id)}
                  style={{
                    ...styles.seat,
                    fontWeight: '700',
                    backgroundColor: seat.isBooked
                      ? '#ef4444'
                      : seat.isVIP
                      ? '#facc15'
                      : isSelected
                      ? '#22c55e'
                      : isDarkMode ? '#1e293b' : '#f8fafc',
                    color: seat.isBooked || isSelected || seat.isVIP
                      ? '#fff'
                      : isDarkMode ? '#f8fafc' : '#1f2937',
                    borderColor: seat.isBooked
                      ? '#ef4444'
                      : seat.isVIP
                      ? '#facc15'
                      : isSelected
                      ? '#22c55e'
                      : '#cbd5e1',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled && !seat.isBooked && !seat.isVIP ? 0.4 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isSelected) {
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {seat.id}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFloor = (label, floor) => (
    <div style={styles.floorSection}>
      <h3 style={styles.floorTitle}>{label}</h3>
      <div style={styles.floorLayout}>
        {rows
          .filter(r => seats.find(s => s.row === r && s.floor === floor))
          .map(r => renderSeats(r, floor))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🎭 Pilih Kursi Teater</h2>
        <div style={styles.stage}>STAGE</div>
      </div>

      <div style={styles.legend}>
        <div><span style={{ ...styles.legendBox, background: '#22c55e' }}></span> Terpilih</div>
        <div><span style={{ ...styles.legendBox, background: '#ef4444' }}></span> Terisi</div>
        <div><span style={{ ...styles.legendBox, background: '#facc15' }}></span> VIP</div>
        <div><span style={{ ...styles.legendBox, background: isDarkMode ? '#1e293b' : '#e2e8f0' }}></span> Tersedia</div>
        <div style={{ marginLeft: 'auto', fontWeight: '600' }}>💰 Lantai 1: Rp50rb | Balkon: Rp35rb</div>
      </div>

      {renderFloor('Lantai 1', '1st')}
      {renderFloor('Balkon (Lantai 2)', '2nd')}

      <div style={styles.footer}>
        <h4>🪑 Kursi Terpilih:</h4>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Belum ada'}</p>
        <h4 style={{ marginTop: 10 }}>💵 Total Harga:</h4>
        <p style={{ fontWeight: 700, fontSize: 16 }}>
          Rp{getTotalPrice().toLocaleString('id-ID')}
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

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupCard}>
            <h2 style={styles.popupTitle}>🧾 Isi Biodata Pemesan</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                style={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Aktif"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={styles.input}
                required
              />

              <div style={styles.popupActions}>
                <button type="button" onClick={() => setShowPopup(false)} style={styles.clearBtn}>Batal</button>
                <button type="submit" style={styles.nextBtn}>Kirim</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'Poppins, sans-serif',
    minHeight: '100vh'
  },
  header: { textAlign: 'center', marginBottom: '24px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#facc15' },
  stage: {
    backgroundColor: '#1e293b', color: '#fff', padding: '10px 20px',
    borderRadius: '12px', display: 'inline-block', marginTop: '10px', fontWeight: 'bold'
  },
  h2:{
    
  },
  legend: {
    display: 'flex', alignItems: 'center', gap: '16px',
    justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap'
  },
  legendBox: {
    width: '18px', height: '18px', borderRadius: '4px',
    display: 'inline-block', marginRight: '6px'
  },
  floorSection: { maxWidth: '1200px', margin: '0 auto 48px' },
  floorTitle: { fontSize: '20px', marginBottom: '12px', textAlign: 'center', color: '#facc15' },
  floorLayout: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' },
  rowBlock: { display: 'flex', alignItems: 'center', gap: '10px' },
  rowLabel: { width: '24px', fontWeight: 'bold', textAlign: 'center' },
  seatRow: { display: 'flex', gap: '6px', flexWrap: 'nowrap', flex: '1', overflowX: 'auto' },
  seat: {
    padding: '8px 0', width: '40px', borderRadius: '6px', fontSize: '13px',
    border: '1px solid #ccc', textAlign: 'center'
  },
  aisle: { width: '12px' },
  footer: {
    marginTop: '40px', textAlign: 'center', padding: '24px', borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '700px', marginInline: 'auto'
  },
  actions: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' },
  clearBtn: {
    padding: '10px 24px', backgroundColor: '#ef4444', color: '#fff',
    border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '15px'
  },
  nextBtn: {
    padding: '10px 24px', backgroundColor: '#1e40af', color: '#fff',
    border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '15px'
  },
  popupOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 999
  },

popupCard: {
  backgroundColor: '#1e293b', // dark mode base
  color: '#f8fafc',
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 12px 25px rgba(0,0,0,0.3)',
  width: '100%',
  maxWidth: '460px',
  fontFamily: 'Poppins, sans-serif',
  transition: 'all 0.3s ease',
  border: '1px solid #334155'
},
popupTitle: {
  fontSize: '22px',
  marginBottom: '20px',
  fontWeight: '700',
  textAlign: 'center',
  color: '#facc15'
},
input: {
  padding: '14px',
  borderRadius: '10px',
  fontSize: '16px',
  border: '1px solid #64748b',
  fontFamily: 'inherit',
  backgroundColor: '#0f172a',
  color: '#f8fafc',
  outline: 'none',
  transition: 'border 0.2s ease',
},
popupActions: {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '24px',
  flexDirection: 'row',
  gap: '12px'
}};

export default TicketPage;
