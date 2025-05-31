const searchInput = document.getElementById('search');
const itemList = document.getElementById('item-list');
const categoryLinks = document.querySelectorAll('#menu a');

let allItems = [];
let activeCategory = '';

categoryLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // NIE pozwól przeładować strony
    activeCategory = link.dataset.kategoria;
    applyFilters();
  });
});


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

activeCategory = getQueryParam('kategoria') || '';

function renderItems(filteredItems) {
  itemList.innerHTML = '';

filteredItems.forEach(item => {
  const li = document.createElement('li');
  li.innerHTML = `
    <img src="${item.image}" alt="${item.alt}" class="item-image">
    <div class="item-info">
      <div class="item-header">
        <span class="item-title">${item.title}</span>
        <span class="item-price">${item.price}</span>
      </div>
      <div class="item-description">${item.description}</div>
    </div>
    `;
    itemList.appendChild(li);
  });
}

function applyFilters() {
  const szuka = searchInput.value.toLowerCase();

  const filtered = allItems.filter(item => {
    const matchCategory = !activeCategory || item.kategoria === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(szuka);
    return matchCategory && matchSearch;
  });

  renderItems(filtered);
}

fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(items => {
    allItems = items;
    applyFilters();
  })
  .catch(err => console.error("Błąd:", err));

searchInput.addEventListener('input', () => {
  const szuka = searchInput.value.toLowerCase();

  const filtered = allItems.filter(item =>
    item.title.toLowerCase().includes(szuka)
  );

  renderItems(filtered);
});