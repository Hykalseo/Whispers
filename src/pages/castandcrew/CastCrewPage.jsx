// src/pages/castandcrew/CastCrewPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../landingPage/LandingPage.css';

const leaders = [
  { name: 'Dahayu Araminta Syakirah Hidayah (Rara)', role: 'Director', photo: '/images/crew/rara.jpg' },
  { name: 'Ms. Karina', role: 'Dosen Pembimbing', photo: '/images/crew/yusuf.jpg' },
  { name: 'Nabila Azzahra', role: 'Asisten Dosen', photo: '/images/crew/nabila.jpg' },
];

const cast = [
  { name: 'Michelle Audreliya', role: 'Bey', photo: '/images/cast/michelle.jpg' },
  { name: 'Marvella Anatero', role: 'Lily', photo: '/images/cast/vella.jpg' },
  { name: 'Chairunisa Nursyabaniya', role: 'Luzy', photo: '/images/cast/elifa.jpg' },
  { name: 'Fellisca Anggelina Keshia', role: 'Nia', photo: '/images/cast/choirunissa.jpg' },
  { name: 'Naura Azka Ghefyra', role: 'Gina', photo: '/images/cast/nao.jpg' },
  { name: 'Rindu Nathania', role: 'Kelly', photo: '/images/cast/rindu.jpg' },
  { name: 'Elifa Baryza Sou', role: 'Mrs. Wijaya / Mama', photo: '/images/cast/elifa.jpg' },
  { name: 'Rayhan Hadiprasetya', role: 'Mr. Wijaya / Papa', photo: '/images/cast/rayhan.jpg' },
];

const crewGroups = {
  'Production Manager': ['Siti Leila Wardhani'],
  'Asst Production Manager': ['Qiminori'],
  'Administrator': ['Chelsea Christmas Indika','Olin Algo'],
  'Stage Manager': ['Mickaell Pheng','Afina Safara'],
  'Stage Crew': ['Afina Safara','Daffa Arfio Sahara','Mickaell Pheng','Muhammad Atka Athar Putra Jamaisa','Rindu Nathania'],
  'Script Writer': ['Elifa Baryza Sou','Rafli Hermawan'],
  'Social Media': ['Aghniya Syahira','Denaya Lydia','Naura Azka Ghefyra','Utrujah Dewi Candrawati'],
  'Multimedia': ['Arishia Lie','Dahayu Araminta Syakirah Hidayah','Marvella Anatero','Rafli Hermawan'],
  'Sound Designer': ['Cornelius Victor','Vincent Roy Gunawan','Michelle Audreyla'],
  'Lighting Designer': ['Muhammad Haykal Hanif'],
  'Marketing and Publicity': ['Arishia Lie','Prischilla Seferin','Henry Patrick Tjahjono'],
  'Sponsorship': ['Jesslyn Josephine Feodora','Mezzaluna Keysha Sie','Muh Alwan Naufal Subhan','Nur Syafiqah','Fitria Raihan'],
  'FOH Manager': ['Casey Azalia Abigael'],
  'Ticketing': ['Jesslyn Josephine Feodora','Chelsea Christmas Indika','Mezzaluna Keysha Sie'],
  'Property Team': ['Daffa Arfio Sahara','Elifa Baryza Sou','Nazwa Aulia Imsas Firdaus','Syakira Thifaliaputri Kurnia'],
  'Makeup & Costume': ['Fellisca Anggelina Keshia','Chairunisa Nursyabaniya','Nazwa Aulia Imsas Firdaus','Sarah Nisrina Sirin','Rafeyfa Nayla Azharyah'],
  'Choreographer': ['Chairunisa Nursyabaniya','Sarah Nisrina Sirin'],
};

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

        {/* Crew Groups */}
        {Object.entries(crewGroups).map(([groupName, names], gi) => (
          <section className="card" key={gi}>
            <h2 className="section-title">🧩 {groupName}</h2>
            <div className="cast-grid">
              {names.map((name, idx) => (
                <div key={idx} className="cast-card">
                  <img src="/images/crew/kamila.jpg" alt={name} className="cast-photo" />
                  <div className="cast-details">
                    <p className="cast-name">{name}</p>
                    <p className="cast-role">{groupName}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="button-group">
          <Link to="/" className="cta-button secondary">🏠 Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  );
}

export default CastCrewPage;
