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
    console.log("Fetching latest images from Cloudinary...");

    const cloudinaryJsonURL = "https://res.cloudinary.com/dujlwpbrv/raw/upload/cloudinary_p9cutd.json";

    fetch(cloudinaryJsonURL + `?timestamp=${new Date().getTime()}`) // Force fresh fetch
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load JSON: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Latest cloudinary.json fetched:", data); // Debugging

            ["services", "projects"].forEach(category => {
                const slots = 3;
                for (let i = 0; i < slots; i++) {
                    if (!data[category] || !data[category][i]) {
                        console.warn(`⚠️ No image found for ${category}-${i} in JSON`);
                        continue;
                    }

                    const imageUrl = data[category][i];
                    const imgElement = document.getElementById(`${category}-${i}`);

                    if (imageUrl && imgElement) {
                        console.log(`🖼️ Updating ${category}-${i} with ${imageUrl}`);
                        imgElement.src = imageUrl + `?timestamp=${new Date().getTime()}`; // Prevent caching
                    } else {
                        console.warn(`⚠️ Missing image element for ${category}-${i}`);
                    }
                }
            });
        })
        .catch(error => console.error("🚨 Failed to load images:", error));
}

window.onload = function() {
    loadImages();
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
