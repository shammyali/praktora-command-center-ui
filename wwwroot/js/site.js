
// Main site-wide JavaScript functionality

// Helper function to show toasts
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'info' ? 'primary' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'danger'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    const toastBody = document.createElement('div');
    toastBody.className = 'd-flex';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'toast-body';
    messageDiv.textContent = message;
    
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close btn-close-white me-2 m-auto';
    closeButton.setAttribute('data-bs-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'Close');
    
    toastBody.appendChild(messageDiv);
    toastBody.appendChild(closeButton);
    toast.appendChild(toastBody);
    
    // Create container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove from DOM after hiding
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Session storage extensions for complex objects
window.sessionStorageExtensions = {
    setObject: function(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    getObject: function(key) {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
};

// Local storage extensions for complex objects
window.localStorageExtensions = {
    setObject: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getObject: function(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
};
