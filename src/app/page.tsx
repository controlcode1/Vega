import React from 'react';
import Navbar from '@/components/Navbar';
import CoffeeHero from '@/components/sections/CoffeeHero';
import CoffeeMenuSection from '@/components/sections/CoffeeMenuSection';
import CoffeeAboutSection from '@/components/sections/CoffeeAboutSection';
import CoffeeContactSection from '@/components/sections/CoffeeContactSection';
import ScrollVideoBackground from '@/components/ScrollVideoBackground';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Scroll-Triggered Video Frame Canvas Background */}
      <ScrollVideoBackground />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Sections */}
      <CoffeeHero />
      <CoffeeMenuSection />
      <CoffeeAboutSection />
      <CoffeeContactSection />

      {/* Premium Footer */}
      <Footer />
    </>
  );
}
