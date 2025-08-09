import React from 'react';
import type { FC } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Why from './components/About';
import Technology from './components/Features';
import Benefits from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

const App: FC = () => {
  return (
    <div className="font-body relative bg-white dark:bg-agri-dark text-gray-800 dark:text-gray-200">
      <Header />
      <main>
        <Hero />
        <Why />
        <Technology />
        <Benefits />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default App;