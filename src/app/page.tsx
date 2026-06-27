'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import Hero from '@/components/Hero';
import GalleryGrid from '@/components/GalleryGrid';
import AboutMe from '@/components/AboutMe';
import Testimonials from '@/components/Testimonials';
import Commissions from '@/components/Commissions';
import CreativeProcess from '@/components/CreativeProcess';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main className="flex-grow pt-[64px]"> {/* Pad top by default navbar height */}
        <Hero />
        <GalleryGrid />
        <AboutMe />
        <Testimonials />
        <Commissions />
        <CreativeProcess />
        <ContactForm />
      </main>
      <Footer />
    </PageTransition>
  );
}
