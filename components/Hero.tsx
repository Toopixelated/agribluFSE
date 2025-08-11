import React, { useRef, useEffect, MouseEvent } from 'react';
import type { FC, RefObject } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useSection } from '../contexts/SectionContext';

const Hero: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const { setVisibleSection } = useSection();
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: false });

    useEffect(() => {
        if (isVisible) {
            setVisibleSection('home');
        }
    }, [isVisible, setVisibleSection]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lines: {
            x: number;
            y: number;
            length: number;
            width: number;
            speed: number;
            color: string;
        }[] = [];

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
            lines = []; 
            initializeLines();
        };

        const initializeLines = () => {
            if (!canvas) return;
            const lineCount = 150;
            const colors = theme === 'dark' 
                ? ['rgba(76, 175, 80, 0.7)', 'rgba(0, 188, 212, 0.7)']
                : ['rgba(76, 175, 80, 0.6)', 'rgba(0, 188, 212, 0.6)'];

            for (let i = 0; i < lineCount; i++) {
                const direction = Math.random() > 0.5 ? 1 : -1;
                lines.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    length: 30 + Math.random() * 80,
                    width: 1 + Math.random() * 2,
                    speed: (0.2 + Math.random() * 0.3) * direction,
                    color: Math.random() > 0.5 ? colors[0] : colors[1],
                });
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lines.forEach(line => {
                ctx.beginPath();
                ctx.lineWidth = line.width;
                ctx.strokeStyle = line.color;
                
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x, line.y - line.length);
                ctx.stroke();

                line.x += line.speed;

                if (line.speed > 0 && line.x > canvas.width + 50) {
                    line.x = -50;
                    line.y = Math.random() * canvas.height;
                } else if (line.speed < 0 && line.x < -50) {
                    line.x = canvas.width + 50;
                    line.y = Math.random() * canvas.height;
                }
            });

            animationFrameId = window.requestAnimationFrame(draw);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        draw();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [theme]);


    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="home" ref={sectionRef as RefObject<HTMLDivElement>} className="relative min-h-screen flex items-center justify-center pt-16">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none"></canvas>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-gray-900 dark:text-white">
                    AgriBlu: "Growing for you"
                </h1>
                <p className="font-body text-lg md:text-xl max-w-3xl mx-auto mb-4 text-gray-600 dark:text-gray-300 animate-fade-in" style={{animationDelay: '0.3s'}}>
                    The future of indoor CEA farming is here!
                </p>
                <p className="font-body text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-600 dark:text-gray-300 animate-fade-in" style={{animationDelay: '0.5s'}}>
                    Indoor farming rebooted with unparalleled levels of efficiency.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in" style={{animationDelay: '0.7s'}}>
                    <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105">
                        Get Started
                    </a>
                    <a href="#technology" onClick={(e) => handleLinkClick(e, '#technology')} className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105">
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;