import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AboutMe from '@/components/AboutMe';

function App() {
    return (
        <>
            <Header/>
            <Hero/>
            <AboutMe/>
            <Gallery/>
            <ContactForm/>
            <Footer/>
        </>
    );
}

export default App
