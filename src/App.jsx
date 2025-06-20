// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/landingPage/LandingPage';
import TicketPage from './pages/ticket/Ticket';
import BookingFormPage from './pages/ticket/BookingFormPage';
import PaymentPage from './pages/ticket/payment';
import MerchPage from './pages/merch/Merch'; // Buat file ini jika belum
import CastCrewPage from './pages/castandcrew/CastCrewPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/ticket/booking" element={<BookingFormPage />} />
        <Route path="/castandcrew/cast-crew" element={<CastCrewPage />} />
        <Route path="/ticket/payment" element={<PaymentPage />} />
        <Route path="/merch" element={<MerchPage />} />
      </Routes>
    </Router>
  );
}
