document.addEventListener('DOMContentLoaded', function () {
  // === DROPDOWN MENU ===
  const buttons = document.querySelectorAll('.dropdownToggle');

  buttons.forEach(button => {
    const menu = button.nextElementSibling;

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      // Zamknij inne otwarte dropdowny
      document.querySelectorAll('.dropDownMenu').forEach(m => {
        if (m !== menu) m.style.display = 'none';
      });

      // przelacza
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.style.display = 'none';
      }
    });
  });

  // darek mode toggle
  const btn = document.getElementById("toggle-theme");
  const allTargets = [document.body, ...document.querySelectorAll("header, footer, .container")];

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    allTargets.forEach(el => {
      el.classList.add('dark');
      el.classList.remove('light');
    });
  } else if (savedTheme === 'light') {
    allTargets.forEach(el => {
      el.classList.add('light');
      el.classList.remove('dark');
    });
  } else {
    allTargets.forEach(el => el.classList.add('light'));
  }

  if (btn) {
    btn.textContent = allTargets[0].classList.contains('dark') ? "☀️ Tryb jasny" : "🌙 Tryb nocny";

    btn.addEventListener("click", () => {
      allTargets.forEach(el => {
        el.classList.toggle("dark");
        el.classList.toggle("light");
      });

      const isDark = allTargets[0].classList.contains("dark");
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      btn.textContent = isDark ? "☀️ Tryb jasny" : "🌙 Tryb nocny";
    });
  }

  // aktualizuje liczbe elementow w koszyku
  const koszykBtn = document.getElementById("koszyk");
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  if (koszykBtn) {
    koszykBtn.textContent = `Koszyk (${cart.length})`;
  }
});