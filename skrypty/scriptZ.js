/* serce calego sklepu, czyli tworzenie listy przedmiotow do sprzedazy wczytanej z JSON servera, wyszukiwarka, dodawanie itemkow do koszyka, itp */

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

    // img
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.alt;
    img.classList.add('itemImage');
    li.appendChild(img);

    // opis 
    const itemInfo = document.createElement('div');
    itemInfo.classList.add('itemInfo');
    li.appendChild(itemInfo);

    // itemHeader
    const itemHeader = document.createElement('div');
    itemHeader.classList.add('itemHeader');
    itemInfo.appendChild(itemHeader);

    // nazwa
    const itemTitle = document.createElement('span');
    itemTitle.classList.add('itemTitle');
    itemTitle.textContent = item.title;
    itemHeader.appendChild(itemTitle);

    // cena itemka
    const itemPrice = document.createElement('span');
    itemPrice.classList.add('itemPrice');
    itemPrice.textContent = item.price;
    itemHeader.appendChild(itemPrice);

    // span.itemDescription
    const itemDescription = document.createElement('span');
    itemDescription.classList.add('itemDescription');
    itemDescription.textContent = item.description;
    itemInfo.appendChild(itemDescription);

    // przycisk i powiadomienie won na prawo
    const koszykContainer = document.createElement('div');
    koszykContainer.classList.add('koszykContainer');
    itemInfo.appendChild(koszykContainer);

    // przycisk koszyk
    const btn = document.createElement('button');
    btn.classList.add('doKoszyka');
    btn.textContent = 'Dodaj do koszyka';
    koszykContainer.appendChild(btn);

    // powiadomienie ze dodano
    const msg = document.createElement('span');
    msg.classList.add('addedMsg');
    msg.textContent = 'Dodano do koszyka!';
    koszykContainer.appendChild(msg);


    //dodaje do listy koszyka wybrany itemek
    btn.addEventListener('click', () => {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.push({
        title: item.title,
        price: item.price,
        img: item.image
      });
      sessionStorage.setItem('cart', JSON.stringify(cart));

      updateKoszykCount();

      // powiadomienie
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


//wyszukiwara
searchInput.addEventListener('input', () => {
  const szuka = searchInput.value.toLowerCase();

  const filtered = allItems.filter(item =>
    item.title.toLowerCase().includes(szuka)
  );

  renderItems(filtered);
  applyFilters();
})