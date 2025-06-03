/* wnetrze koszyka */

const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("total");

const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

let sum = 0;

function renderCart() {
    cartList.innerHTML = "";
    sum = 0;

    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Twój koszyk jest pusty!";
        cartList.appendChild(li);
        totalPrice.textContent = "";
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        const img = document.createElement("img");
        img.src = item.img;
        img.classList.add("cartImage");

        const titleSpan = document.createElement("span");
        titleSpan.textContent = `${item.title} - `;
        titleSpan.classList.add("itemTitle");

        const priceSpan = document.createElement("span");
        priceSpan.textContent = item.price;
        priceSpan.classList.add("itemPrice");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Usuń";
        deleteBtn.classList.add("usunBtn");

        deleteBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });

        li.appendChild(img);
        li.appendChild(titleSpan);
        li.appendChild(priceSpan);
        li.appendChild(deleteBtn);
        cartList.appendChild(li);

        const price = parseFloat(item.price.replace(",", "."));
        if (!isNaN(price)) {
            sum += price;
        }
    });

    totalPrice.innerHTML = "";
    const sumaSpan = document.createElement("span");
    sumaSpan.textContent = `Suma: ${sum.toFixed(2)} zł`;
    sumaSpan.classList.add("suma");
    totalPrice.appendChild(sumaSpan);
}

renderCart();
