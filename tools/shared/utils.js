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

        // Check if marked is available
        if (typeof marked !== 'undefined' && marked.parse) {
            content.innerHTML = marked.parse(markdown);
        } else {
            // Fallback to plain text with basic formatting
            content.innerHTML = '<pre class="whitespace-pre-wrap">' + markdown + '</pre>';
        }
    } catch (e) {
        content.innerHTML = '<p class="text-rose-400">Error loading README.md: ' + e.message + '</p>';
    }
}

function closeReadme() {
    const modal = document.getElementById('readme-modal');
    if (modal) {
        modal.classList.add('hidden');
        // Reset transform when closing
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = '';
        }
    }
}

// Make modal draggable using transform (no jump!)
function makeDraggable(modal) {
    const modalContent = modal.querySelector('.modal-content');
    const header = modalContent.querySelector('.flex.justify-between');

    if (!header) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;

    header.style.cursor = 'move';

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        // Don't drag if clicking on close button
        if (e.target.closest('button')) return;

        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();

        // Calculate translation from start position
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;

        // Use transform instead of left/top for smooth movement
        modalContent.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    function dragEnd() {
        isDragging = false;
    }
}

// Initialize README modal event listeners
function initReadmeModal() {
    const readmeBtn = document.getElementById('readme-btn');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('readme-modal');

    if (readmeBtn) {
        readmeBtn.addEventListener('click', openReadme);
    } else {
        console.warn('README button not found - id="readme-btn" missing');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeReadme);
    }

    if (modal) {
        // Click outside to close - DISABLED per user request
        // Only close button should close the modal
        // modal.addEventListener('click', (e) => {
        //     if (e.target.id === 'readme-modal') {
        //         closeReadme();
        //     }
        // });

        // Make modal draggable
        makeDraggable(modal);
    } else {
        console.warn('README modal not found - id="readme-modal" missing');
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
    // DOM already loaded, init immediately
    initReadmeModal();
}
