// Initialize Barba.js for page transitions
barba.init({
    transitions: [{
      name: 'fade',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5
        });
      }
    }]
  });
  
  // Highlight active navigation link
  function setActiveNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html'; // Default to index.html if root
    document.querySelectorAll('nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === page || (href === 'projects.html' && page.startsWith('project'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Run after each transition
  barba.hooks.after(() => {
    setActiveNav();
  });
  
  // Initial call on page load
  setActiveNav();