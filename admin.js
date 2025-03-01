document.addEventListener("DOMContentLoaded", function () {
    console.log("admin.js loaded successfully");  // Debugging check

    checkPassword();
    updateSlotOptions();
    document.getElementById("image-category").addEventListener("change", updateSlotOptions);

    // Load previously uploaded images
    loadSavedImages();
});

// Ensure Cloudinary script is loaded
if (!window.cloudinary) {
    console.error("Cloudinary script failed to load!");
    alert("Cloudinary script is missing. Check your internet or script URL.");
} else {
    console.log("Cloudinary script loaded successfully.");
}

function checkPassword() {
    const password = prompt("Enter Admin Password:");
    const correctPassword = "admin123";
    if (password !== correctPassword || password === null) {
        alert("Incorrect password! Access denied.");
        window.location.href = "index.html";
    }
}

function updateSlotOptions() {
    const category = document.getElementById("image-category");
    const slotSelect = document.getElementById("image-slot");
    
    if (!category || !slotSelect) {
        console.error("Error: Dropdown elements not found!");
        return;
    }

    slotSelect.innerHTML = "";
    const slots = category.value === "services" ? 3 : 9;

    for (let i = 0; i < slots; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `Image ${i + 1}`;
        slotSelect.appendChild(option);
    }
}
function updateCloudinaryJSON(category, slot, imageUrl) {
    console.log(`🔄 Updating JSON for ${category}-${slot} with ${imageUrl}`);

    const cloudinaryJsonURL = "https://res.cloudinary.com/dujlwpbrv/raw/upload/cloudinary_dddt1s.json"; // Remove version ID

    fetch(cloudinaryJsonURL + `?timestamp=${new Date().getTime()}`) // Cache busting
        .then(response => {
            if (!response.ok) throw new Error(`❌ JSON fetch failed: ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Initialize category if missing
            if (!data[category]) data[category] = {}; 
            
            // Update slot
            data[category][slot] = imageUrl;

            // Prepare updated JSON
            const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const formData = new FormData();
            formData.append("file", jsonBlob);
            formData.append("upload_preset", "ml_default");
            formData.append("public_id", "cloudinary_dddt1s.json"); // Must include .json

            return fetch("https://api.cloudinary.com/v1_1/dujlwpbrv/raw/upload", {
                method: "POST",
                body: formData,
            });
        })
        .then(response => response.json())
        .then(result => {
            console.log("✅ JSON Updated:", result);
            alert("Image URL saved to Cloudinary!"); // Add user feedback
        })
        .catch(error => {
            console.error("🚨 Update failed:", error);
            alert("Failed to save changes. Check console.");
        });
}





function openUploadWidget() {
    console.log("openUploadWidget function called");

    const category = document.getElementById("image-category").value;
    const slot = document.getElementById("image-slot").value;

    const cloudName = "dujlwpbrv";  
    const uploadPreset = "ml_default";  

    if (!window.cloudinary) {
        console.error("Cloudinary script not loaded!");
        alert("Upload feature is unavailable. Please check Cloudinary settings.");
        return;
    }

    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            sources: ["local", "url"],
            multiple: false,
            cropping: false,
            resourceType: "image",
            maxFileSize: 5000000,
        },
        (error, result) => {
            console.log("Cloudinary Upload Response:", result);

            if (!error && result && result.event === "success") {
                const imageUrl = result.info.secure_url;
                console.log("Image uploaded URL:", imageUrl);

                // Save to shared JSON file instead of localStorage
                updateCloudinaryJSON(category, slot, imageUrl);

                alert("Image uploaded successfully!");
            } else if (error) {
                console.error("Upload error:", error);
                alert("Upload failed. Please try again.");
            }
        }
    );

    myWidget.open();
}





   

// Display uploaded image immediately after uploading
function displayImage(url, key) {
    const imgContainer = document.querySelector(".upload-container");

    // Remove existing image for the same slot
    const existingImage = document.querySelector(`img[data-key="${key}"]`);
    if (existingImage) {
        existingImage.remove();
    }

    let img = document.createElement("img");
    img.src = url;
    img.style.width = "100px";
    img.style.height = "100px";
    img.setAttribute("data-key", key); // Store key for easy removal
    imgContainer.appendChild(img);
}

// Load and display saved images on page load
function loadSavedImages() {
    console.log("Loading saved images...");

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("update_")) {
            const url = localStorage.getItem(key);
            displayImage(url, key);
        }
    }
}

function clearImages() {
    if (confirm("Are you sure you want to clear all images?")) {
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("update_")) {
                localStorage.removeItem(key);
            }
        });

        alert("All uploaded images cleared.");
        document.querySelectorAll(".upload-container img").forEach(img => img.remove());
    }
}

