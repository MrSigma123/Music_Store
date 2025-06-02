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