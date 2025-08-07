'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    console.log('Animation system initializing...');
    
    // Energy meter state management
    let currentEnergyState = 'before'; // 'before' or 'after'
    
    // Animation state tracking to prevent multiple triggers
    const animationStates = {
      whySection: false,
      techSection: false,
      benefitsSection: false,
      contactSection: false
    };
    
    function setEnergyMeterState(state, skipAnimation = false) {
      console.log('setEnergyMeterState called with:', state, 'skipAnimation:', skipAnimation);
      currentEnergyState = state;
      const energyMeter = document.getElementById('energyMeter');
      const finalPercentage = document.getElementById('finalPercentage');
      const beforePercentage = document.getElementById('beforePercentage');
      
      console.log('Found elements:', {
        energyMeter: !!energyMeter,
        finalPercentage: !!finalPercentage,
        beforePercentage: !!beforePercentage
      });
      
      if (energyMeter) {
        // Control percentage text visibility based on state
        if (finalPercentage && beforePercentage) {
          if (state === 'before') {
            // Red state: hide 50% on left, show 100% on right
            finalPercentage.style.opacity = '0';
            finalPercentage.classList.add('opacity-0');
            beforePercentage.style.opacity = '1';
            beforePercentage.classList.remove('opacity-0');
          } else {
            // Green state: show 50% on left, hide 100% on right
            finalPercentage.style.opacity = '1';
            finalPercentage.classList.remove('opacity-0');
            beforePercentage.style.opacity = '0';
            beforePercentage.classList.add('opacity-0');
          }
        }
        
        if (skipAnimation) {
          // Instant change without animation
          energyMeter.style.transition = 'none';
          if (state === 'before') {
            energyMeter.style.width = '100%';
            energyMeter.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
          } else {
            energyMeter.style.width = '50%';
            energyMeter.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
          }
        } else {
          // Get current state
          const currentWidth = energyMeter.style.width || '100%';
          const targetWidth = state === 'before' ? '100%' : '50%';
          const targetBackground = state === 'before' 
            ? 'linear-gradient(90deg, #ef4444, #dc2626)' 
            : 'linear-gradient(90deg, #22c55e, #16a34a)';
          
          console.log('Animating from', currentWidth, 'to', targetWidth);
          
          // If we need to animate, set up the transition
          energyMeter.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
          
          // Apply the new state
          energyMeter.style.width = targetWidth;
          energyMeter.style.background = targetBackground;
        }
        
        console.log('Energy meter updated. Current styles:', {
          width: energyMeter.style.width,
          background: energyMeter.style.background,
          transition: energyMeter.style.transition
        });
      }
    }
    
    // Make function globally accessible
    window.setEnergyMeterState = setEnergyMeterState;

    // Create animated background lines for hero section
    function createFlowLines() {
      const heroAnimation = document.getElementById('heroAnimation');
      if (!heroAnimation) {
        console.log('Hero animation container not found');
        return;
      }
      
      const lineCount = 80; // Increased for more scatter effect
      
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'flow-line';
        line.style.top = `${Math.random() * 100}%`;
        
        // Set lines to flow sideways from both directions
        const direction = Math.random() > 0.5 ? 'left' : 'right';
        const startX = direction === 'left' ? '100vw' : '-10vw';
        const endX = direction === 'left' ? '-10vw' : '100vw';
        
        line.style.setProperty('--start-x', startX);
        line.style.setProperty('--end-x', endX);
        
        // Start animation immediately with random positions to look already spread out
        const animationDuration = 15 + Math.random() * 10;
        const initialDelay = Math.random() * 2; // Small delay for natural spread
        
        line.style.animation = `flowSideways ${animationDuration}s linear infinite`;
        line.style.animationDelay = `${initialDelay}s`;
        
        // Randomize line properties for more scatter effect
        const lineWidth = 1 + Math.random() * 3; // Random width between 1-4px
        const lineHeight = 30 + Math.random() * 80; // Random height between 30-110px
        const opacity = 0.2 + Math.random() * 0.4; // Random opacity between 0.2-0.6
        
        line.style.width = `${lineWidth}px`;
        line.style.height = `${lineHeight}px`;
        line.style.opacity = opacity;
        
        heroAnimation.appendChild(line);
      }
      console.log('Flow lines created with immediate start for spread-out effect');
    }

    // Create water droplets for technology section
    function createWaterDroplets() {
      const dropletContainer = document.getElementById('waterDroplets');
      if (!dropletContainer) {
        console.log('Water droplets container not found');
        return;
      }
      
      // Clear existing droplets
      dropletContainer.innerHTML = '';
      
      for (let i = 0; i < 12; i++) {
        const droplet = document.createElement('div');
        droplet.className = 'water-droplet';
        droplet.style.left = `${10 + (i * 7)}%`;
        droplet.style.animationDelay = `${Math.random() * 3}s`;
        droplet.style.animationDuration = `${2 + Math.random() * 2}s`;
        dropletContainer.appendChild(droplet);
      }
      console.log('Water droplets created');
    }

    // Create energy particles for why section
    function createEnergyParticles() {
      const particleContainer = document.getElementById('energyParticles');
      if (!particleContainer) {
        console.log('Energy particles container not found');
        return;
      }
      
      // Clear existing particles
      particleContainer.innerHTML = '';
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particle.style.animationDuration = `${2 + Math.random() * 2}s`;
        particleContainer.appendChild(particle);
      }
      console.log('Energy particles created');
    }

    // Create floating particles
    function createFloatingParticles() {
      // Disabled for hero section to prevent button interference
      console.log('Floating particles disabled');
      return;
    }

    // Enhanced button click animation handler
    function animateButtonClick(button) {
      // Add animation class
      button.classList.add('btn-animate');
      
      // Add clicked class for ripple effect
      button.classList.add('clicked');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        button.classList.remove('btn-animate');
      }, 400);
      
      // Remove clicked class after ripple effect completes
      setTimeout(() => {
        button.classList.remove('clicked');
      }, 300);
      
      // Handle energy meter state change for why section buttons
      if (button.closest('#why')) {
        const isTraditionalButton = button.querySelector('.fa-bolt') || button.textContent.includes('Traditional');
        const newState = isTraditionalButton ? 'before' : 'after';
        
        // Only change state if it's different from current state
        if (currentEnergyState !== newState) {
          console.log('Button clicked, changing energy meter state to:', newState);
          setEnergyMeterState(newState, false); // false = animate the change
        }
      }
    }

    // Add click event listeners to all buttons with btn-press class
    function addButtonClickListeners() {
      const buttons = document.querySelectorAll('.btn-press');
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          animateButtonClick(this);
        });
      });
      console.log(`Added click listeners to ${buttons.length} buttons`);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
          mobileMenu.classList.toggle('hidden');
        }
        // Animate the button itself
        animateButtonClick(this);
      });
      console.log('Mobile menu listener attached');
    }

    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      console.log('Button clicked, href:', href);
      
      // Animate the clicked element
      if (e.currentTarget) {
        animateButtonClick(e.currentTarget);
      }
      
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        console.log('Target element:', target);
        
        if (target) {
          const targetPosition = target.offsetTop - 120;
          console.log('Scrolling to position:', targetPosition);
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu) {
            mobileMenu.classList.add('hidden');
          }
        } else {
          console.log('Target element not found');
        }
      }
    };

    // Add event listeners to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    // Intersection Observer for scroll animations with fallback
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9] // More thresholds for natural triggering
    };

    // Fallback for browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      console.log('IntersectionObserver not supported, using fallback');
      // Trigger animations after a delay for unsupported browsers
      setTimeout(() => {
        triggerAllAnimations();
      }, 1000);
      return;
    }

    // Initialize hero animation immediately on page load
    createFlowLines();
    
    // Observer for hero section - simplified without animations
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Create floating particles only
          createFloatingParticles();
        }
      });
    }, observerOptions);

    // Observer for why section
    const whyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !animationStates.whySection) {
          console.log('Why section intersecting, triggering animations');
          animationStates.whySection = true; // Mark as triggered
          
          // Set initial state to 100% (before state) and ensure it's visible
          setTimeout(() => {
            setEnergyMeterState('before', true);
            console.log('Set initial energy meter state to before (100%)');
          }, 100);
          
          // Animate section title
          const whyTitle = document.getElementById('whyTitle');
          if (whyTitle) {
            whyTitle.classList.add('animate-fade-in');
            console.log('Animated why title');
          }
          
          // Animate content box
          setTimeout(() => {
            const whyContent = document.getElementById('whyContent');
            if (whyContent) {
              whyContent.classList.add('animate-slide-in-up');
              console.log('Animated why content');
            }
          }, 300);
          
          // Animate energy meter smoothly from 100% to 50%
          setTimeout(() => {
            console.log('Starting energy meter animation from 100% to 50%');
            setEnergyMeterState('after', false); // false = animate the change
          }, 1200);
          
          // Animate energy particles
          setTimeout(() => {
            createEnergyParticles();
            console.log('Created energy particles');
          }, 3500);
        }
      });
    }, { ...observerOptions, threshold: [0.3, 0.5] });

    // Observer for technology section
    const techObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2 && !animationStates.techSection) {
          console.log('Tech section intersecting, triggering animations');
          animationStates.techSection = true; // Mark as triggered
          
          // Animate section title
          const techTitle = document.getElementById('techTitle');
          if (techTitle) {
            techTitle.classList.add('animate-fade-in');
            console.log('Animated tech title');
          }
          
          // Animate step cards with staggered delay - look within the entire section
          const stepCards = document.querySelectorAll('.step-card');
          stepCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-slide-in-up');
              console.log(`Animated step card ${index}`);
            }, index * 250); // Increased delay for more natural feel
          });

          // Animate plant growth
          setTimeout(() => {
            const plantContainer = document.getElementById('plantContainer');
            if (plantContainer) {
              plantContainer.classList.add('animate-grow');
              console.log('Animated plant growth');
            }
          }, 1000); // Increased delay

          // Animate mist
          setTimeout(() => {
            const mistElement = document.getElementById('mistElement');
            if (mistElement) {
              mistElement.classList.add('visible');
              console.log('Animated mist');
            }
          }, 1500); // Increased delay

          // Create water droplets
          setTimeout(() => {
            createWaterDroplets();
            console.log('Created water droplets');
          }, 1200); // Adjusted timing
        }
      });
    }, { ...observerOptions, threshold: [0.2, 0.3] });

    // Observer for benefits section - watch the section itself and increase threshold
    const benefitsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15 && !animationStates.benefitsSection) {
          console.log('Benefits section intersecting, triggering animations');
          animationStates.benefitsSection = true; // Mark as triggered
          
          // Animate section title
          const benefitsTitle = document.getElementById('benefitsTitle');
          if (benefitsTitle) {
            benefitsTitle.classList.add('animate-fade-in');
            console.log('Animated benefits title');
          }
          
          // Animate benefit cards with more staggered delay
          const benefitCards = entry.target.querySelectorAll('.benefit-card');
          benefitCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.remove('opacity-0', 'scale-90');
              card.classList.add('animate-scale-in');
              console.log(`Animated benefit card ${index}`);
            }, index * 300); // Slower staggered animation
          });

          // Animate progress bars with slower delay
          setTimeout(() => {
            const waterBar = document.getElementById('waterBar');
            const growthBar = document.getElementById('growthBar');
            const waterPercent = document.getElementById('waterPercent');
            const growthPercent = document.getElementById('growthPercent');
            
            if (waterBar) {
              waterBar.style.transition = 'width 3s ease-out';
              waterBar.style.width = '95%';
              console.log('Animated water bar');
            }
            
            if (waterPercent) {
              setTimeout(() => {
                waterPercent.style.transition = 'opacity 1s ease-out';
                waterPercent.classList.remove('opacity-0');
                waterPercent.style.opacity = '1';
              }, 1000);
            }
            
            if (growthBar) {
              setTimeout(() => {
                growthBar.style.transition = 'width 3s ease-out';
                growthBar.style.width = '75%';
                console.log('Animated growth bar');
              }, 600); // Increased delay between bars
            }
            
            if (growthPercent) {
              setTimeout(() => {
                growthPercent.style.transition = 'opacity 1s ease-out';
                growthPercent.classList.remove('opacity-0');
                growthPercent.style.opacity = '1';
              }, 1600);
            }
          }, 1500); // Slower initial delay

          // Animate line graph with much slower animation
          setTimeout(() => {
            const lineGraph = document.getElementById('lineGraph');
            if (lineGraph) {
              const linePath = lineGraph.querySelector('.line-graph-path');
              if (linePath) {
                linePath.style.transition = 'stroke-dashoffset 4s ease-in-out';
                linePath.classList.add('animate');
                console.log('Animated line graph slowly');
              }
            }
          }, 3000); // Much longer delay for line graph
        }
      });
    }, { ...observerOptions, threshold: [0.1, 0.15, 0.2] });

    // Observer for contact section
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !animationStates.contactSection) {
          console.log('Contact section intersecting, triggering animations');
          animationStates.contactSection = true; // Mark as triggered
          
          // Animate section title
          const contactTitle = document.getElementById('contactTitle');
          if (contactTitle) {
            contactTitle.classList.add('animate-fade-in');
            console.log('Animated contact title');
          }
          
          // Animate subtitle
          setTimeout(() => {
            const contactSubtitle = document.getElementById('contactSubtitle');
            if (contactSubtitle) {
              contactSubtitle.classList.add('animate-fade-in');
              console.log('Animated contact subtitle');
            }
          }, 400); // Increased delay
          
          // Animate contact form
          setTimeout(() => {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
              contactForm.classList.add('animate-slide-in-up');
              console.log('Animated contact form');
            }
          }, 800); // Increased delay
        }
      });
    }, { ...observerOptions, threshold: [0.6, 0.8] });

    // Fallback function to trigger all animations
    function triggerAllAnimations() {
      console.log('Triggering all animations as fallback');
      
      // Trigger why section animations
      const whyTitle = document.getElementById('whyTitle');
      const whyContent = document.getElementById('whyContent');
      const energyMeter = document.getElementById('energyMeter');
      const finalPercentage = document.getElementById('finalPercentage');
      
      if (whyTitle) whyTitle.classList.add('animate-fade-in');
      if (whyContent) whyContent.classList.add('animate-slide-in-up');
      if (energyMeter) {
        // Start with red (before state)
        energyMeter.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
        energyMeter.style.width = '100%';
        
        // Animate to green (after state)
        setTimeout(() => {
          energyMeter.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
          energyMeter.style.width = '50%';
          currentEnergyState = 'after';
        }, 500);
      }
      if (finalPercentage) {
        // Show 50% on left, hide 100% on right for 'after' state
        finalPercentage.style.opacity = '1';
        finalPercentage.classList.remove('opacity-0');
        finalPercentage.classList.add('animate-number-change');
        
        const beforePercentage = document.getElementById('beforePercentage');
        if (beforePercentage) {
          beforePercentage.style.opacity = '0';
          beforePercentage.classList.add('opacity-0');
        }
      }
      
      // Create energy particles
      createEnergyParticles();
      
      // Trigger other section animations
      const techTitle = document.getElementById('techTitle');
      const benefitsTitle = document.getElementById('benefitsTitle');
      const contactTitle = document.getElementById('contactTitle');
      
      if (techTitle) techTitle.classList.add('animate-fade-in');
      if (benefitsTitle) benefitsTitle.classList.add('animate-fade-in');
      if (contactTitle) contactTitle.classList.add('animate-fade-in');
    }

    // Observe sections - watch the actual sections for proper timing
    const heroSection = document.querySelector('section');
    const whySection = document.getElementById('why');
    const techSection = document.getElementById('technology');
    const benefitsSection = document.getElementById('benefits'); // Watch section itself
    const contactSection = document.getElementById('contact');

    if (heroSection) heroObserver.observe(heroSection);
    if (whySection) whyObserver.observe(whySection);
    if (techSection) techObserver.observe(techSection);
    if (benefitsSection) benefitsObserver.observe(benefitsSection); // Observe section
    if (contactSection) contactObserver.observe(contactSection);

    console.log('Intersection observers set up');

    // Fallback: Ensure all sections are visible after a delay
    setTimeout(() => {
      console.log('Running fallback animation trigger');
      
      // Trigger benefits section if not already triggered
      if (!animationStates.benefitsSection) {
        console.log('Fallback: Triggering benefits section animations');
        animationStates.benefitsSection = true;
        
        const benefitsTitle = document.getElementById('benefitsTitle');
        if (benefitsTitle) {
          benefitsTitle.classList.add('animate-fade-in');
        }
        
        const benefitCards = document.querySelectorAll('.benefit-card');
        benefitCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.remove('opacity-0', 'scale-90');
            card.classList.add('animate-scale-in');
          }, index * 300);
        });
        
        // Animate progress bars with slower timing
        setTimeout(() => {
          const waterBar = document.getElementById('waterBar');
          const growthBar = document.getElementById('growthBar');
          const waterPercent = document.getElementById('waterPercent');
          const growthPercent = document.getElementById('growthPercent');
          
          if (waterBar) {
            waterBar.style.transition = 'width 3s ease-out';
            waterBar.style.width = '95%';
          }
          
          if (growthBar) {
            setTimeout(() => {
              growthBar.style.transition = 'width 3s ease-out';
              growthBar.style.width = '75%';
            }, 600);
          }
          
          if (waterPercent) {
            setTimeout(() => {
              waterPercent.style.transition = 'opacity 1s ease-out';
              waterPercent.classList.remove('opacity-0');
              waterPercent.style.opacity = '1';
            }, 1000);
          }
          
          if (growthPercent) {
            setTimeout(() => {
              growthPercent.style.transition = 'opacity 1s ease-out';
              growthPercent.classList.remove('opacity-0');
              growthPercent.style.opacity = '1';
            }, 1600);
          }
        }, 1500);
        
        // Animate line graph with slow timing
        setTimeout(() => {
          const lineGraph = document.getElementById('lineGraph');
          if (lineGraph) {
            const linePath = lineGraph.querySelector('.line-graph-path');
            if (linePath) {
              linePath.style.transition = 'stroke-dashoffset 4s ease-in-out';
              linePath.classList.add('animate');
            }
          }
        }, 3000);
      }
      
      // Ensure energy meter is in proper state with correct percentage
      const energyMeter = document.getElementById('energyMeter');
      const finalPercentage = document.getElementById('finalPercentage');
      const beforePercentage = document.getElementById('beforePercentage');
      
      if (energyMeter && finalPercentage && beforePercentage) {
        // Set percentage visibility based on current state
        if (currentEnergyState === 'before') {
          // Red state: hide 50% on left, show 100% on right
          finalPercentage.style.opacity = '0';
          finalPercentage.classList.add('opacity-0');
          beforePercentage.style.opacity = '1';
          beforePercentage.classList.remove('opacity-0');
          
          energyMeter.style.width = '100%';
          energyMeter.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
        } else {
          // Green state: show 50% on left, hide 100% on right
          finalPercentage.style.opacity = '1';
          finalPercentage.classList.remove('opacity-0');
          beforePercentage.style.opacity = '0';
          beforePercentage.classList.add('opacity-0');
          
          energyMeter.style.width = '50%';
          energyMeter.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
        }
      }
      
    }, 15000); // Increased fallback delay to 15 seconds for later trigger

    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        if (formMessage) {
          formMessage.classList.remove('hidden');
          formMessage.classList.add('animate-pulse-once');
        }
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          if (formMessage) {
            formMessage.classList.add('hidden');
            formMessage.classList.remove('animate-pulse-once');
          }
        }, 5000);
      });
      console.log('Contact form listener attached');
    }

    // Add scroll effect to navigation
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header && window.scrollY > 50) {
        header.classList.add('shadow-lg');
      } else if (header) {
        header.classList.remove('shadow-lg');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    console.log('Scroll listener attached');

    // Initialize animations on page load
    createFlowLines();
    
    // Initialize button click listeners
    addButtonClickListeners();

    // Backup: Trigger animations after page load if IntersectionObserver fails
    setTimeout(() => {
      // Check if animations have been triggered
      const whyTitle = document.getElementById('whyTitle');
      if (whyTitle && !whyTitle.classList.contains('animate-fade-in')) {
        console.log('Backup animation trigger activated');
        triggerAllAnimations();
      }
    }, 10000); // Increased to 10 seconds - only trigger if IntersectionObserver truly fails

    // Additional backup: Trigger animations on scroll for older browsers
    let hasTriggeredAnimations = false;
    const handleScrollForAnimations = () => {
      if (hasTriggeredAnimations) return;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const whySection = document.getElementById('why');
      
      if (whySection && scrollPosition > whySection.offsetTop + 200) { // Added 200px offset
        console.log('Scroll-based animation trigger activated');
        triggerAllAnimations();
        hasTriggeredAnimations = true;
        window.removeEventListener('scroll', handleScrollForAnimations);
      }
    };
    
    window.addEventListener('scroll', handleScrollForAnimations);

    console.log('Animation system initialized successfully');

    // Cleanup event listeners on component unmount
    return () => {
      console.log('Cleaning up animation system');
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollForAnimations);
      if (mobileMenuBtn) {
        mobileMenuBtn.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <div>
      <Head>
        <title>AgriBlu - The Future of Farming</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      <div className="font-body text-white bg-agri-dark overflow-x-hidden" style={{paddingTop: '80px'}}>
      {/* Animated Background Lines for Hero Section */}
      <div className="hero-animation" id="heroAnimation"></div>
      
      {/* Header/Navigation Bar */}
      <header className="fixed top-0 w-full bg-gray-800 z-100 border-b border-gray-600 shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-agri-green rounded-lg p-2"
            aria-label="Refresh page"
          >
            <img 
              src="/agriblu-logo.svg" 
              alt="AgriBlu Logo" 
              className="h-16 w-auto"
            />
          </button>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#why" className="nav-link text-white hover:text-agri-green transition-colors duration-300 font-medium bg-gray-700 px-4 py-2 rounded-lg">The Why</a>
            <a href="#technology" className="nav-link text-white hover:text-agri-green transition-colors duration-300 font-medium bg-gray-700 px-4 py-2 rounded-lg">The How</a>
            <a href="#benefits" className="nav-link text-white hover:text-agri-green transition-colors duration-300 font-medium bg-gray-700 px-4 py-2 rounded-lg">Benefits</a>
            <a href="#contact" className="nav-link text-white hover:text-agri-green transition-colors duration-300 font-medium bg-gray-700 px-4 py-2 rounded-lg">Contact</a>
            <button className="bg-agri-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-agri-green/30 btn-press">
              Request a Demo
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white focus:outline-none bg-gray-700 p-2 rounded-lg" id="mobileMenuBtn">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </nav>
        
        {/* Mobile Menu */}
        <div className="hidden md:hidden bg-gray-800" id="mobileMenu">
          <div className="px-6 py-4 space-y-3 border-t border-gray-600">
            <a href="#why" className="block text-white hover:text-agri-green py-2 font-medium bg-gray-700 px-4 py-2 rounded-lg">The Why</a>
            <a href="#technology" className="block text-white hover:text-agri-green py-2 font-medium bg-gray-700 px-4 py-2 rounded-lg">The How</a>
            <a href="#benefits" className="block text-white hover:text-agri-green py-2 font-medium bg-gray-700 px-4 py-2 rounded-lg">Benefits</a>
            <a href="#contact" className="block text-white hover:text-agri-green py-2 font-medium bg-gray-700 px-4 py-2 rounded-lg">Contact</a>
            <button className="bg-agri-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full w-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-agri-green/30 btn-press">
              Request a Demo
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-10 text-agri-dark">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="hero-title font-heading text-4xl md:text-6xl font-bold mb-6 text-black">
            AgriBlu: "Growing for you"
          </h1>
          <p className="hero-subtitle font-body text-lg md:text-xl max-w-3xl mx-auto mb-4 text-black">
            The future of indoor CEA farming is here!
          </p>
          <p className="hero-subtitle font-body text-lg md:text-xl max-w-3xl mx-auto mb-12 text-black">
            Indoor farming rebooted with unparalleled levels of efficiency.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#contact');
              if (target) {
                window.scrollTo({
                  top: target.offsetTop - 120,
                  behavior: 'smooth'
                });
              }
            }} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 inline-block relative z-10 btn-press">
              Get Started
            </a>
            <a href="#technology" onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#technology');
              if (target) {
                window.scrollTo({
                  top: target.offsetTop - 120,
                  behavior: 'smooth'
                });
              }
            }} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 inline-block relative z-10 btn-press">
              Learn More
            </a>
          </div>
        </div>
        
        {/* Hero Illustration */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-auto px-6">
          <div className="relative h-64 flex items-center justify-center">
            {/* Animated plant icon */}
            <div className="text-8xl text-agri-green opacity-20 animate-float">
              <i className="fas fa-seedling"></i>
            </div>
            {/* Water drops */}
            <div className="absolute top-10 left-1/4 text-4xl text-agri-blue opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}>
              <i className="fas fa-tint"></i>
            </div>
            <div className="absolute top-20 right-1/4 text-3xl text-agri-blue opacity-30 animate-bounce" style={{animationDelay: '1s'}}>
              <i className="fas fa-tint"></i>
            </div>
            <div className="absolute bottom-10 left-1/3 text-2xl text-agri-blue opacity-30 animate-bounce" style={{animationDelay: '1.5s'}}>
              <i className="fas fa-tint"></i>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Why Section */}
      <section id="why" className="py-20 bg-white relative overflow-hidden">
        {/* Energy Particles Background */}
        <div className="absolute inset-0 pointer-events-none" id="energyParticles"></div>
        
        <div className="container mx-auto px-6">
          <h2 id="whyTitle" className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-black opacity-0">
            The Why: Vertical Farming's Energy Problem
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div id="whyContent" className="bg-gray-50 rounded-xl p-8 border-l-4 border-agri-green shadow-lg opacity-0 transform translate-y-10">
              <p className="font-body text-lg text-gray-800 mb-6 leading-relaxed">
                Indoor and vertical farming have struggled financially over the past two years, primarily because of high energy costs. These expenses make it difficult for farms to become profitable.
              </p>
              <p className="font-body text-lg text-gray-800 leading-relaxed">
                Having been involved in the indoor growing industry since its commercial beginnings in 2014, we've developed a unique approach that slashes energy consumption by up to 50%. Our solution addresses the core issue preventing many of these operations from succeeding.
              </p>
            </div>
            
            {/* Energy Reduction Visualization */}
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="font-heading text-2xl font-bold text-center mb-8 text-gray-800">
                Energy Consumption Reduction
              </h3>
              
              <div className="relative">
                {/* Energy Meter */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-700">After AgriBlu</span>
                    <span className="text-lg font-semibold text-gray-700">Before AgriBlu</span>
                  </div>
                  
                  <div className="relative h-12 bg-gray-200 rounded-full overflow-hidden">
                    <div id="energyMeter" className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-in-out" style={{width: '100%', background: '#ef4444'}}></div>
                    
                    {/* Percentage Labels */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-white font-bold text-lg z-10 relative opacity-0" id="finalPercentage">50%</span>
                      <span className="text-white font-bold text-lg z-10 relative opacity-0" id="beforePercentage">100%</span>
                    </div>
                    
                  </div>
                </div>
                
                {/* Energy Savings Highlight */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center bg-green-100 rounded-full px-6 py-3">
                    <span className="text-3xl font-bold text-green-600 mr-2">50%</span>
                    <span className="text-lg text-green-700 font-semibold">Energy Savings</span>
                  </div>
                </div>
                
                {/* Energy Flow Visualization */}
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <button 
                      onClick={(e) => {
                        if (window.setEnergyMeterState) {
                          window.setEnergyMeterState('before');
                        }
                        animateButtonClick(e.currentTarget);
                      }}
                      className="focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-2 hover:bg-red-50 transition-colors duration-300 btn-press"
                      aria-label="Show Traditional Energy Use"
                    >
                      <div className="relative h-24 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-bolt text-red-500 text-2xl"></i>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          high
                        </div>
                      </div>
                    </button>
                    <p className="mt-4 text-gray-600 font-medium">Traditional Energy Use</p>
                  </div>
                  
                  <div className="text-center">
                    <button 
                      onClick={(e) => {
                        if (window.setEnergyMeterState) {
                          window.setEnergyMeterState('after');
                        }
                        animateButtonClick(e.currentTarget);
                      }}
                      className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-2 hover:bg-green-50 transition-colors duration-300 btn-press"
                      aria-label="Show AgriBlu Energy Use"
                    >
                      <div className="relative h-24 flex items-center justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-leaf text-green-500 text-2xl"></i>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          low
                        </div>
                      </div>
                    </button>
                    <p className="mt-4 text-gray-600 font-medium">AgriBlu Energy Use</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section id="technology" className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Water Droplets Background */}
        <div className="absolute inset-0 pointer-events-none" id="waterDroplets"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 opacity-0 text-white" id="techTitle">
            The How
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="step-card text-center opacity-0 transform translate-y-20">
                <div className="w-24 h-24 bg-agri-blue bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 hover:scale-110 hover:bg-agri-blue bg-opacity-30">
                  <i className="fas fa-tint text-agri-blue text-4xl"></i>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">Mist Delivery</h3>
                <p className="text-gray-400">Precision nutrient mist is delivered directly to plant roots at timed intervals.</p>
              </div>
              
              {/* Step 2 */}
              <div className="step-card text-center opacity-0 transform translate-y-20">
                <div className="w-24 h-24 bg-agri-green bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 hover:scale-110 hover:bg-agri-green bg-opacity-30">
                  <i className="fas fa-seedling text-agri-green text-4xl"></i>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">Root Growth</h3>
                <p className="text-gray-400">Plants develop robust root systems in the oxygen-rich environment.</p>
              </div>
              
              {/* Step 3 */}
              <div className="step-card text-center opacity-0 transform translate-y-20">
                <div className="w-24 h-24 bg-agri-blue bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 hover:scale-110 hover:bg-agri-blue bg-opacity-30">
                  <i className="fas fa-chart-line text-agri-blue text-4xl"></i>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">Data Monitoring</h3>
                <p className="text-gray-400">Advanced sensors track growth metrics and optimize conditions in real-time.</p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center relative h-96" id="rootAnimationContainer">
              <div className="relative w-full h-full flex items-center justify-center" id="plantContainer">
                <div className="relative w-80 h-80">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-40 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-lg border-2 border-gray-500 shadow-lg">
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-agri-blue to-agri-green rounded-t-lg"></div>
                    <div className="absolute top-3 left-2 w-4 h-1 bg-agri-blue rounded-full opacity-60"></div>
                    <div className="absolute top-3 right-2 w-4 h-1 bg-agri-green rounded-full opacity-60"></div>
                  </div>
                  
                  <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-40 bg-gradient-to-t from-agri-green to-green-400 rounded-t-lg mx-auto transform origin-bottom scale-y-0 transition-transform duration-1500" id="mainStem"></div>
                    
                    <div className="flex justify-center space-x-6 mt-2">
                      <div className="w-12 h-20 bg-gradient-to-t from-agri-green to-green-400 rounded-t-full transform origin-bottom scale-y-0 transition-transform duration-1500 delay-300" id="leftLeaf"></div>
                      <div className="w-12 h-24 bg-gradient-to-t from-agri-green to-green-400 rounded-t-full transform origin-bottom scale-y-0 transition-transform duration-1500 delay-500" id="centerLeaf"></div>
                      <div className="w-12 h-20 bg-gradient-to-t from-agri-green to-green-400 rounded-t-full transform origin-bottom scale-y-0 transition-transform duration-1500 delay-700" id="rightLeaf"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
                    <svg className="w-80 h-40" viewBox="0 0 300 150">
                      <path d="M150,0 Q120,30 90,60 T60,120" stroke="url(#rootGradient)" strokeWidth="4" fill="none" className="root-path" strokeDasharray="1000" strokeDashoffset="1000"/>
                      <path d="M150,0 Q180,30 210,60 T240,120" stroke="url(#rootGradient)" strokeWidth="4" fill="none" className="root-path" strokeDasharray="1000" strokeDashoffset="1000"/>
                      <path d="M150,0 Q150,40 140,80 T130,130" stroke="url(#rootGradient)" strokeWidth="4" fill="none" className="root-path" strokeDasharray="1000" strokeDashoffset="1000"/>
                      <path d="M150,0 Q150,40 160,80 T170,130" stroke="url(#rootGradient)" strokeWidth="4" fill="none" className="root-path" strokeDasharray="1000" strokeDashoffset="1000"/>
                      <defs>
                        <linearGradient id="rootGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#4CAF50', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#8BC34A', stopOpacity: 1}} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="mist absolute bottom-0 left-0 w-full h-32 opacity-0 transition-opacity duration-2000" id="mistElement">
                    <svg className="w-full h-full" viewBox="0 0 300 150">
                      <circle cx="50" cy="75" r="20" fill="#00BCD4" opacity="0.4" className="animate-pulse"/>
                      <circle cx="100" cy="50" r="25" fill="#00BCD4" opacity="0.4" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                      <circle cx="150" cy="80" r="22" fill="#00BCD4" opacity="0.4" className="animate-pulse" style={{animationDelay: '1s'}}/>
                      <circle cx="200" cy="60" r="28" fill="#00BCD4" opacity="0.4" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
                      <circle cx="250" cy="75" r="20" fill="#00BCD4" opacity="0.4" className="animate-pulse" style={{animationDelay: '2s'}}/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-agri-dark">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 opacity-0 text-black" id="benefitsTitle">
            Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="benefit-card bg-gray-900 rounded-xl p-6 border-2 border-gray-800 opacity-0 transform scale-90 transition-all duration-700 hover:shadow-xl hover:shadow-agri-green/30 hover:border-agri-green">
              <div className="w-16 h-16 bg-agri-green bg-opacity-20 rounded-full flex items-center justify-center mb-4 transform transition-all duration-500 hover:scale-110 hover:bg-agri-green bg-opacity-30">
                <i className="fas fa-water text-agri-green text-2xl"></i>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">95% Less Water</h3>
              <p className="text-gray-400 mb-4">Our closed-loop system recycles water, drastically reducing your environmental footprint.</p>
              <div className="mt-4">
                <div className="flex items-center text-agri-green">
                  <span className="mr-2">Water Efficiency</span>
                  <i className="fas fa-arrow-up"></i>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-agri-green to-green-400 h-3 rounded-full transition-all duration-2000 ease-out" style={{width: '0%'}} id="waterBar"></div>
                </div>
                <div className="text-right text-sm text-agri-green mt-1 opacity-0 transition-opacity duration-500" id="waterPercent">95%</div>
              </div>
            </div>
            
            <div className="benefit-card bg-gray-900 rounded-xl p-6 border-2 border-gray-800 opacity-0 transform scale-90 transition-all duration-700 hover:shadow-xl hover:shadow-agri-blue/30 hover:border-agri-blue">
              <div className="w-16 h-16 bg-agri-blue bg-opacity-20 rounded-full flex items-center justify-center mb-4 transform transition-all duration-500 hover:scale-110 hover:bg-agri-blue bg-opacity-30">
                <i className="fas fa-bolt text-agri-blue text-2xl"></i>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">3x Faster Growth</h3>
              <p className="text-gray-400 mb-4">Optimized nutrient delivery accelerates plant growth, enabling more harvest cycles per year.</p>
              <div className="mt-4">
                <div className="flex items-center text-agri-blue">
                  <span className="mr-2">Growth Rate</span>
                  <i className="fas fa-arrow-up"></i>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-agri-blue to-cyan-400 h-3 rounded-full transition-all duration-2000 ease-out" style={{width: '0%'}} id="growthBar"></div>
                </div>
                <div className="text-right text-sm text-agri-blue mt-1 opacity-0 transition-opacity duration-500" id="growthPercent">75%</div>
              </div>
            </div>
            
            <div className="benefit-card bg-gray-900 rounded-xl p-6 border-2 border-gray-800 opacity-0 transform scale-90 transition-all duration-700 hover:shadow-xl hover:shadow-agri-green/30 hover:border-agri-green">
              <div className="w-16 h-16 bg-agri-green bg-opacity-20 rounded-full flex items-center justify-center mb-4 transform transition-all duration-500 hover:scale-110 hover:bg-agri-green bg-opacity-30">
                <i className="fas fa-microchip text-agri-green text-2xl"></i>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">Smart Control</h3>
              <p className="text-gray-400 mb-4">Monitor and manage every aspect of your grow environment from anywhere with our proprietary software.</p>
              <div className="mt-4 h-24">
                <svg className="w-full h-full line-graph" id="lineGraph" viewBox="0 0 200 80">
                  <polyline points="10,70 50,50 90,60 130,20 170,40 190,10" stroke="url(#chartGradient)" strokeWidth="3" fill="none" className="line-graph-path" strokeDasharray="1000" strokeDashoffset="1000"/>
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#4CAF50', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#00BCD4', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 opacity-0 text-white" id="contactTitle">
            Contact Us
          </h2>
          <p className="font-body text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto opacity-0" id="contactSubtitle">
            Ready to revolutionize your farming operation? Get in touch with our team today.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
              <form className="space-y-6" id="contactForm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all duration-300 hover:bg-gray-650" />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company Name</label>
                    <input type="text" id="companyName" name="companyName" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all duration-300 hover:bg-gray-650" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all duration-300 hover:bg-gray-650" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all duration-300 hover:bg-gray-650"></textarea>
                </div>
                
                <div className="text-center">
                  <button type="submit" className="bg-agri-green hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-agri-green/40">
                    Submit Inquiry
                  </button>
                </div>
              </form>
              
              <div id="formMessage" className="mt-6 text-center hidden">
                <div className="inline-flex items-center px-6 py-3 bg-agri-green bg-opacity-20 text-agri-green rounded-lg">
                  <i className="fas fa-check-circle mr-2"></i>
                  <span>Thank you for your inquiry! We'll be in touch soon.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-agri-dark border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src="/agriblu-logo.svg" 
                alt="AgriBlu Logo" 
                className="h-8 w-auto"
              />
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2023 AgriBlu. All rights reserved.
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-agri-green transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-agri-green transition-colors duration-300">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-agri-green transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        /* Custom styles for animations and effects */
        .hero-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .flow-line {
          position: absolute;
          width: 2px;
          height: 100px;
          background: linear-gradient(to top, transparent, rgba(0, 188, 212, 0.7), transparent);
          animation: flowUp 12s linear infinite; // Slower movement (increased from 4s)
          top: 100vh;
          opacity: 0;
          transform-origin: center;
        }
        
        .flow-line:nth-child(odd) {
          background: linear-gradient(to top, transparent, rgba(76, 175, 80, 0.7), transparent);
        }
        
        .water-droplet {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #00BCD4;
          border-radius: 50%;
          animation: drop 2s ease-in-out infinite;
        }
        
        .step-card:hover .w-24 {
          transform: scale(1.1);
        }
        
        .root-path {
          animation: drawLine 2s ease-out forwards;
        }
        
        .mist.visible {
          opacity: 0.7;
        }
        
        .line-graph.animate .line-graph-path {
          animation: drawLine 2s ease-out forwards;
        }
        
        .animate-grow #mainStem {
          transform: scaleY(1);
        }
        
        .animate-grow #leftLeaf {
          transform: scaleY(1);
        }
        
        .animate-grow #centerLeaf {
          transform: scaleY(1);
        }
        
        .animate-grow #rightLeaf {
          transform: scaleY(1);
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-pulse-once {
          animation: pulse-once 0.5s ease-out;
        }
        
        .animate-energy-reduction {
          animation: energy-reduction 2s ease-out forwards;
        }
        
        .animate-slash-effect {
          animation: slash-effect 1s ease-out;
        }
        
        .animate-number-change {
          animation: number-change 0.6s ease-out;
        }
        
        /* Slash effect for energy meter */
        #energySlash div {
          transition: opacity 0.3s ease-in-out;
        }
        
        #energySlash div.opacity-100 {
          opacity: 1 !important;
        }
        
        #energySlash div.opacity-0 {
          opacity: 0 !important;
        }
        
        .energy-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #ef4444, #22c55e);
          border-radius: 50%;
          animation: energy-particle-float 3s ease-out infinite;
          opacity: 0;
          transform: scale(0);
        }
        
        .hero-content {
          animation: gentle-fade-in 1.5s ease-out forwards;
        }
        
        @keyframes gentle-fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes flowSideways {
          0% { 
            transform: translateX(var(--start-x, 100vw)) translateY(0) rotate(0deg); 
            opacity: 0; 
          }
          5% { 
            opacity: 0.6; 
            transform: translateX(calc(var(--start-x, 100vw) - 10vw)) translateY(-5px) rotate(5deg);
          }
          50% { 
            opacity: 0.6; 
            transform: translateX(calc((var(--start-x, 100vw) + var(--end-x, -10vw)) / 2)) translateY(-10px) rotate(-5deg);
          }
          95% { 
            opacity: 0.6; 
            transform: translateX(calc(var(--end-x, -10vw) + 10vw)) translateY(-5px) rotate(5deg);
          }
          100% { 
            transform: translateX(var(--end-x, -10vw)) translateY(0) rotate(0deg); 
            opacity: 0; 
          }
        }
        
        @keyframes flowUp {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          5% { 
            opacity: 0.7; 
            transform: translateY(90vh) rotate(var(--angle, 0deg));
          }
          50% { 
            opacity: 0.7; 
            transform: translateY(var(--direction, up) === 'up' ? -50vh : 150vh) rotate(calc(var(--angle, 0deg) * 2));
          }
          95% { 
            opacity: 0.7; 
            transform: translateY(var(--direction, up) === 'up' ? -100vh : 200vh) rotate(calc(var(--angle, 0deg) * 3));
          }
          100% { 
            transform: translateY(var(--direction, up) === 'up' ? -120vh : 220vh) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes drop {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(100px); opacity: 0; }
        }
        
        @keyframes drawLine {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes pulse-once {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes energy-reduction {
          0% { width: 100%; background-color: #ef4444; }
          50% { width: 100%; background-color: #ef4444; }
          100% { width: 50%; background-color: #22c55e; }
        }
        
        @keyframes slash-effect {
          0% { transform: translateX(-100%) rotate(-45deg); opacity: 0; }
          50% { transform: translateX(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(100%) rotate(-45deg); opacity: 0; }
        }
        
        @keyframes energy-particle-float {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { transform: translateY(-20px) scale(1); opacity: 1; }
          80% { transform: translateY(-80px) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        @keyframes number-change {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #2A2E34;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4CAF50;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #45a049;
        }
      `}</style>
      
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
    </div>
  );
}