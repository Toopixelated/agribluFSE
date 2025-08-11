import React, { useState, useEffect, useRef, FormEvent } from 'react';
import type { FC, RefObject } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useSection } from '../contexts/SectionContext';

const Contact: FC = () => {
    const { theme } = useTheme();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { setVisibleSection } = useSection();
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: false });
    const formRef = useRef<HTMLFormElement>(null);
    const formWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            setVisibleSection('contact');
        }
    }, [isVisible, setVisibleSection]);

     useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lines: { x: number; y: number; height: number; targetHeight: number; speed: number; width: number; }[] = [];
        
        const initializeLines = () => {
            if (!canvas) return;
            lines = [];
            const lineCount = 120;
            for (let i = 0; i < lineCount; i++) {
                lines.push({
                    x: Math.random() * canvas.width, y: canvas.height + Math.random() * 50, height: 0,
                    targetHeight: 50 + Math.random() * 100, speed: 0.3 + Math.random() * 0.4, width: 1 + Math.random() * 1.5,
                });
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = theme === 'dark' ? 'rgba(76, 175, 80, 0.7)' : 'rgba(76, 175, 80, 0.6)';
            lines.forEach(line => {
                if (line.height < line.targetHeight) { line.height += line.speed; }
                line.y -= line.speed * 0.5;
                
                if (line.y + line.height < 0) {
                    line.y = canvas.height + Math.random() * 50; line.height = 0; line.x = Math.random() * canvas.width;
                }

                ctx.lineWidth = line.width; ctx.beginPath(); ctx.moveTo(line.x, line.y); ctx.lineTo(line.x, line.y - line.height); ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) { canvas.width = entry.contentRect.width; canvas.height = entry.contentRect.height; initializeLines(); }
        });
        
        if (section) {
          resizeObserver.observe(section);
        }
        draw();
        return () => { window.cancelAnimationFrame(animationFrameId); if (section) { resizeObserver.unobserve(section) }};
    }, [theme, sectionRef]);

    useEffect(() => {
        if (status === 'success' && formWrapperRef.current) {
            const headerOffset = 120; // 80px for fixed header + 40px for spacing
            const elementPosition = formWrapperRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, [status]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage(null); // Reset error on new submission

        const form = e.currentTarget;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());

        try {
            // Endpoint from Formspree, configured to forward to the new address
            const response = await fetch('https://formspree.io/f/xnnzorpd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formJSON)
            });

            if (response.ok) {
                setStatus('success');
                formRef.current?.reset();
                setTimeout(() => setStatus('idle'), 5000); // Reset form after 5 seconds
            } else {
                // Handle server-side validation errors from Formspree
                const errorData = await response.json();
                if (errorData && errorData.errors) {
                    const specificError = errorData.errors.map((error: { field: string, message: string }) => `${error.message}`).join(' ');
                    setErrorMessage(specificError || 'An unexpected error occurred on the server.');
                } else {
                    setErrorMessage('Something went wrong. Please try again.');
                }
                setStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setErrorMessage('A network error occurred. Please check your connection.');
            setStatus('error');
        }
    };

  return (
    <section id="contact" ref={sectionRef as RefObject<HTMLDivElement>} className="py-20 bg-white dark:bg-agri-dark relative gradient-blend-top from-gray-to-dark">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-50"></canvas>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Grow With Us</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Get in touch to learn how AgriBlu can transform your agricultural operations.
          </p>
          
          <div ref={formWrapperRef} className="bg-gray-100 dark:bg-gray-900 rounded-xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-800">
            {status === 'success' ? (
              <div className="text-center animate-fade-in">
                <div className="inline-flex items-center px-4 py-2 bg-agri-green/10 dark:bg-agri-green/20 text-agri-green rounded-lg">
                  <i className="fas fa-check-circle mr-2"></i>
                  <span>Thank you for your inquiry! We'll be in touch soon.</span>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Company Name</label>
                    <input type="text" id="companyName" name="companyName" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                  <input type="email" id="email" name="email" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                  <textarea id="message" name="message" rows={4} required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"></textarea>
                </div>
                
                <div className="text-center">
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="bg-agri-green hover:bg-green-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed w-48"
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </div>

                {status === 'error' && (
                    <p className="text-center text-red-500 mt-4">
                        {errorMessage}
                    </p>
                )}
              </form>
            )}
          </div>

          <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-6">
              <a 
                  href="https://wa.me/447557785640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                  <i className="fab fa-whatsapp text-xl mr-3"></i>
                  Chat on WhatsApp
              </a>
              <a
                  href="https://t.me/+447557785640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                  <i className="fab fa-telegram text-xl mr-3"></i>
                  Chat on Telegram
              </a>
              <a 
                  href="mailto:mark@agriblu.co.uk"
                  className="inline-flex items-center justify-center bg-agri-blue hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                  <i className="fas fa-envelope text-xl mr-3"></i>
                  Email Us
              </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;