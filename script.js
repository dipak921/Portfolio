document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // 2. Typing Text Effect
    const typingText = document.querySelector('.typing-text');
    const roles = ['.NET Full Stack Developer', 'Software Engineer', 'Web Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;
    let erasingDelay = 100;
    let newTextDelay = 3000; // Delay between current and next text

    function type() {
        const currentRole = roles[roleIndex];
        let delay = typingDelay;
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            delay = erasingDelay;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            delay = typingDelay;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of the typed word
            isDeleting = true;
            delay = newTextDelay; // Wait 3 seconds
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 500; // Small pause before typing the next word
        }

        setTimeout(type, delay);
    }
    
    // Start typing effect after a small delay
    if(typingText) {
        setTimeout(type, 1000);
    }

    // 3. Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
    }

    // 4. Back to Top Button & Navbar Scroll Effect
    const backToTopBtn = document.getElementById('backToTop');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
            navbar.classList.add('shadow');
        } else {
            backToTopBtn.classList.remove('active');
            navbar.classList.remove('shadow');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (contactForm.checkValidity()) {
                // If valid, show success message
                contactForm.classList.add('d-none');
                formSuccess.classList.remove('d-none');
                
                // Optional: reset form after a few seconds and hide success message
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                    contactForm.classList.remove('d-none');
                    formSuccess.classList.add('d-none');
                }, 5000);
            }

            contactForm.classList.add('was-validated');
        }, false);
    }

    // 6. Dynamic Year for Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
