// Legge cookie utente
function leggiCookie(nome) {
  //cerca un nome all'interno del cookie usando un'espressione regolare per trovare un match
  const match = document.cookie.match(new RegExp('(^| )' + nome + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

//si usa la funzione di prima
const nome = leggiCookie("utente");
//all'interno del div del html si mostra un saluto 
const salutoDiv = document.getElementById("sal uto");

// se il cookie esiste
if (nome) {
	//mostra un messaggio di bentornati
  salutoDiv.textContent = `👋 Bentornato ${nome}`;
} else {
  // se il cookie non esiste effettua l'accesso per visualizzare le informazioni
  salutoDiv.textContent = "Effettua l’accesso per visualizzare le informazioni.";
}

// Dati simulati per poter testare senza avere un server da cui prendere i dati
const prenotazioniMock = [
  { data: "2024-05-10", ora: "20:00", persone: 2 },
  { data: "2024-04-22", ora: "19:30", persone: 4 }
];

const ordiniMock = [
  { piatto: "Biryani (Bangladesh)", data: "2024-05-05", totale: 12 },
  { piatto: "Pizza Margherita (Italia)", data: "2024-04-20", totale: 10 }
];

// se il nome dell'utente esiste 
if (nome) {
  const listaPrenotazioni = document.getElementById("listaPrenotazioni");
  // per ogni p in prenotazionimock
  prenotazioniMock.forEach(p => {
	//crei un nuovo elemento li
    const li = document.createElement("li");
	//cbe contiene le prenotazioni della persona in questione
    li.textContent = `📅 ${p.data} alle ${p.ora} - ${p.persone} persone`;
	// poi la si va ad aggiungere al DOM
    listaPrenotazioni.appendChild(li);
  });
}
