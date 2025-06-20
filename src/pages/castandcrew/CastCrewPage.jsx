import React from 'react';
import { Link } from 'react-router-dom';
import '../landingPage/LandingPage.css';

const leaders = [
  { name: 'Dahayu Aramita (Rara)', role: 'Director', photo: '/images/crew/lina.jpg' },
  { name: 'Ms. Karina', role: 'Dosen Pembimbing', photo: '/images/crew/yusuf.jpg' },
  { name: 'Nabila Azzahra', role: 'Asisten Dosen', photo: '/images/crew/nabila.jpg' },
];

const cast = [
  { name: 'Michelle Audreliya', role: 'Clara (Tokoh utama)', photo: '/images/cast/michelle.jpg' },
  { name: 'Rindu Nathania', role: 'Livia (Sahabat Clara)', photo: '/images/cast/rindu.jpg' },
  { name: 'Elifa Bariza', role: 'Ny. Laras (Guru teater)', photo: '/images/cast/elifa.jpg' },
  { name: 'Choirunissa', role: 'Anita (Pesaing)', photo: '/images/cast/choirunissa.jpg' },
  { name: 'Rayhan Hadi Prasetya', role: 'Adrian (Penulis naskah)', photo: '/images/cast/rayhan.jpg' },
];

const crew = [
  { name: 'Nadia Puspita', role: 'Sutradara', photo: '/images/crew/nadia.jpg' },
  { name: 'Dimas Arya', role: 'Penata Artistik', photo: '/images/crew/dimas.jpg' },
  { name: 'Fathia Salsabila', role: 'Koreografer', photo: '/images/crew/fathia.jpg' },
  { name: 'Bima Kusuma', role: 'Penata Musik', photo: '/images/crew/bima.jpg' },
  { name: 'Siti Kamila', role: 'Manajer Produksi', photo: '/images/crew/kamila.jpg' },
];

function CastCrewPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">🎬 Cast & Crew</h1>
        <p className="landing-subtitle">
          Temui tim hebat di balik panggung <span className="highlight">Whispers</span>
        </p>

        {/* Leadership */}
        <section className="card">
          <h2 className="section-title">👑 Leadership</h2>
          <div className="cast-grid">
            {leaders.map((p, i) => (
              <div key={i} className="cast-card">
                <img src={p.photo} alt={p.name} className="cast-photo" />
                <div className="cast-details">
                  <p className="cast-name">{p.name}</p>
                  <p className="cast-role">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cast */}
        <section className="card">
          <h2 className="section-title">🎭 Cast</h2>
          <div className="cast-grid">
            {cast.map((p, i) => (
              <div key={i} className="cast-card">
                <img src={p.photo} alt={p.name} className="cast-photo" />
                <div className="cast-details">
                  <p className="cast-name">{p.name}</p>
                  <p className="cast-role">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crew */}
        <section className="card">
          <h2 className="section-title">👥 Crew</h2>
          <div className="cast-grid">
            {crew.map((p, i) => (
              <div key={i} className="cast-card">
                <img src={p.photo} alt={p.name} className="cast-photo" />
                <div className="cast-details">
                  <p className="cast-name">{p.name}</p>
                  <p className="cast-role">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="button-group">
          <Link to="/" className="cta-button secondary">🏠 Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  );
}

export default CastCrewPage;
