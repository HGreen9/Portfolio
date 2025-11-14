// Dark mode toggle functionality
(function() {
  const DARK_MODE_KEY = 'portfolio-dark-mode';
  
  // Initialize dark mode from localStorage
  function initDarkMode() {
    // Preference order: cookie (server-visible) -> localStorage -> prefers-color-scheme
    function getCookie(name) {
      const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }

    const cookiePref = getCookie(DARK_MODE_KEY);
    const lsPref = localStorage.getItem(DARK_MODE_KEY);
    var applied = false;
    if (cookiePref === 'true') {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      applied = true;
    } else if (lsPref === 'true') {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      applied = true;
    } else if (cookiePref === null && lsPref === null) {
      // fallback to OS preference
      try {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark-mode');
          document.body.classList.add('dark-mode');
          // store to both cookie and localStorage so navigation stays consistent
          try { localStorage.setItem(DARK_MODE_KEY, 'true'); } catch (e) {}
          document.cookie = DARK_MODE_KEY + '=true; path=/; max-age=' + (60*60*24*365) + '; SameSite=Lax';
          applied = true;
        }
      } catch (e) {}
    }
    updateToggleButton();
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    var html = document.documentElement;
    var body = document.body;
    var nowDark = !(html.classList.contains('dark-mode') || body.classList.contains('dark-mode'));
    if (nowDark) {
      html.classList.add('dark-mode');
      body.classList.add('dark-mode');
      try { localStorage.setItem(DARK_MODE_KEY, 'true'); } catch (e) {}
      // set cookie for server-rendered pages
      document.cookie = DARK_MODE_KEY + '=true; path=/; max-age=' + (60*60*24*365) + '; SameSite=Lax';
    } else {
      html.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
      try { localStorage.setItem(DARK_MODE_KEY, 'false'); } catch (e) {}
      // delete cookie
      document.cookie = DARK_MODE_KEY + '=; path=/; max-age=0; SameSite=Lax';
    }
    updateToggleButton();
  }
  
  // Helper: are we in dark mode (either html or body has the class)?
  function isDark() {
    return document.documentElement.classList.contains('dark-mode') || document.body.classList.contains('dark-mode');
  }

  // Update toggle button icon
  function updateToggleButton() {
    const button = document.getElementById('dark-mode-toggle');
    if (button) {
      const isDarkMode = isDark();
      const sunSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun" style="color: hsl(51, 100%, 45%);"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
      const moonSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star-icon lucide-moon-star" style="color: hsla(260, 62%, 29%, 1.00);"><path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';

      // Ensure icon span exists (don't replace entire button contents)
      let iconEl = button.querySelector('.icon');
      if (!iconEl) {
        iconEl = document.createElement('span');
        iconEl.className = 'icon';
        iconEl.setAttribute('aria-hidden', 'true');
        button.insertBefore(iconEl, button.firstChild);
      }
      iconEl.innerHTML = isDarkMode ? sunSvg : moonSvg;

      // Ensure tooltip exists
      let tooltip = button.querySelector('.tooltip');
      if (!tooltip) {
        tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.setAttribute('role', 'tooltip');
        button.appendChild(tooltip);
      }
      tooltip.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';

      // Ensure screen-reader description exists
      let srDesc = document.getElementById('dark-mode-desc');
      if (!srDesc) {
        srDesc = document.createElement('span');
        srDesc.id = 'dark-mode-desc';
        srDesc.className = 'sr-only';
        button.appendChild(srDesc);
      }
      srDesc.textContent = isDarkMode ? 'Light mode active' : 'Dark mode active';
      button.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');

      // Tooltip and screen-reader description already ensured and updated above
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
