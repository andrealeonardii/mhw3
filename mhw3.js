
//NAV

function inizializzaNav(){
  const img=document.querySelectorAll('.hamburgerMenuImg');
  img[0].addEventListener('click',clickHamburgerMenu);//img[0] perchè è una lista
  const img1=document.querySelectorAll('.lenteImg');
  img1[0].addEventListener('click',clickLenteNav);
  const sectionNascosta=document.querySelectorAll('#modalView');
  sectionNascosta[0].addEventListener('click',onModalClick);

  const mostraPiuCoordinatori=document.querySelectorAll('.mostraDiPiu');
  mostraPiuCoordinatori[0].addEventListener('click',mostraDiPiu);
}

function clickHamburgerMenu(event){
  img=event.currentTarget;

  const divNascosto=document.querySelectorAll('#divNascosto');

  if(divNascosto[0].classList.contains('hidden')){
    divNascosto[0].classList.remove('hidden');
    img.src='img/x.png';
  }else {
    divNascosto[0].classList.add('hidden');
    img.src='img/hamburger.png';
  }

}

function mostraDiPiu(){
  event.preventDefault();//essendo un link si aggiornerebbe la pagina, così no
  target=event.currentTarget;
  par=document.getElementById('tuttiIcoordinatori');
  if(target.classList.contains('mostrato')){
    target.textContent='Mostra di Più';
    const aMostrati=document.querySelectorAll('.mostrati');
    for (const a of aMostrati)
    {
      a.remove();
    }
    target.classList.remove('mostrato');

  }else{

    const coor1= document.createElement('a');
    coor1.textContent='Stefano Cantarini';
    coor1.classList.add('aFoot');
    coor1.classList.add('mostrati');
    const br= document.createElement('br');
    br.classList.add('mostrati');
    const coor2= document.createElement('a');
    coor2.textContent='Claudio Pelizzeni';
    coor2.classList.add('aFoot');
    coor2.classList.add('mostrati');

    par.appendChild(coor1);
    par.appendChild(br);
    par.appendChild(coor2);
    target.classList.add('mostrato');
    target.textContent='Mostra di Meno';

  }

}

function clickLenteNav(){
  const sectionNascosta=document.querySelectorAll('#modalView');
  if(sectionNascosta[0].classList.contains('hidden')){

    sectionNascosta[0].style.top=window.pageYOffset + 'px';//rappresenta lo scostamente verticale della viewport rispetto all’inizio della pagina.
    document.body.classList.add('no-scroll');//evita che quando la modale è attiva si possa scrollare
    sectionNascosta[0].classList.remove('hidden');
    sectionNascosta[0].classList.add('modalViewShow');
  }
}

function onModalClick(event) {
  modalView=event.currentTarget;
  document.body.classList.remove('no-scroll');
  modalView.classList.add('hidden');
  modalView.classList.remove('modalViewShow');
}

function inizializzaAnavSectionNascosta(){
  const boxes=document.querySelectorAll('section .naviga a');
  for (const box of boxes)
  {
    box.addEventListener('click', clickAnavSectionNascosta);
    box.classList.add('reset');
  }
  boxes[0].classList.remove('reset');
  boxes[0].classList.add('cliccato');

  gestisciDiv(boxes[0].dataset.naviga,1);// passo il dataset del primo link così da mostrare il div associato
  const naviga=document.querySelectorAll('section .naviga');
  naviga[0].addEventListener('click', clickNavigaNav);

}

function clickNavigaNav(){
  event.stopPropagation();//così quando appare la schermata con il div, cliccando il div la modale non si chiude, ma cliccando attorno si
}

function clickAnavSectionNascosta(){
  event.preventDefault();//dice al browser di impedire il comportamento normale di questo evento(# nel link porta all'inizio)
  const a=event.currentTarget;//mi prendo il link preciso che è stato cliccato
  gestisciDiv(a.dataset.naviga,1);
  const boxes=document.querySelectorAll('section .naviga a');//prendo tutti i link perchè devo resettare il colore tranne per quello cliccato
  for (const box of boxes)
  {
    if(box.classList.contains('cliccato')){
      box.classList.remove('cliccato');
      box.classList.add('reset');
    }
  }
  a.classList.remove('reset');
  a.classList.add('cliccato');

}

function gestisciDiv(dataSet, c){

    let divNaviga;
    if(c==0){
      divNaviga=document.querySelectorAll('.naviga .divNaviga');//prendo tutti i div
    }
    if(c==1){
      divNaviga=document.querySelectorAll('.naviga .divNaviga1');//prendo tutti i div

    }


    for (const div of divNaviga)
    {
      if(div.classList.contains(dataSet)){//per ogni div controllo se la classe coincide con il dataset del link (i div hanno il nome della classe uguale ad dataset associato)
        div.classList.remove('hidden');
      }else{
        div.classList.add('hidden');
      }
    }
}

//HEADER

function inizializzaAheader(){
  const boxes=document.querySelectorAll('Header .naviga a');
  for (const box of boxes)
  {
    box.addEventListener('click', clickAHeader);
    box.classList.add('reset');

  }

  boxes[0].classList.remove('reset');
  boxes[0].classList.add('cliccato');

  gestisciDiv(boxes[0].dataset.naviga,0);// passo il dataset del primo link così da mostrare il div associato

}

function clickAHeader(){
  event.preventDefault();//dice al browser di impedire il comportamento normale di questo evento(# nel link porta all'inizio)
  const a=event.currentTarget;//mi prendo il link preciso che è stato cliccato
  gestisciDiv(a.dataset.naviga,0);
  const boxes=document.querySelectorAll('Header .naviga a');//prendo tutti i link perchè devo resettare il colore tranne per quello cliccato
  for (const box of boxes)
  {
    if(box.classList.contains('cliccato')){
      box.classList.remove('cliccato');
      box.classList.add('reset');
    }
  }
  a.classList.remove('reset');
  a.classList.add('cliccato');
}

//apiKey

function onJsonApiKey(json) {
  if(json.length==0){

    const meteo = document.querySelector('#meteo-view');
    meteo.innerHTML = '';
    // Leggi il numero di risultati

      // Creiamo il div che conterrà immagine e didascalia
      const div = document.createElement('div');
      div.classList.add('divApi');
      // Creiamo la didascalia
      const errore = document.createElement('span');
      errore.textContent = "CITTA' NON TROVATA";
      errore.classList.add('scritta2');

      // Aggiungiamo didascalia al div
      div.appendChild(errore);

      // Aggiungiamo il div alla section
      meteo.appendChild(div);
      return;

  }
  const lat=json[0].lat;
  const lon=json[0].lon;
  rest_url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid='+api_key;
  // Esegui fetch
  fetch(rest_url).then(onResponseApiKey).then(onJson1);

}

function onJson1(json) {
  let temp_max=(json.main.temp_max)-273.15;
  temp_max=Math.trunc(temp_max);

  let temp_min=(json.main.temp_min)-273.15;
  temp_min=Math.trunc(temp_min);

  // Svuotiamo il contenitore

  const meteo = document.querySelector('#meteo-view');
  meteo.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('divApi');
    // Creiamo la didascalia
    const max = document.createElement('span');
    max.textContent = 'MAX TEMP: '+ temp_max+'°';
    max.classList.add('scritta2');
    const min = document.createElement('span');
    min.textContent = 'MIN TEMP: '+ temp_min+'°';
    min.classList.add('scritta2');
    // Aggiungiamo didascalia al div
    div.appendChild(max);
    div.appendChild(min);
    // Aggiungiamo il div alla section
    meteo.appendChild(div);

}

function onResponseApiKey(response) {
  return response.json();
}

function search(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const citta_input = document.querySelector('#citta');
  const citta_value = encodeURIComponent(citta_input.value);
  // Prepara la richiesta
  rest_url = 'http://api.openweathermap.org/geo/1.0/direct?q='+ citta_value +'&limit=5&appid='+api_key;
  // Esegui fetch
  fetch(rest_url).then(onResponseApiKey).then(onJsonApiKey);
}



//apiToken
function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  // Svuotiamo la libreria
  const library = document.querySelector('#album-view');
  library.innerHTML = '';

  if(json.albums.items.length==0){

      const div = document.createElement('div');
      div.classList.add('divApi');
      // Creiamo la didascalia
      const errore = document.createElement('span');
      errore.textContent = "ALBUM NON TROVATO";
      errore.classList.add('scritta2');

      // Aggiungiamo didascalia al div
      div.appendChild(errore);

      // Aggiungiamo il div alla section
      library.appendChild(div);
      return;

  }
  // Leggi il numero di risultati
  const results = json.albums.items;
  let num_results = results.length;
  // Mostriamone al massimo 5
  if(num_results > 5)
    num_results = 5;
  // Processa ciascun risultato
  for(let i=0; i<num_results; i++)
  {
    // Leggi il documento
    const album_data = results[i]
    // Leggiamo info
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    // Creiamo il div che conterrà immagine e didascalia
    const album = document.createElement('div');
    album.classList.add('album');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = selected_image;
    // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search1(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}
//MAIN

//gestione dell'immagine in alto a destra della nav e della comparsa del div nascosto
inizializzaNav();
inizializzaAnavSectionNascosta();
//gestione delle a dell'header per il colore della scritta selezionata e gestione dei div nascosti in base a ciò che si preme
inizializzaAheader();//mi occupo del funzionamento del div centrale
// API key --- NON SICURO!
const api_key = 'ad1aae44ecaee9bdbdd606b748f00db1';
// Aggiungi event listener al form
const form = document.querySelector('#formApiKey');
form.addEventListener('submit', search)


// OAuth credentials --- NON SICURO!
const client_id = '769fdd192ad746068a6ad2572ffbc390';
const client_secret = '343b5ff717b841c984cf5fc6fd94b224';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
// Aggiungi event listener al form

const form1 = document.querySelector('#formApiToken');
form1.addEventListener('submit', search1)
