// Dark mode toggle functionality
(function() {
  const DARK_MODE_KEY = 'portfolio-dark-mode';
  
  // Initialize dark mode from localStorage
  function initDarkMode() {
    const isDarkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      updateToggleButton();
    }
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem(DARK_MODE_KEY, isDarkMode);
    updateToggleButton();
  }
  
  // Update toggle button icon
  function updateToggleButton() {
    const button = document.getElementById('dark-mode-toggle');
    if (button) {
      const isDarkMode = document.body.classList.contains('dark-mode');
      button.innerHTML = isDarkMode ? 
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun" style="color: hsl(51, 100%, 45%);"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>' : 
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star-icon lucide-moon-star" style="color: hsla(260, 62%, 29%, 1.00);"><path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';
      button.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  
  // Set up the toggle button
  function setupToggleButton() {
    const button = document.getElementById('dark-mode-toggle');
    if (button) {
      button.addEventListener('click', toggleDarkMode);
      updateToggleButton();
    }
  }
  
  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initDarkMode();
      setupToggleButton();
    });
  } else {
    initDarkMode();
    setupToggleButton();
  }
})();
