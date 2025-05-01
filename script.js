document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Bio image animation on scroll with reset functionality
    const animateBioImages = function() {
        const bioImages = document.querySelectorAll('.bio-image');
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element is entering viewport - add show class
                        entry.target.classList.add('show');
                    } else {
                        // Element is leaving viewport - remove show class
                        entry.target.classList.remove('show');
                    }
                });
            }, observerOptions);
            
            // Observe all bio images
            bioImages.forEach(image => {
                observer.observe(image);
            });
        } 
        // Fallback for browsers that don't support IntersectionObserver
        else {
            const bioSections = document.querySelectorAll('.bio-section');
            let lastScrollPosition = window.scrollY;
            
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
                    rect.bottom >= 0
                );
            }
            
            function handleScroll() {
                const currentScrollPosition = window.scrollY;
                const scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
                lastScrollPosition = currentScrollPosition;
                
                bioSections.forEach(section => {
                    const bioImage = section.querySelector('.bio-image');
                    if (bioImage) {
                        if (isInViewport(section)) {
                            bioImage.classList.add('show');
                        } else {
                            // Only reset if scrolling up (optional)
                            if (scrollDirection === 'up') {
                                bioImage.classList.remove('show');
                            }
                        }
                    }
                });
            }
            
            // Initial check
            handleScroll();
            
            // Add scroll event listener with debounce
            let isScrolling;
            window.addEventListener('scroll', () => {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(handleScroll, 100);
            }, false);
        }
    };

    // Initialize the bio image animation
    animateBioImages();
});
// Add this to your existing Intersection Observer code
const animateTimeline = function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    // Remove this line if you don't want items to reset when scrolling up
                    entry.target.classList.remove('show');
                }
            });
        }, observerOptions);
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        function checkTimelineItems() {
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < window.innerHeight * 0.75) {
                    item.classList.add('show');
                }
            });
        }
        
        window.addEventListener('scroll', checkTimelineItems);
        checkTimelineItems(); // Initial check
    }
};

// Initialize the timeline animation
animateTimeline();
// Dans script.js
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href').startsWith('index.html')) {
            // Si le lien pointe vers l'accueil, laisser le comportement par défaut
            return true;
        }
        
        if(this.hash) {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});