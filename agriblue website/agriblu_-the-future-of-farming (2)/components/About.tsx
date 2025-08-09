import React, { useState, useEffect, useRef } from 'react';
import type { FC, RefObject } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useTheme } from '../contexts/ThemeContext';
import { useSection } from '../contexts/SectionContext';

const Why: FC = () => {
    const { theme } = useTheme();
    const [energyState, setEnergyState] = useState<'before' | 'after'>('before');
    const [showSavingsBox, setShowSavingsBox] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.4, triggerOnce: false, rootMargin: '-80px' });
    const { setVisibleSection } = useSection();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        if (isVisible) {
            setVisibleSection('why');
        }
    }, [isVisible, setVisibleSection]);

    useEffect(() => {
        if (isVisible && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => {
                setEnergyState('after');
            }, 500);

             setTimeout(() => {
                setShowSavingsBox(true);
            }, 1500);
        }
    }, [isVisible, hasAnimated]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        interface StreakParticle { x: number; y: number; speed: number; length: number; opacity: number; color: string; }
        interface DotParticle { x: number; y: number; speed: number; radius: number; opacity: number; color: string; initialY: number; angle: number; }

        let streaks: StreakParticle[] = [];
        let dots: DotParticle[] = [];

        const initializeParticles = () => {
            if (!canvas) return;
            streaks = [];
            dots = [];
            const streakCount = 75;
            const dotCount = 100;
            const streakColors = theme === 'dark' 
                ? ['rgba(34, 197, 94, 1)', 'rgba(0, 188, 212, 1)']
                : ['rgba(34, 197, 94, 0.9)', 'rgba(0, 188, 212, 0.9)'];
            const dotColors = theme === 'dark'
                ? ['rgba(34, 197, 94, 0.9)', 'rgba(0, 188, 212, 0.9)']
                : ['rgba(34, 197, 94, 0.8)', 'rgba(0, 188, 212, 0.8)'];

            for (let i = 0; i < streakCount; i++) {
                streaks.push({
                    x: Math.random() * canvas.width, y: Math.random() * canvas.height, speed: 0.5 + Math.random() * 1.5,
                    length: 15 + Math.random() * 25, opacity: 0.5 + Math.random() * 0.4, color: Math.random() > 0.4 ? streakColors[0] : streakColors[1],
                });
            }
            
            for (let i = 0; i < dotCount; i++) {
                const y = Math.random() * canvas.height;
                dots.push({
                    x: Math.random() * canvas.width, y: y, initialY: y, angle: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.8,
                    radius: 0.5 + Math.random() * 1.5, opacity: 0.5 + Math.random() * 0.4, color: Math.random() > 0.4 ? dotColors[0] : dotColors[1],
                });
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            const bgColor = theme === 'dark' ? 'rgba(17, 24, 39, 0.1)' : 'rgba(209, 213, 219, 0.1)';
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            streaks.forEach(p => {
                p.x += p.speed;
                if (p.x > canvas.width) { p.x = 0; p.y = Math.random() * canvas.height; }
                const gradient = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
                const baseColor = p.color.substring(p.color.indexOf('(') + 1, p.color.lastIndexOf(','));
                gradient.addColorStop(0, `rgba(${baseColor}, 0)`);
                gradient.addColorStop(1, `rgba(${baseColor}, ${p.opacity})`);
                ctx.strokeStyle = gradient; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(p.x - p.length, p.y); ctx.lineTo(p.x, p.y); ctx.stroke();
            });
            
            dots.forEach(p => {
                p.angle += 0.02; p.x += p.speed; p.y = p.initialY + Math.sin(p.angle + p.x / 50) * 20;
                if (p.x > canvas.width) { p.x = 0; p.y = Math.random() * canvas.height; p.initialY = p.y; }
                const baseColor = p.color.substring(p.color.indexOf('(') + 1, p.color.lastIndexOf(','));
                ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false); ctx.fill();
            });

            animationFrameId = window.requestAnimationFrame(draw);
        };
        
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                canvas.width = entry.contentRect.width; canvas.height = entry.contentRect.height; initializeParticles();
            }
        });
        resizeObserver.observe(section);
        draw();
        return () => { window.cancelAnimationFrame(animationFrameId); resizeObserver.disconnect(); };
    }, [theme, sectionRef]);

    const energyMeterWidth = energyState === 'before' ? '100%' : '50%';
    const energyMeterBg = energyState === 'before' ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #22c55e, #16a34a)';

    return (
        <section id="why" ref={sectionRef as RefObject<HTMLDivElement>} className="py-20 bg-gray-300 dark:bg-gray-900 relative gradient-blend-top from-dark-to-gray">
             <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-40"></canvas>
            <div className="container mx-auto px-6 relative z-10">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white transition-opacity duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    The Why: Vertical Farming's Energy Problem
                </h2>
                
                <div className="max-w-4xl mx-auto">
                    <div className={`bg-white dark:bg-agri-dark rounded-xl p-8 border-l-4 border-agri-green shadow-lg transition-all duration-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
                        <p className="font-body text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                            Indoor and vertical farming have struggled financially over the past two years, primarily because of high energy costs. These expenses make it difficult for farms to become profitable.
                        </p>
                        <p className="font-body text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            Having been involved in the indoor growing industry since its commercial beginnings in 2014, we've developed a unique approach that slashes energy consumption by up to 50%. Our solution addresses the core issue preventing many of these operations from succeeding.
                        </p>
                    </div>
                    
                    <div className={`mt-12 bg-white dark:bg-agri-dark rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-opacity duration-1000 delay-500 relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <h3 className="font-heading text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                            Energy Consumption Reduction
                        </h3>
                        
                        <div className="flex justify-between items-center mb-4 text-gray-500 dark:text-gray-400">
                            <span className="text-lg font-semibold">After AgriBlu</span>
                            <span className="text-lg font-semibold">Before AgriBlu</span>
                        </div>
                        
                        <div className="relative h-12 bg-gray-400 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div style={{ width: energyMeterWidth, background: energyMeterBg }} className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-in-out"></div>
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <span className={`text-white font-bold text-lg z-10 transition-opacity duration-500 ${energyState === 'after' ? 'opacity-100' : 'opacity-0'}`}>50%</span>
                                <span className={`text-white font-bold text-lg z-10 transition-opacity duration-500 ${energyState === 'before' ? 'opacity-100' : 'opacity-0'}`}>100%</span>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center items-start gap-12 md:gap-16">
                            <button
                                onClick={() => setEnergyState('before')}
                                className={`w-32 h-32 flex flex-col items-center justify-center pt-4 rounded-full transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 ${energyState === 'before' ? 'bg-red-500 text-white shadow-lg scale-105 focus:ring-red-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-500/10 dark:hover:bg-red-900/50 hover:text-red-500 dark:hover:text-white focus:ring-gray-400'}`}
                                aria-pressed={energyState === 'before'}
                            >
                                <i className="fas fa-bolt text-4xl"></i>
                                <div className="w-full h-10 mt-1 pointer-events-none">
                                    <svg viewBox="0 0 100 30" className="w-full h-full">
                                        <path id="curveBefore" d="M 10,20 C 30,5 70,5 90,20" fill="transparent"/>
                                        <text className="text-sm font-medium fill-current" >
                                            <textPath href="#curveBefore" startOffset="50%" textAnchor="middle">Traditional</textPath>
                                        </text>
                                    </svg>
                                </div>
                            </button>
                            
                            <button
                                onClick={() => setEnergyState('after')}
                                className={`w-32 h-32 flex flex-col items-center justify-center pt-4 rounded-full transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 ${energyState === 'after' ? 'bg-agri-green text-white shadow-lg scale-105 focus:ring-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-green-500/10 dark:hover:bg-green-900/50 hover:text-green-500 dark:hover:text-white focus:ring-gray-400'}`}
                                aria-pressed={energyState === 'after'}
                            >
                                <i className="fas fa-leaf text-4xl"></i>
                                <div className="w-full h-10 mt-1 pointer-events-none">
                                    <svg viewBox="0 0 100 30" className="w-full h-full">
                                        <path id="curveAfter" d="M 10,20 C 30,5 70,5 90,20" fill="transparent"/>
                                        <text className="text-sm font-medium fill-current">
                                            <textPath href="#curveAfter" startOffset="50%" textAnchor="middle">AgriBlu</textPath>
                                        </text>
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {showSavingsBox && (
                             <div className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 bg-gradient-to-br from-green-400 to-agri-green text-white p-4 rounded-lg shadow-2xl animate-pop-in-tilt">
                                <span className="block font-heading text-4xl font-bold">50%</span>
                                <span className="block font-body text-md">Energy Savings</span>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Why;