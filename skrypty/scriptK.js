document.addEventListener("DOMContentLoaded", () => {
  // formularz wiadomosci
  const contactForm = document.querySelector("form:not(.form-popup form)");
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      imie: document.getElementById("imie").value,
      nazwisko: document.getElementById("nazwisko").value,
      email: document.getElementById("mail").value,
      kraj: document.getElementById("kraj").value,
      wiadomosc: document.getElementById("subject").value
    };

    try {
      const res = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      alert("Wiadomość wysłana.");
      contactForm.reset();
    } catch (err) {
      console.error("Błąd przy wysyłaniu wiadomości:", err);
      alert("Błąd przy wysyłaniu wiadomości.");
    }
  });

  // formularz opinie
  const opinionForm = document.querySelector(".form-popup form");
  opinionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const opinion = {
      produkt: document.getElementById("pname").value,
      ocena: document.getElementById("ocena").value,
      wyjasnienie: opinionForm.querySelector("#subject").value
    };

    try {
      const res = await fetch("http://localhost:3000/opinions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(opinion)
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      alert("Opinia wysłana.");
      opinionForm.reset();
      closeForm();
    } catch (err) {
      console.error("Błąd przy wysyłaniu opinii:", err);
      alert("Błąd przy wysyłaniu opinii.");
    }
  });
});

// popup opinii
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}