const form = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePasswordBtn1 = document.getElementById("togglePassword1");
const togglePasswordBtn2 = document.getElementById("togglePassword2");
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

function hasLetter(password) {
    return /[A-Za-zА-Яа-я]/.test(password);
}

function hasNumber(password) {
    return /\d/.test(password);
}

function validateRegisterForm(username, email, password, confirmPassword) {
    if (!username || !email || !password || !confirmPassword) {
        return "Заполните все поля";
    }

    if (username.length < 3) {
        return "Имя пользователя должно быть не менее 3 символов";
    }

    if (!isValidEmail(email)) {
        return "Введите корректный email";
    }

    if (password.length < 8) {
        return "Пароль должен быть не менее 8 символов";
    }

    if (!hasLetter(password)) {
        return "Пароль должен содержать хотя бы одну букву";
    }

    if (!hasNumber(password)) {
        return "Пароль должен содержать хотя бы одну цифру";
    }

    if (password !== confirmPassword) {
        return "Пароли не совпадают";
    }

    return "";
}

function showError(message) {
    errorMessage.innerText = message;
}

function clearError() {
    errorMessage.innerText = "";
}

setupPasswordToggle(passwordInput, togglePasswordBtn1);
setupPasswordToggle(confirmPasswordInput, togglePasswordBtn2);

form.addEventListener("submit", (e) => {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    clearError();

    const error = validateRegisterForm(username, email, password, confirmPassword);

    if (error) {
        e.preventDefault();
        showError(error);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Создание...";
});