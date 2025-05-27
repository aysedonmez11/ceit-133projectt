document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Your message has been sent. Thank you!');
      form.reset();
    });
  }
});
function isLoggedIn() {
    // Check if user is logged in by looking at localStorage
    return localStorage.getItem('userToken') !== null;
}

function checkAuth() {
    // This function would be called on pages that require authentication
    if (!isLoggedIn()) {
        // Redirect to login page with a return URL
        const currentPage = window.location.pathname.split('/').pop();
        window.location.href = `login.html?returnUrl=${encodeURIComponent(currentPage)}`;
        return false;
    }
    return true;
}

function logout() {
    // Clear user session
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

// Add event listener for logout button if it exists
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});
