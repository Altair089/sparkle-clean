// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.background = 'white';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > navbar.offsetHeight) {
            // Scroll down
            navbar.style.transform = `translateY(-${navbar.offsetHeight}px)`;
            navbar.style.boxShadow = 'none';
        } else {
            // Scroll up
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const phone = this.querySelector('[name="phone"]').value;
            const service = this.querySelector('[name="service"]').value;
            const message = this.querySelector('[name="message"]').value;

            // Create formatted text content
            const timestamp = new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'long'
            });

            const formContent = `
===========================================
CONTACT FORM SUBMISSION
===========================================
Date & Time: ${timestamp}
-------------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
===========================================

`;

            // Save to file
            saveToFile(formContent);

            // Show success message
            alert('Thank you for your message! Your details have been saved. We will get back to you soon.');

            // Reset form
            this.reset();
        });
    }

    // Function to save data to a local text file
    function saveToFile(content) {
        try {
            // Create a blob with the content (UTF-8 encoded)
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

            // Create a temporary link element
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;

            // Set the filename with timestamp
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
            const filename = `contact_submission_${dateStr}_${timeStr}.txt`;
            link.download = filename;

            // Make sure the link is hidden
            link.style.display = 'none';

            // Append to body, trigger download, then remove
            document.body.appendChild(link);
            link.click();

            // Clean up after a short delay to ensure download starts
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);

            console.log('Form data saved to:', filename);
        } catch (error) {
            console.error('Error saving to file:', error);
            alert('There was an error saving the file. Please try again.');
        }
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .stat, .testimonial');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.service-card, .stat, .testimonial').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Testimonial Slider (Simple Version)
    let currentTestimonial = 0;
    const testimonials = [
        {
            text: "The best cleaning service I've ever used! My home has never been cleaner.",
            author: "Sarah Johnson"
        },
        {
            text: "Professional, punctual, and thorough. I highly recommend SparkleClean!",
            author: "Michael Brown"
        },
        {
            text: "They did an amazing job on our office. Will definitely use them again.",
            author: "Emily Davis"
        }
    ];

    function showTestimonial(index) {
        const testimonialContainer = document.querySelector('.testimonial');
        if (testimonialContainer) {
            testimonialContainer.innerHTML = `
                <p>"${testimonials[index].text}"</p>
                <div class="client">- ${testimonials[index].author}</div>
            `;
        }
    }

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Initialize first testimonial
    showTestimonial(0);
});
