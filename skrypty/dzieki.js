const orderId = sessionStorage.getItem("lastOrderId");
const display = document.getElementById("order-id-display");

if (orderId && display) {
    display.textContent = `ID twojego zamówienia to: ${orderId}`;
} else {
    display.textContent = "Nie udało się pobrać ID zamówienia.";
}

sessionStorage.clear();