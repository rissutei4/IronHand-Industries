"use strict";
// All DOM element constants are declared at the top
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup-message");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message-content");
const body = document.querySelector("body");
const form = document.getElementById("order-form");
const closeBtn = document.querySelector(".close-btn");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");

// Function to display the pop-up with a given title and message
function displayPopup(title, message) {
    popupTitle.innerText = title;
    popupMessage.innerText = message;
    body.classList.toggle("open-menu-container", true);
    overlay.classList.toggle("hidden", false);
    popup.classList.toggle("hidden", false);
}

// Function to close/hide the pop-up
function closePopup() {
    overlay.classList.toggle("hidden", true);
    popup.classList.toggle("hidden", true);
    body.classList.toggle("open-menu-container", false);
}

// Form validation function using toggles for class changes
function validateForm() {
    // Remove previous error styles
    [nameInput, emailInput, phoneInput].forEach(input =>
        input.classList.toggle("is-invalid", false)
    );

    let isValid = true;

    // Validate name: must contain at least two words with alphabetic characters
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    if (!nameInput.value.trim() || !nameRegex.test(nameInput.value)) {
        isValid = false;
        nameInput.classList.toggle("is-invalid", true);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.toggle("is-invalid", true);
    }

    // Validate phone: must be numeric and 9 to 15 digits
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value)) {
        isValid = false;
        phoneInput.classList.toggle("is-invalid", true);
    }

    return isValid;
}

// Close the pop-up when the close button is clicked
closeBtn.addEventListener("click", closePopup);

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // If the form is not valid, compile the error messages and show them in the pop-up
    if (!validateForm()) {
        let errorMessages = [];

        // Check each field and add a message if invalid
        const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
        if (!nameInput.value.trim() || !nameRegex.test(nameInput.value)) {
            errorMessages.push("Full Name: Please enter your full name (at least two words).");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            errorMessages.push("Email Address: Please enter a valid email address.");
        }
        const phoneRegex = /^[0-9]{9,15}$/;
        if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value)) {
            errorMessages.push("Phone Number: Please enter a valid phone number (9-15 digits).");
        }

        // Combine errors into one message and display the pop-up
        const errorMessage = "Submission failed due to the following errors:\n" + errorMessages.join("\n");
        displayPopup("Error!", errorMessage);
        return;
    }

    // If form is valid, use fetch to submit the form data to prevent redirection
    const formData = new FormData(form);
    fetch(form.action, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayPopup("Success", "Your message has been sent successfully. Thank you!");
                form.reset(); // Optionally reset the form on success
            } else {
                displayPopup("Error", data.message || "An error occurred while sending your message.");
            }
        })
        .catch(error => {
            displayPopup("Error", "An error occurred during submission: " + error.message);
        });
});

// Fetch the API key from the Netlify function and set it in the hidden input
fetch("/.netlify/functions/get-api-key")
    .then(response => response.json())
    .then(data => {
        const accessKeyInput = document.getElementById("access_key");
        if (accessKeyInput) {
            const apiKey = Array.isArray(data.apiKey) ? data.apiKey[0] : data.apiKey;
            accessKeyInput.value = apiKey.trim();
        }
    })
    .catch(error => {
        console.error("Error fetching API key:", error);
    });
