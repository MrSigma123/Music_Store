/* skrypty uzywane w podsumowaniu, czyli formularz-zamularz oraz mini-lista zakupów */

const form = document.getElementById("orderForm");
const dialog = document.getElementById("confirmDialog");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    dialogContent.innerHTML = "";

    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Twój koszyk jest pusty!");
        return;
    }

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    let sum = 0;
    const items = cart.map(item => {
        const price = parseFloat(item.price.replace(",", "."));
        sum += isNaN(price) ? 0 : price;
        return { title: item.title, price: item.price };
    });

        const boldHeader = document.createElement("strong");
        boldHeader.textContent = "Czy twoje dane są prawidłowe?";
        const header = document.createElement("p");
        header.appendChild(boldHeader);
        dialogContent.appendChild(header);

        const dataP = document.createElement("p");
        dataP.innerHTML = `
        Imię i nazwisko: ${userData.name} ${userData.surname}<br>
        Email: ${userData.email}<br>
        Telefon: ${userData.phone}<br>
        Adres: ${userData.address}`; 
        dialogContent.appendChild(dataP);
        
    const showConfirmDialog = (message) => {
        return new Promise((resolve) => {
            dialog.showModal();

            confirmBtn.onclick = () => {
                dialog.close();
                resolve(true);
            };

            cancelBtn.onclick = () => {
                dialog.close();
                resolve(false);
            };
        });
    };

    const confirmed = await showConfirmDialog();
    if (!confirmed) return;

    const orderData = {
        client: userData,
        items: items,
        total: sum.toFixed(2)
    };

    try {
        const res = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        if (res.ok) {
            const savedOrder = await res.json();
            const orderId = savedOrder.id;
            sessionStorage.setItem("lastOrderId", orderId);
            alert("Zamówienie zostało złożone!");
            window.location.href = "dzieki.html";
        } else {
            alert("Błąd serwera. Upewnij się, że wszystkie dane są poprawne.");
        }
    } catch (err) {
        console.error(err);
        alert("Nie udało się połączyć z serwerem...");
    }
});


function renderSimpleCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const summary = {};

    let total = 0;

    cart.forEach(item => {
        const key = item.title;
        const price = parseFloat(item.price.replace(",", "."));
        total += isNaN(price) ? 0 : price;

        if (summary[key]) {
            summary[key].count += 1;
        } else {
            summary[key] = { count: 1 };
        }
    });

    const list = document.getElementById("simpleCartList");
    const totalDisplay = document.getElementById("simpleTotal");

    if (list && totalDisplay) {
        list.innerHTML = "";

        for (const [name, data] of Object.entries(summary)) {
            const li = document.createElement("li");
            li.textContent = `${name} × ${data.count}`;
            list.appendChild(li);
        }

        totalDisplay.textContent = `${total.toFixed(2)} zł`;
    }
}

renderSimpleCart();