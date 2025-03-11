"use strict";

function validateForm() {
    // Select form inputs based on placeholder attributes
    const nameInput = document.querySelector('input[placeholder="Your name"]');
    const emailInput = document.querySelector('input[placeholder="Your email"]');
    const phoneInput = document.querySelector('input[placeholder="Phone Number"]');

    // Reset validation feedback by removing 'is-invalid' class
    [nameInput, emailInput, phoneInput].forEach(input => input.classList.remove('is-invalid'));

    let isValid = true;

    // Validate name: Must contain at least two words (alphabetic characters only)
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    if (!nameInput.value.trim() || !nameRegex.test(nameInput.value)) {
        isValid = false;
        nameInput.classList.add('is-invalid');
    }

    // Validate email with a simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('is-invalid');
    }

    // Validate phone: Must be numeric and between 9 to 15 digits
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value)) {
        isValid = false;
        phoneInput.classList.add('is-invalid');
    }

    return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
    // Attach the submit event to the form
    const form = document.querySelector('.form-container form');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default submission
        if (validateForm()) {
            console.log("Form is valid. Proceeding with submission...");
            form.submit();
        } else {
            console.log("Form is invalid. Please check the inputs.");
        }
    });

    // Fetch the API key from the Netlify function
    fetch("/.netlify/functions/get-api-key")
        .then((response) => response.json())
        .then((data) => {
            // This code expects a hidden input field with the id "access_key" in the form.
            const accessKeyInput = document.getElementById("access_key");
            if (accessKeyInput) {
                const apiKey = Array.isArray(data.apiKey) ? data.apiKey[0] : data.apiKey;
                accessKeyInput.value = apiKey.trim();
            }
        })
        .catch((error) => {
            console.error("Error fetching API key:", error);
        });
});
