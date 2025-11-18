// Fixed JavaScript - Modal functionality (same as buggy, but modal works correctly with fixed CSS)

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModal');
    const closeBtn = document.querySelector('.close');
    const closeButton = document.querySelector('.close-button');

    // Toggle dark mode (for testing UI-002)
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    };

    // Add dark mode toggle on double-click (for testing)
    document.addEventListener('dblclick', toggleDarkMode);

    // Open modal
    openModalBtn.addEventListener('click', function() {
        modal.classList.add('show');
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    closeButton.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});

