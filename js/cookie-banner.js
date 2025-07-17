// Cookie banner logic
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  // Development helper: reset cookie consent (remove in production)
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    // Press Ctrl+Shift+R to reset cookie consent for testing
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.shiftKey && e.key === "R") {
        localStorage.removeItem("cookieConsent");
        location.reload();
      }
    });
  }

  // Check if user has already accepted cookies
  if (!localStorage.getItem("cookieConsent")) {
    banner.style.display = "flex";

    // Add fade-in animation
    setTimeout(() => {
      banner.style.opacity = "1";
      banner.style.transform = "translateY(0)";
    }, 100);
  }

  // Function to hide banner with animation
  function hideBanner() {
    banner.style.opacity = "0";
    banner.style.transform = "translateY(20px)";

    setTimeout(() => {
      banner.style.display = "none";
    }, 300);
  }

  // Accept button functionality
  const acceptBtn = document.getElementById("accept-cookies");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "accepted");
      hideBanner();
    });
  }

  // Close button functionality (if exists)
  const closeBtn = banner.querySelector(".cookie-banner__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "dismissed");
      hideBanner();
    });
  }

  // ESC key to dismiss banner
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && banner.style.display === "flex") {
      localStorage.setItem("cookieConsent", "dismissed");
      hideBanner();
    }
  });

  // Auto-hide after 15 seconds if not interacted
  let autoHideTimer;
  if (!localStorage.getItem("cookieConsent")) {
    autoHideTimer = setTimeout(() => {
      if (banner.style.display === "flex") {
        localStorage.setItem("cookieConsent", "auto-dismissed");
        hideBanner();
      }
    }, 15000);
  }

  // Clear timer if user interacts
  banner.addEventListener("click", function () {
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
    }
  });

  // Track banner interactions for analytics
  banner.addEventListener("click", function (e) {
    if (acceptBtn && e.target === acceptBtn) {
      // Track accept action
      console.log("Cookie consent accepted");
    } else if (closeBtn && e.target === closeBtn) {
      // Track dismiss action
      console.log("Cookie banner dismissed");
    }
  });
});
