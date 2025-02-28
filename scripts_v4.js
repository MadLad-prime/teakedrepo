document.addEventListener("DOMContentLoaded", function () {
    // Dropdown functionality
    const menuButton = document.getElementById("menu-button");
    const dropdownMenu = document.getElementById("dropdown-menu");

    menuButton.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle("visible");
    });

    document.addEventListener("click", function (event) {
        if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("visible");
        }
    });

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
            if (sectionTop < window.innerHeight * 0.75 && sectionBottom >= 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility);

    // Lazy load images with cache busting
    const lazyLoadImages = () => {
        document.querySelectorAll("img[data-src]").forEach((img) => {
            if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
                img.src = img.dataset.src + "?t=" + new Date().getTime();
                img.removeAttribute("data-src");
            }
        });
    };

    lazyLoadImages();
    window.addEventListener("scroll", lazyLoadImages);

    // Ensure latest images load on refresh without breaking localStorage updates
    window.onload = function () {
        console.log("Refreshing images while keeping LocalStorage data...");

        document.querySelectorAll("img").forEach((img) => {
            const imgId = img.id;
            const localStorageKey = `update_${imgId}`;

            if (imgId && localStorage.getItem(localStorageKey)) {
                // Use stored image URL if available
                img.src = localStorage.getItem(localStorageKey) + "?t=" + new Date().getTime();
                console.log(`Updated ${imgId} from LocalStorage`);
            } else {
                // Apply cache-busting to other images
                img.src = img.src.split("?")[0] + "?t=" + new Date().getTime();
            }
        });
    };
    function loadImages() {
    console.log("Loading images from localStorage...");
    ['services', 'projects'].forEach(category => {
        const slots = 3;
        for (let i = 0; i < slots; i++) {
            const key = `update_${category}_${i}`;
            const imageUrl = localStorage.getItem(key);
            if (imageUrl) {
                console.log(`Updating ${key} with URL: ${imageUrl}`);
                const imgElement = document.getElementById(`${category}-${i}`);
                if (imgElement) {
                    imgElement.src = imageUrl + `?timestamp=${new Date().getTime()}`;
                    console.log(`Successfully updated ${category}-${i}`);
                } else {
                    console.warn(`Image element ${category}-${i} not found.`);
                }
            } else {
                console.warn(`No image found in localStorage for ${key}`);
            }
        }
    });
    console.log("LocalStorage contents:", localStorage);
}

function cacheBustImages() {
    document.querySelectorAll("img.cache-bust").forEach(img => {
        const src = img.src.split("?")[0];
        img.src = `${src}?timestamp=${new Date().getTime()}`;
    });
    console.log("Cache-busting applied to images.");
}

function playVideo(container) {
    container.innerHTML = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/AU4mQDrCpIs?autoplay=1" frameborder="0" allowfullscreen></iframe>';
}

window.onload = function() {
    loadImages();
    cacheBustImages();
};

    // Admin button functionality
    const adminButton = document.getElementById("admin-button");
    if (adminButton) {
        adminButton.addEventListener("click", function (event) {
            event.preventDefault();
            const password = prompt("Enter admin password:");
            if (password === "092") {
                window.location.href = "admin.html";
            } else {
                alert("Incorrect password!");
            }
        });
    }
});
