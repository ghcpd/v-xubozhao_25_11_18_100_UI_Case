// Fixed UI JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('modal');

    // Theme toggle functionality
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        console.log('Dark mode:', document.body.classList.contains('dark-mode'));
    });

    // Modal functionality
    openModalBtn.addEventListener('click', function() {
        modal.classList.remove('hidden');
        console.log('Modal opened');
    });

    closeModalBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
        console.log('Modal closed');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    console.log('Fixed UI loaded - All issues resolved: UI-001 ✓, UI-002 ✓, UI-003 ✓');
});
