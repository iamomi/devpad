/**
 * DevToolBox Shared Utilities
 * Common functions for README modal and other shared functionality
 */

// README Modal Functions
async function openReadme() {
    const modal = document.getElementById('readme-modal');
    const content = document.getElementById('readme-content');

    if (!modal || !content) {
        console.error('README modal elements not found');
        return;
    }

    modal.classList.remove('hidden');

    try {
        const response = await fetch('README.md');
        if (!response.ok) throw new Error('README not found');
        const markdown = await response.text();
        content.innerHTML = marked.parse(markdown);
    } catch (e) {
        content.innerHTML = '<p class="text-rose-400">Error loading README.md: ' + e.message + '</p>';
    }
}

function closeReadme() {
    const modal = document.getElementById('readme-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Initialize README modal event listeners
function initReadmeModal() {
    const readmeBtn = document.getElementById('readme-btn');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('readme-modal');

    if (readmeBtn) {
        readmeBtn.addEventListener('click', openReadme);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeReadme);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'readme-modal') {
                closeReadme();
            }
        });
    }

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeReadme();
        }
    });
}

// Call this function when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReadmeModal);
} else {
    initReadmeModal();
}
