// Header and footer loading
document.addEventListener("DOMContentLoaded", function () {
  // Load header
  fetch("balls-out-partials/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;
    });

  // Load footer
  fetch("balls-out-partials/footer.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
    });
});
