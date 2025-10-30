
        // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {

            // --- JavaScript for Scroll Animations (Intersection Observer) ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add a staggered delay for each card
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, index * 100); // 100ms delay between cards
                        
                        // Stop observing once it's visible
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the card is visible
            });

            // Find all the cards and tell the observer to watch them
            const cards = document.querySelectorAll('.language-card');
            cards.forEach(card => {
                observer.observe(card);
            });

            // --- NEW: JavaScript for Page Navigation ---
            
            const mainView = document.getElementById('main-view');
            const learnMoreButtons = document.querySelectorAll('.btn-learn-more');
            const backButtons = document.querySelectorAll('.btn-back');

            // Function to show a page
            function showPage(pageId) {
                // Hide the main grid
                mainView.classList.add('view-hidden');

                // Find and show the target page
                const targetPage = document.querySelector(pageId);
                if (targetPage) {
                    targetPage.classList.remove('view-hidden');
                    // Scroll to the top of the new view
                    window.scrollTo(0, 0);
                }
            }

            // Function to show the main grid
            function showMainGrid() {
                // Hide all detail pages
                document.querySelectorAll('.detail-page').forEach(page => {
                    page.classList.add('view-hidden');
                });
                
                // Show the main grid
                mainView.classList.remove('view-hidden');
                // Scroll to the top
                window.scrollTo(0, 0);
            }

            // Add click listeners to all "Learn More" buttons
            learnMoreButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetPageId = button.getAttribute('data-target');
                    showPage(targetPageId);
                });
            });

            // Add click listeners to all "Back" buttons
            backButtons.forEach(button => {
                button.addEventListener('click', () => {
                    showMainGrid();
                });
            });

            // --- NEW: JavaScript for Framework Modal ---
            
            const modalOverlay = document.getElementById('framework-modal-overlay');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');
            const modalCloseBtn = document.getElementById('modal-close-btn');

            // Function to show the modal
            function showModal(title, description) {
                if (!modalOverlay || !modalTitle || !modalDescription) return;
                
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modalOverlay.classList.remove('view-hidden'); // This removes display:none
                // We use modal-visible for the opacity transition
                // Need to use a short timeout to allow the 'display' to change first
                setTimeout(() => {
                    modalOverlay.classList.add('modal-visible');
                }, 10); 
            }

            // Function to hide the modal
            function hideModal() {
                if (!modalOverlay) return;
                
                modalOverlay.classList.remove('modal-visible'); // This starts the fade-out
                // Wait for animation to finish before hiding
                setTimeout(() => {
                    modalOverlay.classList.add('view-hidden');
                }, 300); // Must match CSS transition duration
            }

            // Add click listener to the main grid for framework items
            mainView.addEventListener('click', (e) => {
                // Find the closest framework-item parent
                const frameworkItem = e.target.closest('.framework-item');
                
                if (frameworkItem) {
                    const title = frameworkItem.getAttribute('data-title');
                    const description = frameworkItem.getAttribute('data-description');
                    
                    if (title && description) {
                        showModal(title, description);
                    }
                }
            });

            // --- NEW: Add *another* listener to the detail pages container ---
            const detailPagesContainer = document.getElementById('detail-pages-container');
            
            if (detailPagesContainer) {
                detailPagesContainer.addEventListener('click', (e) => {
                    // Find the closest framework-item parent
                    const frameworkItem = e.target.closest('.framework-item');
                    
                    if (frameworkItem) {
                        const title = frameworkItem.getAttribute('data-title');
                        const description = frameworkItem.getAttribute('data-description');
                        
                        if (title && description) {
                            showModal(title, description);
                        }
                    }
                });
            }

            // Add listeners to close the modal
            modalCloseBtn.addEventListener('click', hideModal);
            modalOverlay.addEventListener('click', (e) => {
                // Only close if the click is on the overlay itself, not the content
                if (e.target === modalOverlay) {
                    hideModal();
                }
            });

        });
