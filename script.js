const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const phone = document.getElementById("phone");
const terms = document.getElementById("terms");
const popup = document.getElementById("popup");

function setState(input, errorId, message) {
    const box = input.closest(".input-box");
    const error = document.getElementById(errorId);

    if (message) {
        box.classList.add("invalid");
        box.classList.remove("valid");
        error.textContent = message;
        return false;
    }

    box.classList.add("valid");
    box.classList.remove("invalid");
    error.textContent = "";
    return true;
}

function validateName() {
    if (fullname.value.trim().length < 3) {
        return setState(fullname, "error-fullname", "Full name must be at least 3 characters long.");
    }
    return setState(fullname, "error-fullname", "");
}

function validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email.value.trim())) {
        return setState(email, "error-email", "Please enter a valid email address.");
    }
    return setState(email, "error-email", "");
}

function validatePassword() {
    if (password.value.length < 6) {
        return setState(password, "error-password", "Password must be at least 6 characters long.");
    }
    return setState(password, "error-password", "");
}

function validateConfirmPassword() {
    if (confirmPassword.value === "" || confirmPassword.value !== password.value) {
        return setState(confirmPassword, "error-confirmpassword", "Passwords do not match.");
    }
    return setState(confirmPassword, "error-confirmpassword", "");
}

function validatePhone() {
    const digits = phone.value.replace(/\D/g, "");
    const onlyAllowedChars = /^\+?[0-9\s()-]+$/.test(phone.value.trim());

    if (!onlyAllowedChars || digits.length < 8 || digits.length > 15) {
        return setState(phone, "error-phone", "Please enter a valid phone number.");
    }
    return setState(phone, "error-phone", "");
}

function validateTerms() {
    const error = document.getElementById("error-terms");

    if (!terms.checked) {
        error.textContent = "You must accept the terms and conditions.";
        return false;
    }

    error.textContent = "";
    return true;
}

document.querySelectorAll(".eye").forEach(function (button) {
    button.addEventListener("click", function () {
        const input = button.closest(".input-box").querySelector("input");
       

        if (input.type === "password") {
            input.type = "text";
           
        } else {
            input.type = "password";
            
        }
    });
});

fullname.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
phone.addEventListener("input", validatePhone);
terms.addEventListener("change", validateTerms);
confirmPassword.addEventListener("input", validateConfirmPassword);

password.addEventListener("input", function () {
    validatePassword();
    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }
});

function resetForm() {
    form.reset();

    document.querySelectorAll(".input-box").forEach(function (box) {
        box.classList.remove("valid", "invalid");
    });

    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });

    document.querySelectorAll(".eye").forEach(function (button) {
        button.closest(".input-box").querySelector("input").type = "password";
        button.querySelector("i").className = "fa-solid fa-eye";
    });
}

function closePopup() {
    popup.classList.remove("show");
    resetForm();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const results = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
        validatePhone(),
        validateTerms()
    ];

    if (results.every(Boolean)) {
        popup.classList.add("show");
        setTimeout(closePopup, 5000);
    }
});