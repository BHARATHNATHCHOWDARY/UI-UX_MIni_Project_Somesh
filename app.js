// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            // Simulate form submission
            const button = this.querySelector('.btn-primary');
            const originalText = button.textContent;
            
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed! ✓';
                button.style.background = 'linear-gradient(45deg, #00FF00, #32CD32)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Stats counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Counter animation function
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const isPrice = element.textContent.includes('$');
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue;
            if (isPrice) {
                displayValue = '$' + formatNumber(Math.floor(current));
                if (target >= 1000000) {
                    displayValue = '$' + (Math.floor(current / 1000000)) + 'M+';
                }
            } else if (target >= 1000000) {
                displayValue = (Math.floor(current / 1000000)) + '.' + Math.floor((current % 1000000) / 100000) + 'M+';
            } else if (target >= 1000) {
                displayValue = formatNumber(Math.floor(current)) + '+';
            } else {
                displayValue = Math.floor(current) + '+';
            }
            
            element.textContent = displayValue;
        }, 16);
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Scroll reveal animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add reveal class to elements and observe them
    const revealElements = document.querySelectorAll('.featured-games, .features, .community, .footer');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Game card interactions
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            const color = this.getAttribute('data-color');
            this.style.boxShadow = `0 20px 40px ${color}33`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const platform = this.getAttribute('data-platform');
            const colors = {
                discord: '#5865F2',
                twitter: '#1DA1F2',
                twitch: '#9146FF',
                youtube: '#FF0000'
            };
            
            if (colors[platform]) {
                this.style.boxShadow = `0 8px 25px ${colors[platform]}40`;
                this.style.borderColor = colors[platform];
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });

    // Feature card stagger animation
    const featureCards = document.querySelectorAll('.feature-card');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        featureObserver.observe(card);
    });

    // Button click effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.particles');
        if (parallax) {
            parallax.style.transform = `translate(-200px, ${-scrolled * 0.5 - 100}px)`;
        }
    });

    // Game card click handlers
    document.querySelectorAll('.btn-game').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const gameTitle = this.closest('.game-card').querySelector('.game-title').textContent;
            
            // Simulate game launch
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                alert(`Launching ${gameTitle}! (This is a demo)`);
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    });

    // Hero CTA button handlers
    document.querySelector('.btn-primary').addEventListener('click', function(e) {
        if (this.textContent.trim() === 'PLAY NOW') {
            e.preventDefault();
            document.querySelector('#games').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    document.querySelector('.btn-secondary').addEventListener('click', function(e) {
        if (this.textContent.trim() === 'VIEW GAMES') {
            e.preventDefault();
            document.querySelector('#games').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
