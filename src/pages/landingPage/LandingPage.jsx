import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(quantity);
    if (!count || count < 1 || count > 10) {
      alert('Masukkan jumlah kursi antara 1–10.');
      return;
    }
    sessionStorage.setItem('maxSeats', count);
    setShowPopup(false);
    navigate('/ticket');
  };

  const showInfo = {
    date: 'July 16, 2025',
    time: '7:00 PM',
    venue: 'Amani Palladium Theater',
  };

  const cast = [
    { name: 'Michelle Audreliya', role: 'Clara (Tokoh utama)', photo: '/images/cast/michelle.jpg' },
    { name: 'Rindu Nathania', role: 'Livia (Sahabat Clara)', photo: '/images/cast/rindu.jpg' },
    { name: 'Elifa Bariza', role: 'Ny. Laras (Guru teater)', photo: '/images/cast/elifa.jpg' },
    { name: 'Choirunissa', role: 'Anita (Pesaing)', photo: '/images/cast/choirunissa.jpg' },
    { name: 'Rayhan Hadi Prasetya', role: 'Adrian (Penulis naskah)', photo: '/images/cast/rayhan.jpg' },
  ];

  const academicTeam = [
    { name: 'Nadia Puspita', role: 'Director', photo: '/images/crew/nadia.jpg' },
    { name: 'Dr. Ratna Sari', role: 'Dosen Pembimbing', photo: '/images/dosen/ratna.jpg' },
    { name: 'Yusuf Ramadhan', role: 'Asisten Dosen', photo: '/images/dosen/yusuf.jpg' },
  ];

  const crew = [
    { name: 'Nadia Puspita', role: 'Sutradara', photo: '/images/crew/nadia.jpg' },
    { name: 'Dimas Arya', role: 'Penata Artistik', photo: '/images/crew/dimas.jpg' },
    { name: 'Fathia Salsabila', role: 'Koreografer', photo: '/images/crew/fathia.jpg' },
    { name: 'Bima Kusuma', role: 'Penata Musik', photo: '/images/crew/bima.jpg' },
    { name: 'Siti Kamila', role: 'Manajer Produksi', photo: '/images/crew/kamila.jpg' },
  ];

  const renderSection = (title, members) => (
    <section className="card">
      <h2 className="section-title">{title}</h2>
      <div className="cast-grid centered">
        {members.map((person, index) => (
          <div key={index} className="cast-card">
            <div className="cast-photo-wrapper">
              <img src={person.photo} alt={person.name} className="cast-photo" />
            </div>
            <div className="cast-details">
              <p className="cast-name">{person.name}</p>
              <p className="cast-role">{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <main className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">
          🎭 Welcome to <span className="highlight">Whispers</span>
        </h1>
        <p className="landing-subtitle">
          Sebuah pertunjukan teater yang menyentuh batas mimpi dan kenyataan.
        </p>

        {/* Synopsis */}
        <section className="card">
          <h2 className="section-title">📖 Synopsis</h2>
          <p className="section-text">
            “Whispers” adalah kisah yang menggambarkan pergolakan batin antara mimpi dan kenyataan,
            di tengah dunia teater klasik yang mulai dilupakan.
          </p>
        </section>

        {/* Show Info */}
        <div className="info-grid">
          <div className="card info-card">
            <h2 className="section-title">🗓️ Show Info</h2>
            <ul className="info-list">
              <li><strong>Date:</strong> {showInfo.date}</li>
              <li><strong>Time:</strong> {showInfo.time}</li>
              <li><strong>Venue:</strong> {showInfo.venue}</li>
            </ul>
          </div>
        </div>

        {/* Cast */}
        {renderSection('🎭 Cast', cast)}

        {/* Crew & Academic Team (academicTeam shown first) */}
        {renderSection('🎬 Crew & Academic Team', [...academicTeam, ...crew])}

        {/* CTA Buttons */}
        <div className="button-group">
          <button className="cta-button primary" onClick={() => setShowPopup(true)}>
            🎟️ Get Tickets
          </button>
          <Link to="/merch">
            <button className="cta-button secondary">🛍️ Visit Merch</button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 Whispers Theater. All rights reserved.</p>
            <div className="contact-info">
              <h4>📞 Contact Person</h4>
              <p><strong>Michelle A.</strong> – +62 812-3456-7890</p>
              <p><strong>Rayhan P.</strong> – +62 811-2233-4455</p>
              <p>Email: whispers@teaterindie.id</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2 className="popup-title">🎟️ Masukkan Jumlah Kursi</h2>
            <p className="popup-subtitle">Maksimal 10 kursi per pemesanan</p>
            <form onSubmit={handlePopupSubmit} className="popup-form">
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="popup-input"
                placeholder="Jumlah kursi"
                required
              />
              <div className="popup-actions">
                <button type="button" className="popup-cancel" onClick={() => setShowPopup(false)}>Batal</button>
                <button type="submit" className="popup-submit">Lanjut</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default LandingPage;
