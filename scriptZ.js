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

const items = [
       {
    title: "Gitara Klasyczna",
    price: "1630 zł",
    description: "W sam raz dla początkujacych!",
    image: "grafiki/gitara2ibanez.jpg",
    alt: "instrument strunowy gitara klasyczna"
  },
  {
    title: "Gitara Dziewczęca",
    price: "750 zł",
    description: "Bo kto powiedział, że gitary są tylko dla chłopaków?",
    image: "grafiki/gitara3roz.jpg",
    alt: "instrument strunowy gitara różowa"
  },
  {
    title: "Epicka Gitara",
    price: "2580 zł",
    description: "Wyposaż się w niepowtarzalny styl już dziś!",
    image: "grafiki/gitara1harley.jpg",
    alt: "instrument strunowy gitara harley benton czarna stylowa"
  },
    {
    title: "Zepsuta Gitara",
    price: "10 zł",
    description: "Nadaje się idealnie do naprawy!",
    image: "grafiki/zepsutaGitara.jpg",
    alt: "zepsuty instrument strunowy gitara z dziurą"
  },
  {
    title: "Piekielna Gitara",
    price: "666.50 zł",
    description: "Prosto z czeluści piekieł!",
    image: "grafiki/piekielnaGitara.webp",
    alt: "zepsuty instrument strunowy gitara z dziurą"
  },
   {
    title: "Avocadolina",
    price: "550 zł",
    description: "Tylko u nas! Niezwykła i niespotykana, jedyna w swoim rodzaju, Mandolina-Avocado!",
    image: "grafiki/avocadolina.png",
    alt: "instrument strunowy mandolina w stylu avocado"
  },
    {
    title: "Złowieszcze Skrzypce",
    price: "326.66 zł",
    description: "Złe do samych kości! <br> Aż strach się bać!",
    image: "grafiki/skrzypceZlowieszcze.webp",
    alt: "Skrzypce z namalowaną ogromną czaszką"
  },
    {
    title: "Keyboard",
    price: "280 zł",
    description: "W zestawie ze stojakiem!",
    image: "grafiki/keyboard.jpg",
    alt: "instrument klawiszowy keyboard"
  },
  {
    title: "Super Keyboard",
    price: "980 zł",
    description: "Tłumy się same zbierają!",
    image: "grafiki/keyboard1.jpg",
    alt: "instrument klawiszowy keyboard ale fajniejszy"
  },
  {
    title: "Harpejji",
    price: "42 350 zł",
    description: "Bo kto bogatemu zabroni?",
    image: "grafiki/harpejji.jpg",
    alt: "instrument strunowy Harpejji"
  },
  {
    title: "Organy Piszczałkowe",
    price: "23 350 zł",
    description: "Kompaktowe i głośne, w sam raz do zostania znienawidzonym przez sąsiadów!",
    image: "grafiki/reedOrgan.webp",
    alt: "instrument klawiszowy organy piszczałkowe"
  },
    {
    title: "Organy Kościelne",
    price: "1 323 562.99 zł",
    description: "Z witrażem w zestawie! TotalNIE Gratis!",
    image: "grafiki/organyWitraz.jpg",
    alt: "instrument klawiszowy organy piszczałkowe"
  },
  {
    title: "Japońska Mandolina Samuraj",
    price: "84 zł",
    description: "Nie to, czego byś się spodziewał po nazwie!",
    image: "grafiki/japonskaMandolina.jpg",
    alt: "Mandolina kuchenna Samuraj (narzędzie kuchenne)"
  },
  {
    title: "Legendarne Złote Banjo",
    price: "55 zł",
    description: "Bardzo przyjemne i stylowe!",
    image: "grafiki/banjo1.jpg",
    alt: "instrument gitara banjo"
  }
];

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