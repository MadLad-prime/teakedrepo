// scripts_v4.js
document.addEventListener("DOMContentLoaded", function () {
    // Dropdown functionality
    const menuButton = document.getElementById("menu-button");
    const dropdownMenu = document.getElementById("dropdown-menu");

    // Toggle dropdown visibility on button click
    menuButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click from bubbling up
        dropdownMenu.classList.toggle("visible");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("visible");
        }
    });

    // Optional: Close dropdown when clicking a link inside it
    dropdownMenu.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            dropdownMenu.classList.remove("visible");
        }
    });

    // Scroll animations for sections
    const sections = document.querySelectorAll("section");

    const checkVisibility = () => {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            // If the section is in the viewport
            if (sectionTop < window.innerHeight && sectionBottom >= 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    };

    // Run on page load and scroll
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
});