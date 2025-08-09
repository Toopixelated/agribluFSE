
import type { TechnologyStep, Benefit, NavLink } from './types';

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { name: 'The Why', href: '#why' },
  { name: 'The How', href: '#technology' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Contact', href: '#contact' },
];

// Technology Data
export const TECHNOLOGY_STEPS: TechnologyStep[] = [
  {
    icon: 'fas fa-tint',
    title: 'Mist Delivery',
    description: 'Precision nutrient mist is delivered directly to plant roots at timed intervals.'
  },
  {
    icon: 'fas fa-seedling',
    title: 'Root Growth',
    description: 'Plants develop robust root systems in the oxygen-rich environment.'
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Data Monitoring',
    description: 'Advanced sensors track growth metrics and optimize conditions in real-time.'
  }
];

// Benefit Data
export const BENEFITS: Benefit[] = [
  {
    icon: 'fas fa-water',
    title: '95% Less Water',
    description: "Our closed-loop system recycles water, drastically reducing your environmental footprint.",
    progress: {
      value: 95,
      label: 'Water Efficiency',
      colorClass: 'bg-agri-green'
    }
  },
  {
    icon: 'fas fa-bolt',
    title: '3x Faster Growth',
    description: 'Optimized nutrient delivery accelerates plant growth, enabling more harvest cycles per year.',
     progress: {
      value: 75, // Just for visual representation
      label: 'Growth Rate',
      colorClass: 'bg-agri-blue'
    }
  },
  {
    icon: 'fas fa-microchip',
    title: 'Smart Control',
    description: 'Monitor and manage every aspect of your grow environment from anywhere with our proprietary software.',
    graph: true
  }
];