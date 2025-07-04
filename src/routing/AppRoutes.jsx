import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/landingPage/LandingPage';
import Ticket from '../pages/ticket/Ticket';
import PaymentPage from '../pages/ticket/payment';
import CastCrewPage from '../pages/castandcrew/CastCrewPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/ticket/payment" element={<PaymentPage />} />
        <Route path="/cast-crew" element={<CastCrewPage />} /> {/* ✅ updated path */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
