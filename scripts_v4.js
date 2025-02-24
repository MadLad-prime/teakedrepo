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
            if (sectionTop < window.innerHeight * 0.75 && sectionBottom >= 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    };

    // Run on page load and scroll
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);

    // Lazy load images for better performance
    const lazyLoadImages = () => {
        const images = document.querySelectorAll("img[data-src]");
        images.forEach((img) => {
            if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
            }
        });
    };

    // Run on page load and scroll
    lazyLoadImages();
    window.addEventListener("scroll", lazyLoadImages);

    // Admin button functionality
    const adminButton = document.getElementById("admin-button");
    if (adminButton) {
        adminButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            const password = prompt("Enter admin password:");
            if (password === "092") { // Replace with your actual password
                window.location.href = "admin.html";
            } else {
                alert("Incorrect password!");
            }
        });
    }
});
