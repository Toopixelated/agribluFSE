import React, { useRef, useEffect } from 'react';
import type { FC, RefObject } from 'react';
import { TECHNOLOGY_STEPS } from '../constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useTheme } from '../contexts/ThemeContext';
import { useSection } from '../contexts/SectionContext';

const Technology: FC = () => {
    const { theme } = useTheme();
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.4, triggerOnce: false, rootMargin: '-80px' });
    const { setVisibleSection } = useSection();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (isVisible) {
            setVisibleSection('technology');
        }
    }, [isVisible, setVisibleSection]);

     useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current as HTMLDivElement;
        if (!canvas || !section) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; radius: number; color: string; speedY: number; }[] = [];

        const initializeParticles = () => {
             if (!canvas) return;
            particles = [];
            const particleCount = 120;
            const colors = theme === 'dark' 
                ? ['rgba(0, 188, 212, 0.7)', 'rgba(255, 255, 255, 0.7)']
                : ['rgba(0, 188, 212, 0.8)', 'rgba(76, 175, 80, 0.8)'];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 1 + Math.random() * 2,
                    color: Math.random() > 0.3 ? colors[0] : colors[1],
                    speedY: 0.2 + Math.random() * 0.5,
                });
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false); ctx.fillStyle = p.color; ctx.fill();
                p.y += p.speedY;
                if (p.y > canvas.height) { p.y = 0 - p.radius; p.x = Math.random() * canvas.width; }
            });

            animationFrameId = window.requestAnimationFrame(draw);
        };

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) { canvas.width = entry.contentRect.width; canvas.height = entry.contentRect.height; initializeParticles(); }
        });
        
        resizeObserver.observe(section);
        draw();

        return () => { window.cancelAnimationFrame(animationFrameId); resizeObserver.disconnect(); };
    }, [sectionRef, theme]);

    return (
        <section id="technology" ref={sectionRef as RefObject<HTMLDivElement>} className="py-20 bg-white dark:bg-agri-dark relative gradient-blend-top from-gray-to-dark">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-70"></canvas>
            <div className="container mx-auto px-6 relative z-10">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white transition-opacity duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    How It Works
                </h2>
                
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8">
                        {TECHNOLOGY_STEPS.map((step, index) => (
                            <div key={index} className={`flex items-start gap-4 transition-all duration-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${index * 200}ms`}}>
                                <div className="w-16 h-16 bg-agri-blue/10 dark:bg-agri-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-transform duration-300 hover:scale-110">
                                    <i className={`${step.icon} text-2xl ${step.icon.includes('tint') ? 'text-agri-blue' : 'text-agri-green'}`}></i>
                                 </div>
                                <div className="text-left">
                                    <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className={`w-full lg:w-1/2 flex justify-center items-center h-96 transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <svg width="300" height="350" viewBox="0 0 160 180" className={`overflow-visible plant-animation-container ${isVisible ? 'is-visible' : ''}`}>
                             <defs>
                                <linearGradient id="plantGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#A5D6A7" />
                                    <stop offset="100%" stopColor="#388E3C" />
                                </linearGradient>
                                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#81C784" />
                                    <stop offset="100%" stopColor="#4CAF50" />
                                </linearGradient>
                            </defs>

                            <rect x="35" y="80" width="90" height="6" className="fill-gray-400 dark:fill-gray-600" rx="2" />

                            {/* Detailed Plant Group */}
                            <g transform="translate(0, -5)">
                                {/* Stem (filled path) */}
                                <path
                                    className="plant-stem"
                                    d="M 78 82 L 82 82 Q 83 60 81 35 L 79 35 Q 77 60 78 82 Z"
                                    fill="url(#plantGradient)"
                                    style={{ transitionDelay: '0.4s' }}
                                />

                                {/* Lower Leaves */}
                                <path
                                    className="leaf"
                                    fill="url(#leafGradient)"
                                    d="M 78 70 C 58 75, 55 55, 72 58 C 70 65, 75 70, 78 70 Z"
                                    style={{ transitionDelay: '0.8s' }}
                                />
                                <path
                                    className="leaf"
                                    fill="url(#leafGradient)"
                                    d="M 82 65 C 102 70, 105 50, 88 53 C 90 60, 85 65, 82 65 Z"
                                    style={{ transitionDelay: '1.0s' }}
                                />

                                {/* Cotyledons (unfurling top leaves with veins) */}
                                <g className="leaf" style={{ transitionDelay: '1.2s' }}>
                                    <path
                                        fill="url(#leafGradient)"
                                        d="M 80 38 C 65 38, 55 22, 70 17 C 76 28, 79 37, 80 38 Z"
                                    />
                                    <path stroke="#388E3C" strokeWidth="0.5" fill="none" d="M 71 18 C 74 25, 78 32, 80 37" />
                                </g>
                                <g className="leaf" style={{ transitionDelay: '1.4s' }}>
                                    <path
                                        fill="url(#leafGradient)"
                                        d="M 80 38 C 95 38, 105 22, 90 17 C 84 28, 81 37, 80 38 Z"
                                    />
                                    <path stroke="#388E3C" strokeWidth="0.5" fill="none" d="M 89 18 C 86 25, 82 32, 80 37" />
                                </g>
                                
                                {/* Tiny "true" leaves */}
                                <path
                                    className="leaf"
                                    fill="#A5D6A7"
                                    d="M 80 25 C 77 25, 76 21, 79 21 C 79.5 23, 80 25, 80 25 Z"
                                    style={{ transitionDelay: '1.7s' }}
                                />
                                <path
                                    className="leaf"
                                    fill="#A5D6A7"
                                    d="M 80 25 C 83 25, 84 21, 81 21 C 80.5 23, 80 25, 80 25 Z"
                                    style={{ transitionDelay: '1.8s' }}
                                />
                            </g>
                            
                            <g className="plant-roots transform translate-y-[86px]">
                                <path id="root-path-1" className="root-path" d="M40,65 C50,35 70,20 80,0" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.0s' }}/>
                                <path id="root-path-2" className="root-path" d="M120,65 C110,35 90,20 80,0" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.0s' }}/>
                                <path id="root-path-3" className="root-path" d="M50,80 C55,45 65,25 75,0" stroke="#4CAF50" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.3s' }}/>
                                <path id="root-path-4" className="root-path" d="M110,80 C105,45 95,25 85,0" stroke="#4CAF50" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.3s' }}/>
                                <path id="root-path-5" className="root-path" d="M60,90 C65,55 75,30 82,0" stroke="#4CAF50" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.6s' }}/>
                                <path id="root-path-6" className="root-path" d="M100,90 C95,55 85,30 78,0" stroke="#4CAF50" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.6s' }}/>
                                <path id="root-path-7" className="root-path" d="M30,75 C40,45 60,20 70,0" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.8s' }}/>
                                <path id="root-path-8" className="root-path" d="M130,75 C120,45 100,20 90,0" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transitionDelay: '2.8s' }}/>
                            </g>

                            <g className="plant-mist transform translate-y-[86px]">
                                <circle r="3" fill="#00BCD4"><animateMotion dur="4s" repeatCount="indefinite" begin="0.2s"><mpath href="#root-path-1" /></animateMotion></circle>
                                <circle r="3" fill="#00BCD4"><animateMotion dur="3.8s" repeatCount="indefinite" begin="0.8s"><mpath href="#root-path-2" /></animateMotion></circle>
                                <circle r="2.5" fill="#00BCD4"><animateMotion dur="4.5s" repeatCount="indefinite" begin="0.4s"><mpath href="#root-path-3" /></animateMotion></circle>
                                <circle r="2.5" fill="#00BCD4"><animateMotion dur="4.2s" repeatCount="indefinite" begin="1s"><mpath href="#root-path-4" /></animateMotion></circle>
                                <circle r="2.5" fill="#00BCD4"><animateMotion dur="5s" repeatCount="indefinite" begin="0.6s"><mpath href="#root-path-5" /></animateMotion></circle>
                                <circle r="2.5" fill="#00BCD4"><animateMotion dur="4.8s" repeatCount="indefinite" begin="1.2s"><mpath href="#root-path-6" /></animateMotion></circle>
                                <circle r="3" fill="#00BCD4"><animateMotion dur="4.3s" repeatCount="indefinite" begin="0.9s"><mpath href="#root-path-7" /></animateMotion></circle>
                                <circle r="3" fill="#00BCD4"><animateMotion dur="4.6s" repeatCount="indefinite" begin="1.5s"><mpath href="#root-path-8" /></animateMotion></circle>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Technology;