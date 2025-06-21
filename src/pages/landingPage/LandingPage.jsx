// src/pages/LandingPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('dark');
    startCountdown();
  }, []);

  const showTime = new Date('2025-07-16T19:00:00');

  const startCountdown = () => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = showTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('Showtime has started!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
  };

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

  return (
    <main className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">🎭 Whispers</h1>
        <p className="landing-subtitle">COMM28-8SP & COMM28-16SP Present</p>

        <section className="card info-card">
          <h2 className="section-title">📅 Show Information</h2>
          <div className="info-box-grid">
            <div className="info-box"><span className="info-icon">📆</span><p className="info-label">Date</p><p className="info-value">{showInfo.date}</p></div>
            <div className="info-box"><span className="info-icon">⏰</span><p className="info-label">Time</p><p className="info-value">{showInfo.time}</p></div>
            <div className="info-box"><span className="info-icon">📍</span><p className="info-label">Venue</p><p className="info-value">{showInfo.venue}</p></div>
            <div className="info-box"><span className="info-icon">⏳</span><p className="info-label">Countdown</p><p className="info-value">{timeLeft}</p></div>
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">📖 Synopsis</h2>
          <h6 className="section-text">
            Bey, a teenager who is trapped in loneliness and ostracized at school, she must
struggle alone without the support or love from her parents.
This situation draws the attraction of a malevolent spirit who wants to ruin Bey’s life
even further.
However, Bey is protected by the spirit that guards her house. Will Bey
be able to endure and accept the reality, or will she collapse under the burden of
everything she’s facing?
          </h6>
        </section>

        <section className="card">
          <h2 className="section-title">🎫 Get Your Seats Now!</h2>
          <p className="section-text">
            Don’t miss the most anticipated performance of the year. Book your tickets before they run out! Bring your friends and be part of the story...
          </p>
          <div className="button-group">
            <button className="cta-button primary" onClick={() => setShowPopup(true)}>🎟️ Book Tickets</button>
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">✨ Meet The Team</h2>
          <p className="section-text">Curious who's behind the story and performance?</p>
          <Link to="/cast-crew">
            <button className="cta-button primary">👥 View Cast & Crew</button>
          </Link>
        </section>

        <a
          href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20pesan%20tiket%20Whispers"
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 Contact via WhatsApp
        </a>

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

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2 className="popup-title">🎟️ Masukkan Jumlah Kursi</h2>
            <form onSubmit={handlePopupSubmit} className="popup-form">
              <input type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="popup-input" placeholder="Jumlah kursi" required />
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
