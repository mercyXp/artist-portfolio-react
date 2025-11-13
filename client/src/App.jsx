import React from 'react';
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AboutMe from '@/components/AboutMe';
import Commissions from '@/components/Commissions';
import Testimonials from './components/Testimonials';   
import CreativeProcess from './components/CreativeProcess';

function App() {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <Header/>
                <Hero/>
                <AboutMe/>
                <Gallery/>
                <Testimonials/>
                <Commissions/>
                <CreativeProcess/>
                <ContactForm/>
                <Footer/>
            </motion.div>
        </>
    );
}

export default App
