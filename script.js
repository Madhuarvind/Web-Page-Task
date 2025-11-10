// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle hero button clicks
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Load initial quote
    loadInspirationalQuote();

    // Handle new quote button
    const newQuoteBtn = document.getElementById('new-quote-btn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', loadInspirationalQuote);
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.about-card, .quote-display, .contact-form');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Inspirational quotes data (fallback if API fails)
const inspirationalQuotes = [
    {
        text: "The human spirit is stronger than anything that can happen to it.",
        author: "C.C. Scott"
    },
    {
        text: "Hope is the thing with feathers that perches in the soul.",
        author: "Emily Dickinson"
    },
    {
        text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
        author: "Mary Anne Radmacher"
    },
    {
        text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
        author: "A.A. Milne"
    },
    {
        text: "The most beautiful people are those who have known defeat, known suffering, known struggle, known loss, and have found their way out of the depths.",
        author: "Elisabeth Kübler-Ross"
    },
    {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
        author: "Vivian Greene"
    },
    {
        text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
        author: "Alan Watts"
    },
    {
        text: "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
        author: "Hippocrates"
    },
    {
        text: "Every day may not be good, but there's something good in every day.",
        author: "Alice Morse Earle"
    }
];

// Function to load inspirational quotes
async function loadInspirationalQuote() {
    const quoteContent = document.getElementById('quote-content');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    if (!quoteContent || !quoteAuthor) return;

    // Show loading state
    quoteContent.textContent = 'Loading inspirational quote...';
    quoteAuthor.textContent = '- Loading...';
    if (newQuoteBtn) newQuoteBtn.disabled = true;

    try {
        // Try to fetch from quotable API first
        const response = await fetch('https://api.quotable.io/random?tags=inspirational,motivational,wisdom&minLength=50&maxLength=200');
        
        if (response.ok) {
            const data = await response.json();
            quoteContent.textContent = data.content;
            quoteAuthor.textContent = `- ${data.author}`;
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        // Fallback to local quotes if API fails
        console.log('Using fallback quotes due to API error:', error);
        const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
        quoteContent.textContent = randomQuote.text;
        quoteAuthor.textContent = `- ${randomQuote.author}`;
    } finally {
        if (newQuoteBtn) newQuoteBtn.disabled = false;
    }
}

// Function to handle contact form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('form-message');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (since no backend is required)
    setTimeout(() => {
        // Reset form
        e.target.reset();
        
        // Show success message
        showFormMessage(
            `Thank you, ${name}! Your message has been received. We'll get back to you soon at ${email}.`,
            'success'
        );
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            hideFormMessage();
        }, 5000);
        
    }, 1500); // Simulate network delay
}

// Function to show form messages
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// Function to hide form messages
function hideFormMessage() {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.style.display = 'none';
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to cards
    const cards = document.querySelectorAll('.about-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Console message for developers
console.log('🎗️ Cancer Awareness & Support Website');
console.log('💝 Made with love for the community');
console.log('🚀 Ready to make a difference!');
