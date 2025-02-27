document.addEventListener("DOMContentLoaded", function () {
    console.log("admin.js loaded");  // Debugging check
    checkPassword();
    updateSlotOptions();
    document.getElementById("image-category").addEventListener("change", updateSlotOptions);
});

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
        option.textContent = Image ${i + 1};
        slotSelect.appendChild(option);
    }
}

function openUploadWidget() {
    console.log("openUploadWidget function called");  // Debugging check

    const category = document.getElementById("image-category").value;
    const slot = document.getElementById("image-slot").value;

    const cloudName = "dujlwpbrv";  // Replace with your Cloudinary cloud name
    const uploadPreset = "isaac092";  // Replace with your upload preset

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
            if (!error && result && result.event === "success") {
                const imageUrl = result.info.secure_url;
                const key = update_${category}_${slot};
                localStorage.setItem(key, imageUrl);
                alert("Image uploaded successfully!");
            } else if (error) {
                console.error("Upload error:", error);
                alert("Upload failed. Please try again.");
            }
        }
    );

    myWidget.open();
}

function clearImages() {
    if (confirm("Are you sure you want to clear all images?")) {
        localStorage.clear();
        alert("All images cleared.");
    }
}
