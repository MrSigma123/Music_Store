/*
{
    title: "",
    price: "",
    description: "",
    image: "",
    alt: ""
  },
*/

const searchInput = document.getElementById('search');

const items = fetch("http://localhost:3000/products")
  .then(response => {
    if (!response.ok) {
      throw new Error('Błąd wczytywania pliku JSON');
    }
    return response.json();
  })
  .then(items => {
    const itemList = document.getElementById('item-list');

    items.forEach(item => {
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
  })
  .catch(error => console.error('Błąd:', error));

const itemList = document.getElementById('item-list');

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

renderItems(items);

searchInput.addEventListener('input', () => {
  const szuka = searchInput.value.toLowerCase();

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(szuka)
  );

  renderItems(filtered);
});