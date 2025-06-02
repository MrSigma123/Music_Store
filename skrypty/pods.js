const form = document.getElementById("orderForm");

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if(cart.length===0){
        alert("Twój koszyk jest pusty!");
        return;
    }

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    let sum=0;
    const items = cart.map(item=>{
        const price = parseFloat(item.price.replace(",","."));
        sum+=isNaN(price)? 0 : price;
        return{ title: item.title, price: item.price};
    });
    
    const confirmMsg = `Czy twoje dane sa prawidłowe?\n\nImię i nazwisko: ${userData.name} ${userData.surname}\nEmail: ${userData.email}\nTelefon: ${userData.phone}\nAdres: ${userData.address}\n\nKwota: ${sum.toFixed(2)} zł`;

    if(confirm(confirmMsg)) {
        const orderData = {
            client: userData,
            items: items,
            total: sum.toFixed(2)
        };

        try{
            const res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });
            
            if(res.ok){
                alert("Zamówienie zostało złożone!");
                sessionStorage.clear();
                window.location.href="dzieki.html";
            } else {
                alert("Wystąpił błąd przy składaniu zamówienia, upewnij się, że wszystkie podane dane są poprawne i spróbuj ponownie.");
            }
        } catch (err){
            alert("Nie udało się połączyć z serwerem...");
            console.error(err);
        }

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