// script.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Intro Page Typing Animation
    if (document.getElementById('name')) {
        const nameEl = document.getElementById('name');
        const taglineEl = document.getElementById('tagline');
        const nameText = "Welcome to my World";
        const taglineText = "Simply Amazing | Truly Inspiring";
        let i = 0, j = 0;

        function typeName() {
            if (i < nameText.length) {
                nameEl.textContent += nameText.charAt(i);
                i++;
                setTimeout(typeName, 100);
            } else {
                typeTagline();
            }
        }

        function typeTagline() {
            if (j < taglineText.length) {
                taglineEl.textContent += taglineText.charAt(j);
                j++;
                setTimeout(typeTagline, 50);
            } else {
                document.querySelector('.btn-discover').style.opacity = '1';
            }
        }

        nameEl.textContent = '';
        taglineEl.textContent = '';
        setTimeout(typeName, 500);

        // Particles.js for intro page (interactive)
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#00ffcc' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: { speed: 2 }
            },
            interactivity: {
                events: { onhover: { enable: true, mode: 'repulse' } }
            }
        });
    }

    // Particles.js for all pages (non-interactive)
    if (!document.getElementById('name')) { // Only run if not intro page
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#00ffcc' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: { speed: 2 }
            },
            interactivity: {
                events: {
                    onhover: { enable: false },
                    onclick: { enable: false }
                }
            }
        });
    }

    // Home Page Scroll Animations
    if (document.body.classList.contains('home-page')) {
        const scrollContainer = document.querySelector('.scroll-container');
        const sections = document.querySelectorAll('.full-page-section');

        function checkVisibility() {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                    section.classList.add('visible');
                    if (section.id === 'projects') {
                        const projectItems = section.querySelectorAll('.project-item');
                        projectItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
                            }, index * 150);
                        });
                    }
                }
            });
        }

        scrollContainer.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        window.addEventListener('load', () => {
            scrollContainer.scrollTo(0, 0);
        });
    }

    // Slideshow Functionality for Project Pages
    if (document.querySelector('.slideshow')) {
        console.log('Slideshow initialized');
        const slides = document.querySelectorAll('.slide');
        const indicatorsContainer = document.querySelector('.indicators');
        console.log('Slides found:', slides.length);
        if (slides.length === 0) console.error('No slides detected in .slideshow');
    
        // Set slideshow height based on first image
        const slideshow = document.querySelector('.slideshow');
        const firstImage = slides[0].querySelector('img');
        firstImage.onload = () => {
            slideshow.style.height = `${firstImage.naturalHeight}px`;
        };
        if (firstImage.complete) firstImage.onload(); // Trigger if already loaded
    
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 3000);

        function showSlide(index) {
            console.log('Showing slide:', index);
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicatorsContainer.children[index].classList.add('active');
            indicatorsContainer.children[currentSlide].classList.remove('active');
            currentSlide = index;
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            let prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        // Create Indicators
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 3000);
            });
            indicatorsContainer.appendChild(dot);
        });

        // Navigation Buttons
        document.getElementById('next').addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 3000);
        });

        document.getElementById('prev').addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 3000);
        });

        // Initial Show
        showSlide(0);

        // Section Animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate').forEach(section => {
            observer.observe(section);
        });
    }
});