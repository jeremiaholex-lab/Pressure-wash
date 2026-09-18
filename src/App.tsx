import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { InstantQuoteBooking } from './components/InstantQuoteBooking';
import { ServicesShowcase } from './components/ServicesShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServiceAreaChecker } from './components/ServiceAreaChecker';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';

function MainApp() {
  const { theme } = useTheme();
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>('house-wash');

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForBooking(serviceId);
    }
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark ' : ''}min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white transition-colors duration-200`}>
      {/* Header with Brand Logo, Theme Switcher & Navigation */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content */}
      <main className="flex-1">
        {/* High-Impact Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Interactive Before & After Visual Slider */}
        <BeforeAfterSlider onSelectService={handleOpenBooking} />

        {/* Streamlined Live Pricing & Online Booking Engine */}
        <InstantQuoteBooking initialServiceId={selectedServiceForBooking} />

        {/* Full Services Showcase Grid */}
        <ServicesShowcase onSelectService={handleOpenBooking} />

        {/* Why Central Florida Chooses Apply The Pressure (Comparison Table) */}
        <WhyChooseUs />

        {/* Interactive Service Area & ZIP Code Checker */}
        <ServiceAreaChecker onOpenBooking={() => handleOpenBooking()} />

        {/* 5.0 Star Reviews & Social Proof */}
        <ReviewsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Mobile-First Sticky Action Bar (Tap to Call + Instant Quote) */}
      <MobileActionBar onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
