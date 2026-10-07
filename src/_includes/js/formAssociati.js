const formAssociati = document.getElementById('form-associati');

if (formAssociati) {
  formAssociati.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailDestinazione = 'info@archeologicovaltellinese.it';

    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const indirizzo = document.getElementById('indirizzo').value;
    const cf = document.getElementById('cf').value;
    const dataNascitaRaw = document.getElementById('data-nascita').value;
    
    let dataNascitaFormat = '';
    if (dataNascitaRaw) {
      const [anno, mese, giorno] = dataNascitaRaw.split('-');
      dataNascitaFormat = `${giorno}/${mese}/${anno}`;
    }
    
    const note = document.getElementById('note').value;

    const subject = `Richiesta Associazione: ${nome} ${cognome}`;

    const body = `Salve, vorrei inviare la mia richiesta di associazione all'Istituto Archeologico Valtellinese.

    Dati Personali:
    Nome: ${nome}
    Cognome: ${cognome}
    Indirizzo: ${indirizzo}
    Data di Nascita: ${dataNascitaFormat}
    Codice Fiscale: ${cf}

    Note:
    ${note || 'Niente da aggiungere.'}`;

    window.location.href = `mailto:${emailDestinazione}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}