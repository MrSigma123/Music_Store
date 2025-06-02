const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("total");

const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

let sum = 0;

function renderCart(){
    cartList.innerHTML = "";
    sum=0;

    if(cart.length === 0){
        cartList.innerHTML = "<li>Twój koszyk jest pusty!</li>";
        totalPrice.textContent = "";
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<img src='${item.img}' class='cartImage'><span class='itemTitle'> ${item.title} - </span><span class='itemPrice'> ${item.price} </span> <button class='usunBtn'>Usuń</button>`;
        cartList.appendChild(li);

        const price = parseFloat(item.price.replace(",", "."));
        if (!isNaN(price)){
            sum += price;
        }

        const deleteBtn = li.querySelector(".usunBtn");
        deleteBtn.addEventListener("click", ()=>{
            cart.splice(index, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        })


    });

    totalPrice.innerHTML = `<span class='suma'> Suma: ${sum.toFixed(2)} zł</span>`;
}

renderCart();
