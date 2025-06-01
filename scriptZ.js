const searchInput = document.getElementById('search');
const itemList = document.getElementById('itemList');
const categoryLinks = document.querySelectorAll('#menu a');


let allItems = [];
let activeCategory = '';
const koszykBtn = document.getElementById("koszyk");

categoryLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    activeCategory = link.dataset.kategoria;
    applyFilters();
  });
});


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

activeCategory = getQueryParam('kategoria') || '';

function updateKoszykCount() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  koszykBtn.textContent = `Koszyk (${cart.length})`;
}

updateKoszykCount();

//filtracja
function renderItems(filteredItems) {
  itemList.innerHTML = '';

  filteredItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" class="itemImage">
      <div class="itemInfo">
        <div class="itemHeader">
          <span class="itemTitle">${item.title}</span>
          <span class="itemPrice">${item.price}</span>
        </div>
        <div class="itemDescription">${item.description}</div>

        <div class="koszykContainer">
          <button class="doKoszyka">Dodaj do koszyka</button>
          <span class="addedMsg">Dodano do koszyka!</span>
        </div>
      </div>
    `;

    const btn = li.querySelector('.doKoszyka');
    const msg = li.querySelector('.addedMsg');

    btn.addEventListener('click', () => {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.push({
        title: item.title,
        price: item.price
      });
      sessionStorage.setItem('cart', JSON.stringify(cart));

      updateKoszykCount();

      // tekst
      msg.classList.add('show');

      if (msg.timeoutId) {
        clearTimeout(msg.timeoutId);
      }

      msg.timeoutId = setTimeout(() => {
        msg.classList.remove('show');
        msg.timeoutId = null;
    }, 2000);
    });

    itemList.appendChild(li); 
  });
}

//naklada kategorie
function applyFilters() {
  const szuka = searchInput.value.toLowerCase();

  const filtered = allItems.filter(item => {
    const matchCategory = !activeCategory || item.kategoria === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(szuka);
    return matchCategory && matchSearch;
  });

  renderItems(filtered);
}

//wczytuje liste itemow

fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(items => {
    allItems = items;
    applyFilters();
  })
  .catch(err => console.error("Błąd:", err));


//wyszukiwarka
searchInput.addEventListener('input', () => {
  const szuka = searchInput.value.toLowerCase();

  const filtered = allItems.filter(item =>
    item.title.toLowerCase().includes(szuka)
  );

  renderItems(filtered);
  applyFilters();
})