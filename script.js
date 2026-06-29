/* ==========================================================================
   Manohar Gujjuru Portfolio - Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Core Selectors ---
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggle.querySelector('i');
    const scrollProgress = document.getElementById('scroll-progress');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const yearSpan = document.getElementById('year');

    // --- Modal Selectors ---
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-dynamic-content');

    // Set current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Theme Toggler (Dark/Light Mode) ---
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleIcon.className = 'fa-solid fa-sun';
    } else if (savedTheme === 'dark' || prefersDark) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleIcon.className = 'fa-solid fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggleIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggleIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    // --- Mobile Navigation Overlay ---
    const toggleMobileMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        // Simple hamburger transition
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            mobileNavOverlay.classList.add('active');
            body.style.overflow = 'hidden'; // prevent page scroll
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            mobileNavOverlay.classList.remove('active');
            body.style.overflow = 'auto';
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile nav when clicking a link
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // --- Hero Text Dynamic Typing Effect ---
    const typingSpan = document.getElementById('dynamic-typing');
    const roles = [
        "Full-Stack MERN Developer",
        "AI & Machine Learning Specialist",
        "Graduate Software Engineer",
        "Problem Solver"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // standard typing pace
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // hold role display
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // gap before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    if (typingSpan) {
        typeEffect();
    }

    // --- Scroll Indicators & Scroll Spy ---
    window.addEventListener('scroll', () => {
        // 1. Scroll Progress Bar
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;

        // 2. Active Section Spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset for nav bar
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --- Projects Categorization Filter ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    card.classList.add('animate-zoom-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-zoom-in');
                }
            });
        });
    });

    // --- Detailed Project Modal Content Database ---
    const projectsData = {
        hippofleet: {
            title: "Hippofleet Management System",
            category: "Full-Stack Enterprise Application",
            tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Axios", "Git"],
            image: "assets/hippofleet_preview.png",
            github: "https://github.com/manohargujjuru-dot",
            description: "Developed during my Full-Stack Internship at Hippocloud Technologies, Hippofleet is an enterprise-scale fleet management web application. The platform coordinates vehicle operations, registers operators, schedules maintenance checks, and displays active transit logistics.",
            features: [
                "Role-based authentication system with distinct levels for Administrators, Dispatchers, and Drivers utilizing JSON Web Tokens (JWT).",
                "Full CRUD database endpoints tracking trip logs, maintenance logs, and vehicle registration cards.",
                "Custom dynamic React dashboard incorporating charts detailing fuel metrics, transit history logs, and driver efficiency reviews.",
                "MongoDB query indexing configurations optimizing database fetches for live tracking records by 45%."
            ],
            architecture: "Built on the MERN stack with client modules decoupled from Express.js endpoints. Secure routing guards client screens, and schema-validation secures database CRUD models on the backend."
        },

        restaurant: {
            title: "BiteCraft Gourmet Restaurant",
            category: "Front-end Food Catalog & Booking Website",
            tags: ["HTML5", "CSS3", "JavaScript", "Animate.css"],
            image: null,
            fallbackClass: "restaurant-fallback-bg",
            fallbackIcon: "fa-solid fa-utensils",
            github: "https://github.com/manohargujjuru-dot",
            description: "A professional landing page and dynamic menu catalogue website designed for high-end gourmet restaurant brands. Highlighted by clean micro-interactions, responsive filters, and elegant typography to elevate user engagement.",
            features: [
                "Interactive culinary menu filterable by dishes category (Starters, Entrees, Desserts, Vegan) dynamically in client DOM.",
                "Fully responsive table reservation widget checking booking availability for dates and party sizes.",
                "Mock checkout drawer calculating sub-totals, delivery, and sales tax in real-time.",
                "Premium styling including dark-theme glass overlays and CSS fade-in animations on scroll."
            ],
            architecture: "Developed purely in modular Vanilla JS, structured HTML5, and customized flexible CSS variables to demonstrate raw front-end capabilities, prioritizing swift performance."
        },
        signsense: {
            title: "SignSense Gesture Interpreter",
            category: "Academic Capstone (AI & Web App)",
            tags: ["Python", "OpenCV", "MySQL", "Node.js", "Express.js", "Tailwind CSS"],
            image: null,
            fallbackClass: "signsense-fallback-bg",
            fallbackIcon: "fa-solid fa-hand-peace",
            github: "https://github.com/manohargujjuru-dot",
            description: "SignSense is a full-stack assistive technology capstone application translating hand gestures into readable textual strings and audibly spoken outputs. Built to assist hearing-impaired users interact naturally in daily conversation.",
            features: [
                "Gesture identification mapping webcam coordinates using Python's OpenCV framework and computer vision models.",
                "Backend bridge integrating Python prediction models with standard Express.js REST APIs.",
                "Secure client dashboard built in HTML, CSS, and Tailwind CSS keeping records of translated feeds.",
                "MySQL structures housing authentication data, preferences settings, and user telemetry histories."
            ],
            architecture: "Hybrid model using Python scripts for high-frequency computer vision processing, communicates outputs to a standard Node.js server via local socket bridges and logs data in MySQL."
        }
    };

    // --- Modal Controller Functions ---
    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        let visualHtml = '';
        if (data.image) {
            visualHtml = `<img src="${data.image}" alt="${data.title}" class="modal-project-img">`;
        } else {
            visualHtml = `
                <div class="modal-fallback-graphic ${data.fallbackClass}">
                    <i class="${data.fallbackIcon}" style="font-size: 4rem;"></i>
                    <span style="font-family: var(--font-heading); font-weight: 700; font-size: 1.4rem;">${data.title}</span>
                </div>
            `;
        }

        const tagsHtml = data.tags.map(tag => `<span>${tag}</span>`).join('');
        const featuresHtml = data.features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> <span>${feat}</span></li>`).join('');

        modalContent.innerHTML = `
            ${visualHtml}
            <div class="modal-project-header">
                <div>
                    <h2>${data.title}</h2>
                    <span class="project-category" style="position: static; display: inline-block; margin-top: 0.5rem;">${data.category}</span>
                </div>
                <div class="modal-project-links">
                    <a href="${data.github}" target="_blank" class="btn btn-primary btn-small">
                        <i class="fa-brands fa-github"></i>
                        <span>View Source</span>
                    </a>
                </div>
            </div>
            
            <div class="modal-tech-list">
                ${tagsHtml}
            </div>

            <div class="modal-desc-section">
                <h3>Project Overview</h3>
                <p>${data.description}</p>
            </div>

            <div class="modal-features-section">
                <h3>Key Features & Deliverables</h3>
                <ul>
                    ${featuresHtml}
                </ul>
            </div>

            <div class="modal-architecture-section">
                <h3>Technical Architecture</h3>
                <p>${data.architecture}</p>
            </div>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden'; // locks body background scroll
    };

    const closeModal = () => {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        body.style.overflow = 'auto';
        modalContent.innerHTML = '';
    };

    // Attach click events to modal opening buttons
    document.querySelectorAll('.btn-open-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projId = btn.getAttribute('data-project');
            openModal(projId);
        });
    });

    // Close events triggers
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on 'Escape' key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Contact Form Handling & Validation ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Select inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Simple validation helper
            const checkInput = (input, condition) => {
                const group = input.parentElement;
                if (condition) {
                    group.classList.remove('error');
                } else {
                    group.classList.add('error');
                    isValid = false;
                }
            };

            // Validations checks
            checkInput(nameInput, nameInput.value.trim() !== '');
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            checkInput(emailInput, emailRegex.test(emailInput.value.trim()));
            
            checkInput(subjectInput, subjectInput.value.trim() !== '');
            checkInput(messageInput, messageInput.value.trim() !== '');

            if (isValid) {
                // Change submit button state to loading
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalBtnHtml = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
                
                // Simulate server latency
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;

                    // Show success status feedback message
                    formFeedback.textContent = "Thank you! Your message has been sent successfully. Manohar will contact you shortly.";
                    formFeedback.className = "form-feedback success";
                    
                    // Reset form fields
                    contactForm.reset();

                    // Clear feedback status after 6 seconds
                    setTimeout(() => {
                        formFeedback.className = "form-feedback";
                        formFeedback.textContent = "";
                    }, 6000);
                }, 1500);
            }
        });

        // Realtime validation clearing when typing
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                const group = input.parentElement;
                if (group.classList.contains('error')) {
                    group.classList.remove('error');
                }
            });
        });
    }
});
