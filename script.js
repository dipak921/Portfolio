document.addEventListener("DOMContentLoaded", function () {
    // 1. Set the dynamic current year in the footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Smooth scrolling logic for all anchor links (navigation)
    const navLinks = document.querySelectorAll('a.nav-link');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Offset for the fixed navbar height
                    const offset = 75;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                    });

                    // Mobile collapse handling if navbar is expanded
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // 3. Simple Form Submission Handler
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Collect form values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // Format the text for WhatsApp
            const waText = `Hello Dipak,%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A*Message:* ${encodeURIComponent(message)}`;

            // The WhatsApp phone number (Update this with your actual number, e.g., 919876543210 for India)
            const phoneNumber = "919373570576";

            // Build the WhatsApp API url
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${waText}`;

            // Open WhatsApp in a new tab/window
            window.open(whatsappUrl, '_blank');

            // Reset the form
            contactForm.reset();
        });
    }

    // 4. Scroll Spy functionality is handled via bootstrap data attributes in the <body>
    // but we can add an extra nav background subtle change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.opacity = "0.98";
        } else {
            navbar.style.opacity = "1";
        }
    });
});
