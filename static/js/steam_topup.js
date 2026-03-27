document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.querySelector('input[type="number"]');
    const loginInput = document.querySelector('input[type="text"]');
    const amountButtons = document.querySelectorAll(".amount-btn");
    const paymentButtons = document.querySelectorAll(".payment");
    const payButton = document.querySelector(".pay-btn");

    const summaryAmount = document.querySelector(".summary-row strong");
    const summaryRows = document.querySelectorAll(".summary-row");
    const summaryPayment = summaryRows[2].querySelector("span:last-child");
    const summaryTotal = summaryRows[3].querySelector("strong");

    let selectedPayment = "Не выбран";

    amountButtons.forEach((button) => {
        button.addEventListener("click", () => {
            amountButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            const amount = button.textContent.replace(/[^\d]/g, "");
            amountInput.value = amount;
            updateSummary();
        });
    });

    paymentButtons.forEach((button) => {
        button.addEventListener("click", () => {
            paymentButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            selectedPayment = button.textContent.trim();
            updateSummary();
        });
    });

    amountInput.addEventListener("input", updateSummary);

    function updateSummary() {
        const amount = amountInput.value ? `${amountInput.value} ₽` : "0 ₽";

        summaryAmount.textContent = amount;
        summaryTotal.textContent = amount;
        summaryPayment.textContent = selectedPayment;
    }

    payButton.addEventListener("click", (e) => {
        if (!loginInput.value.trim()) {
            e.preventDefault();
            alert("Введите Steam login");
            return;
        }

        if (!amountInput.value || Number(amountInput.value) <= 0) {
            e.preventDefault();
            alert("Введите корректную сумму");
            return;
        }

        if (selectedPayment === "Не выбран") {
            e.preventDefault();
            alert("Выберите способ оплаты");
        }
    });
});