import React, { useState } from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectIntro from '../components/ProjectIntro';
import ProjectStats from '../components/ProjectStats';
import Architecture from '../components/Architecture';
import WorkspaceExperience from '../components/WorkspaceExperience';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Location from '../components/Location';
import LocationAdvantage from '../components/LocationAdvantage';
import Developer from '../components/Developer';
import EnquiryForm from '../components/EnquiryForm';
import Footer from '../components/Footer';

const ModernSuites = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div style={{ backgroundColor: '#08080a', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* 01. PRELOADER */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* 02. NAVIGATION */}
      <Navbar />

      {/* Main Presentation Workflow */}
      <main id="main-content">
        {/* 03. HERO */}
        <Hero />

        {/* 04. PROJECT INTRODUCTION */}
        <ProjectIntro />

        {/* 05. PROJECT HIGHLIGHTS / STATS */}
        <ProjectStats />

        {/* 06. ARCHITECTURAL FEATURES */}
        <Architecture />

        {/* 07. WORKSPACE EXPERIENCE */}
        <WorkspaceExperience />

        {/* 08. BUILDING AMENITIES */}
        <Amenities />

        {/* 09. GALLERY */}
        <Gallery />

        {/* 10. LOCATION */}
        <Location />

        {/* 11. LOCATION ADVANTAGE */}
        <LocationAdvantage />

        {/* 12. DEVELOPER / MODERN ESTATES */}
        <Developer />

        {/* 13. ENQUIRE NOW */}
        <EnquiryForm />
      </main>

      {/* 14. FOOTER */}
      <Footer />
    </div>
  );
};

export default ModernSuites;
