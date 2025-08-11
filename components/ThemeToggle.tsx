import React from 'react';
import type { FC } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const ThemeToggle: FC = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const iconVariants: Variants = {
        initial: { rotate: -90, opacity: 0, scale: 0.5 },
        animate: { rotate: 0, opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: { rotate: 90, opacity: 0, scale: 0.5, transition: { duration: 0.3, ease: 'easeIn' } },
    };


    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agri-blue dark:focus:ring-offset-agri-dark"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.i
                    key={theme === 'dark' ? 'sun' : 'moon'} // The key change triggers the animation
                    className={`fas ${theme === 'dark' ? 'fa-sun text-yellow-400' : 'fa-moon text-indigo-400'} text-lg`}
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                />
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;