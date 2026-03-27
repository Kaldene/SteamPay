const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const errorMessage = document.getElementById("errorMessage");
const submitBtn = document.getElementById("submitBtn");

function setupPasswordToggle(input, button) {
    button.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            button.innerText = "Скрыть";
        } else {
            input.type = "password";
            button.innerText = "Показать";
        }
    });
}

function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}

function validateLoginForm(email, password) {
    if (!email || !password) {
        return "Заполните все поля";
    }

    if (!isValidEmail(email)) {
        return "Введите корректный email";
    }

    if (password.length < 6) {
        return "Пароль должен быть не менее 6 символов";
    }

    return "";
}

function showError(message) {
    errorMessage.innerText = message;
}

function clearError() {
    errorMessage.innerText = "";
}

setupPasswordToggle(passwordInput, togglePasswordBtn);

form.addEventListener("submit", (e) => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    clearError();

    const error = validateLoginForm(email, password);

    if (error) {
        e.preventDefault();
        showError(error);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Вход...";
});