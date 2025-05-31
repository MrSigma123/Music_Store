document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.btn');
  const menu = document.getElementById('menu');

  // Toggle menu on button click
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  // Hide menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !button.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
});