document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.btnDropdown');
  const menu = document.getElementById('menu');


  // toggle
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  // ukryj
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !button.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
});
