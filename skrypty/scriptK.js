const contactForm = document.getElementById("contactForm");
const opinionForm = document.getElementById("opinionForm");

 // formularz wiadomosci
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

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
document.addEventListener("DOMContentLoaded", () => {
  const opinionForm = document.querySelector(".form-popup form");

  opinionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(opinionForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:3000/opinions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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