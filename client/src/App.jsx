import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModernSuites from './pages/ModernSuites';
import ThankYou from './pages/ThankYou';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ModernSuites />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<ModernSuites />} />
    </Routes>
  );
}

export default App;
