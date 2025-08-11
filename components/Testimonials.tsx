import React, { useRef, useEffect } from 'react';
import type { FC, RefObject } from 'react';
import { BENEFITS } from '../constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useTheme } from '../contexts/ThemeContext';
import { useSection } from '../contexts/SectionContext';

const Benefits: FC = () => {
    const { theme } = useTheme();
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: false, rootMargin: '-80px' });
    const { setVisibleSection } = useSection();
    const canvasRef = useRef<HTMLCanvasElement>(null);

     useEffect(() => {
        if (isVisible) {
            setVisibleSection('benefits');
        }
    }, [isVisible, setVisibleSection]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current as HTMLDivElement;
        if (!canvas || !section) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: { x: number; y: number; vx: number; vy: number; radius: number; }[] = [];
        
        const initializeNodes = () => {
            if (!canvas) return;
            nodes = [];
            const nodeCount = 80;
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
                    radius: 1.5,
                });
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const lineColor = theme === 'dark' ? 'rgba(76, 175, 80, 0.6)' : 'rgba(76, 175, 80, 0.8)';
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);
                    if (dist < 100) {
                        ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
                    }
                }
            }

            const nodeColor = theme === 'dark' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(76, 175, 80, 1.0)';
            ctx.fillStyle = nodeColor;
            nodes.forEach(node => {
                ctx.beginPath(); ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2); ctx.fill();
                node.x += node.vx; node.y += node.vy;
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) { canvas.width = entry.contentRect.width; canvas.height = entry.contentRect.height; initializeNodes(); }
        });
        
        resizeObserver.observe(section);
        draw();
        return () => { window.cancelAnimationFrame(animationFrameId); resizeObserver.disconnect(); };
    }, [sectionRef, theme]);

    return (
        <section id="benefits" ref={sectionRef as RefObject<HTMLDivElement>} className="py-20 bg-gray-300 dark:bg-gray-900 relative gradient-blend-top from-dark-to-gray">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-90 dark:opacity-70"></canvas>
            <div className="container mx-auto px-6 relative z-10">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white transition-opacity duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    Benefits Of AgriBlu
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BENEFITS.map((benefit, index) => (
                        <div key={index} className={`bg-gray-50 dark:bg-agri-dark rounded-xl p-6 border-2 border-gray-200 dark:border-gray-800 card-hover transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`} style={{transitionDelay: `${index * 200}ms`}}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-opacity-10 dark:bg-opacity-20 ${benefit.progress?.colorClass.replace('bg-', 'bg-') || 'bg-agri-green'}`}>
                                <i className={`${benefit.icon} text-2xl ${benefit.progress ? benefit.progress.colorClass.replace('bg-', 'text-') : 'text-agri-green'}`}></i>
                            </div>
                            <h3 className="font-heading text-2xl font-bold mb-3 text-gray-800 dark:text-white">{benefit.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{benefit.description}</p>
                            
                            {benefit.progress && (
                                <div className="mt-4">
                                    <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                                        <div className={`flex items-center ${benefit.progress.colorClass.replace('bg-','text-')}`}>
                                            <span className="mr-2">{benefit.progress.label}</span>
                                            <i className="fas fa-arrow-up"></i>
                                        </div>
                                        <span className={`font-bold ${benefit.progress.colorClass.replace('bg-','text-')} ${isVisible ? 'animate-number-change' : ''}`}>
                                            {benefit.progress.value}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-400 dark:bg-gray-700 rounded-full h-2 mt-2">
                                        <div className={`${benefit.progress.colorClass} h-2 rounded-full transition-all duration-[3000ms] ease-out`} style={{ width: isVisible ? `${benefit.progress.value}%` : '0%', transitionDelay: `${500 + index * 300}ms` }}></div>
                                    </div>
                                </div>
                            )}

                            {benefit.graph && (
                                <div className="mt-4 h-24">
                                    <svg className="w-full h-full" viewBox="0 0 200 80">
                                        <polyline points="10,70 50,50 90,60 130,20 170,40 190,10" stroke="#4CAF50" strokeWidth="2" fill="none" className={isVisible ? 'animate-draw-line' : ''} style={{strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '1500ms'}}/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;