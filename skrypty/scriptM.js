document.addEventListener('DOMContentLoaded', function () {
const button = document.querySelector('.dropdownToggle');
const menu = document.querySelector('.dropDownMenu');

const koszykBtn = document.getElementById("koszyk");

const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
koszykBtn.textContent = `Koszyk (${cart.length})`;

      // toggle
button.addEventListener('click', function (event) {
  event.preventDefault(); 
  event.stopPropagation();
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

     // ukryj gdy klikniesz poza
document.addEventListener('click', function (event) {
  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.style.display = 'none';
    }
  });
});

