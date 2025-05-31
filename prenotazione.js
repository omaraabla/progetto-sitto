const prenotazioni = [];

document.getElementById("formPrenotazione").addEventListener("submit", function (e) {
  e.preventDefault();

  const nomeInput = this.querySelector('input[type="text"]');
  const numPersoneInput = this.querySelector('input[type="number"]');
  const dataInput = this.querySelector('input[type="date"]');
  const oraInput = this.querySelector('input[type="time"]');

  const nome = nomeInput.value.trim();
  const numPersone = parseInt(numPersoneInput.value, 10);
  const data = dataInput.value;
  const ora = oraInput.value;

  const conferma = document.getElementById("confermaPrenotazione");

  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  const dataPrenotazione = new Date(data + 'T00:00:00');

  const [h, m] = ora.split(':').map(Number);
  const oraInMinuti = h * 60 + m;
  const inFasciaPranzo = oraInMinuti >= 12 * 60 && oraInMinuti < 15 * 60;
  const inFasciaCena = oraInMinuti >= 19 * 60 && oraInMinuti < 23 * 60;

  const postiPrenotati = prenotazioni
    .filter(p => p.data === data)
    .reduce((acc, p) => acc + p.numPersone, 0);

  // ✅ Controlli
  if (!nome || isNaN(numPersone) || numPersone < 1 || !data || !ora) {
    alert("Per favore compila tutti i campi correttamente.");
    //this.reset();
    return;
  }

  if (dataPrenotazione < oggi) {
    alert("La data selezionata è già passata.");
    //this.reset();
    return;
  }

  if (!inFasciaPranzo && !inFasciaCena) {
    alert("Orario non valido. Prenota tra le 12:00–15:00 o 19:00–23:00.");
    //this.reset();
    return;
  }

  if (postiPrenotati + numPersone > 50) {
    alert("Posti esauriti per questa data.");
    //this.reset();
    return;
  }

  // ✅ Tutto OK
  prenotazioni.push({ nome, numPersone, data, ora });
  salvaPrenotazione(nome.toLowerCase(), `${data} - ${ora} - ${numPersone} persone`);
  conferma.innerText = "✅ Prenotazione effettuata con successo!";
  conferma.style.display = "block";
  conferma.classList.add("visibile");
alert(
  `Prenotazione confermata!\n` +
  `Nome: ${nome}\n` +
  `Numero di persone: ${numPersone}\n` +
  `Data: ${data}\n` +
  `Ora: ${ora}`
);

  this.reset();

  // Nascondi il messaggio dopo 5 secondi
  setTimeout(() => {
    conferma.style.display = "none";
    conferma.classList.remove("visibile");
  }, 5000);
});
function salvaPrenotazione(username, descrizione) {
  const archivio = JSON.parse(localStorage.getItem("prenotazioni")) || {};
  if (!archivio[username]) archivio[username] = [];
  archivio[username].push(descrizione);
  localStorage.setItem("prenotazioni", JSON.stringify(archivio));
}