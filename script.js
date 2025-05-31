const piatti = [
  // Cucina Italiana
  { nome: "Pizza Margherita", prezzo: 10, cucina: "Italia" },
  { nome: "Lasagna", prezzo: 12, cucina: "Italia" },
  { nome: "Risotto ai funghi", prezzo: 11, cucina: "Italia" },
  { nome: "Tiramisù", prezzo: 6, cucina: "Italia" },

  // Cucina Bangladese
  { nome: "Biryani", prezzo: 12, cucina: "Bangladesh" },
  { nome: "Shorshe Ilish", prezzo: 14, cucina: "Bangladesh" },
  { nome: "Panta Ilish", prezzo: 10, cucina: "Bangladesh" },
  { nome: "Chingri Malai Curry", prezzo: 13, cucina: "Bangladesh" },

  // Cucina Egiziana
  { nome: "Koshari", prezzo: 8, cucina: "Egitto" },
  { nome: "Ful Medames", prezzo: 7, cucina: "Egitto" },
  { nome: "Molokhia", prezzo: 9, cucina: "Egitto" },
  { nome: "Taameya (Falafel egiziano)", prezzo: 6, cucina: "Egitto" }
];

const sezioni = {
  Italia: document.getElementById("italia"),
  Bangladesh: document.getElementById("bangladesh"),
  Egitto: document.getElementById("egitto")
};

const carrelloUl = document.getElementById("carrello");
const carrello = [];

piatti.forEach((piatto, index) => {
  const el = document.createElement("div");
  el.className = "menu-item";
  el.innerHTML = `
    <h3>${piatto.nome}</h3>
    <p><em>${piatto.cucina}</em></p>
    <p>€${piatto.prezzo.toFixed(2)}</p>
    <button class="btn" onclick="aggiungiAlCarrello(${index})">Aggiungi</button>
  `;
  sezioni[piatto.cucina].appendChild(el);
});

function aggiungiAlCarrello(index) {
  carrello.push(piatti[index]);
  aggiornaCarrello();
}

function aggiornaCarrello() {
  carrelloUl.innerHTML = "";
  carrello.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - €${p.prezzo}`;
    carrelloUl.appendChild(li);
  });
}

function compra() {
  if (carrello.length === 0) {
    alert("Il carrello è vuoto!");
    return;
  }

  const totale = carrello.reduce((acc, piatto) => acc + piatto.prezzo, 0);
  alert(`Grazie per l'acquisto! Totale: €${totale.toFixed(2)}`);
  carrello.length = 0;
  aggiornaCarrello();
}



