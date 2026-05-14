document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       MOBILE NAVIGATION TOGGLE
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    /* ==========================================
       SMOOTH SCROLLING FOR NAVIGATION LINKS
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ==========================================
       NAVBAR SCROLL EFFECT
       ========================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link highlighting functionality
        updateActiveLink();
    });

    /* ==========================================
       ACTIVE LINK HIGHLIGHTING ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for the fixed navbar
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Initial call
    updateActiveLink();

    /* ==========================================
       SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // offset to trigger slightly before it comes into view
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Interactive elements logic


    /* ==========================================
       CUSTOM CURSOR FOLLOW LOGIC
       ========================================== */
    const cursorDot = document.querySelector('.cursor-dot');
    
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Cracker sparkler effect
        createCrackerParticles(mouseX, mouseY);
        
        // Handle hovering over interactive elements
        const hoverTarget = e.target.closest('a, button, .credential-card, .project-card, .skill-label, .social-icon');
        if (hoverTarget) {
            // Extra crackers for buttons
            if (Math.random() > 0.5) createCrackerParticles(mouseX, mouseY, 5);
        }
    });

    function createCrackerParticles(x, y, count = 2) {
        const colors = ['#a855f7', '#ec4899', '#ffffff', '#e9d5ff', '#f472b6'];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'cracker-particle';
            
            // Random direction
            const tx = (Math.random() - 0.5) * 100;
            const ty = (Math.random() - 0.5) * 100;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            document.body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    // Animate cursor with smooth easing
    function animateCursor() {
        // Add a slight lag to the dot too for a more organic feel
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* ==========================================
       DYNAMIC PARTICLE GENERATION
       ========================================== */
    const particleContainer = document.querySelector('.bg-particles');
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particleContainer.appendChild(particle);
    }

    /* ==========================================
       MAGNETIC EFFECT FOR HEADINGS
       ========================================== */
    const magneticName = document.querySelector('.name');
    if (magneticName) {
        magneticName.addEventListener('mousemove', (e) => {
            const rect = magneticName.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            magneticName.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        magneticName.addEventListener('mouseleave', () => {
            magneticName.style.transform = `translate(0px, 0px)`;
        });
    }

    /* ==========================================
       PARALLAX FLOATING ELEMENTS
       ========================================== */
    const floatingElements = document.querySelectorAll('.floating, .floating-delayed-1, .floating-delayed-2');
    
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        
        floatingElements.forEach((el, index) => {
            // Only apply parallax to elements NOT in the hero section
            if (el.closest('.hero')) return;
            
            const speed = (index % 3 + 1) * 0.3;
            el.style.setProperty('--parallax-x', `${x * speed}px`);
            el.style.setProperty('--parallax-y', `${y * speed}px`);
        });
        
        const blobs = document.querySelectorAll('.blob'); // Define blobs here if not available
        blobs.forEach((blob, index) => {
            // Only apply parallax to blobs NOT in the hero section
            if (blob.closest('.hero')) return;
            
            const speed = (index + 1) * 0.8;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    /* ==========================================
       MAGNETIC BUTTONS
       ========================================== */
    const buttons = document.querySelectorAll('.btn, .social-icon');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    /* ==========================================
       CARD GLOW TRACKING & TILT
       ========================================== */
    const interactiveCards = document.querySelectorAll('.project-card, .education-card, .credentials-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
    /* ==========================================
       PROJECT MODAL LOGIC
       ========================================== */
    const projectData = {
        'blockcred': {
            title: 'BlockCred: Blockchain Skill Verification',
            tags: ['Java', 'Spring Boot', 'Node.js', 'Blockchain', 'JavaScript'],
            desc: `
                <p>A scalable platform designed for secure and immutable certificate issuance and verification using blockchain technology.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>Integrated SHA-256 Hashing for data integrity and immutability.</li>
                    <li>Hybrid architecture combining Java Spring Boot for business logic and Node.js for decentralized operations.</li>
                    <li>Instant decentralized verification preventing credential fraud.</li>
                    <li>User-centric dashboard for both issuers and recipients.</li>
                </ul>
                <h4>Tech Stack</h4>
                <p>Java 17, Spring Boot, Node.js, Web3.js, MySQL, and SHA-256 Hashing Algorithms.</p>
            `
        },
        'authentinews': {
            title: 'AuthentiNews Detector',
            tags: ['Java 17', 'Spring Boot', 'NLP', 'Weka', 'Chart.js'],
            desc: `
                <p>A sophisticated full-stack platform for real-time misinformation detection and text analysis.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>Advanced text classification using Naive Bayes (Weka) and TF-IDF vectorization.</li>
                    <li>Custom NLP pipeline for cleaning and processing massive amounts of news data.</li>
                    <li>Confidence scoring system to rank the reliability of news sources.</li>
                    <li>Visual analytics powered by Chart.js for transparent result interpretation.</li>
                </ul>
                <h4>Tech Stack</h4>
                <p>Java, Spring Boot, Weka Machine Learning Library, NLP, JavaScript, and Chart.js.</p>
            `
        },
        'audiovisual': {
            title: 'Audiovisual Synchronization Neural Engine',
            tags: ['Python', 'Vosk STT', 'gTTS', 'FFmpeg', 'Sync Logic'],
            desc: `
                <p>An AI-powered application that automates the complex process of video translation and dubbing.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>Vosk-based Speech-to-Text (STT) for high-accuracy transcript generation.</li>
                    <li>Google TTS (gTTS) for natural-sounding voiceover generation in multiple languages.</li>
                    <li>Precision synchronization using FFmpeg to align audio frames with video timestamps.</li>
                    <li>Automated workflow from raw video input to fully dubbed output.</li>
                </ul>
                <h4>Tech Stack</h4>
                <p>Python, Vosk STT, gTTS, FFmpeg, and Custom Temporal Logic for synchronization.</p>
            `
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        modalBody.innerHTML = `
            <div class="modal-project-header">
                <h3 class="modal-project-title">${data.title}</h3>
                <div class="modal-project-tags">
                    ${data.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
            <div class="modal-project-desc">
                ${data.desc}
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
