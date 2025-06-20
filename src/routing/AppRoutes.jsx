import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/landingPage/LandingPage';
import Merch from '../pages/merch/Merch';
import Ticket from '../pages/ticket/Ticket';
import BookingFormPage from '../pages/ticket/BookingFormPage';
import PaymentPage from '../pages/ticket/payment';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/ticket/booking" element={<BookingFormPage />} />
        <Route path="/ticket/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
    
  );
}


export default AppRoutes;

