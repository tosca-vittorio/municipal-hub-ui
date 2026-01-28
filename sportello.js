function showSportelloDetails(event)
{
    event.preventDefault();  // Evita il comportamento predefinito dell'anchor
    const button = event.currentTarget;
    const div = button.parentNode;
    const sectionText = div.querySelector(".sportello-details");
    const isHidden = sectionText.classList.contains('hidden');  // Verifica se il box è nascosto

    // Se il box è nascosto, lo apriamo e scorriamo fino a esso
    if (isHidden) 
    {
        sectionText.classList.remove('hidden');
        sectionText.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } 
    else 
    {
        // Se il box è visibile, lo chiudiamo senza alterare la posizione dello scroll
        sectionText.classList.add('hidden');
    }
}

function SPgoToLink(event)
{
    console.log(event);

    // recupero il div che ha generato l'evento
    var div = event.currentTarget.parentNode;
    console.log("EVENTO GENERATO DA: " + div);

    // recupero gli attributi data-*
    var url = div.getAttribute("data-url");
    var type = div.getAttribute("data-type");

    // eseguo il corretto reindirizzamento a file o pagine web
    if(type === "pdf" || type === "page")
        {
            window.location.href = url;
        }
    else
        {
            console.log("TIPO: " + type + "\nNON SUPPORTATO");
        }
}

// FUNZIONALITA' BOTTONI
const SPbuttons = document.querySelectorAll(".imgIcon");
for (const SPbutton of SPbuttons)
    {
        SPbutton.addEventListener('click', SPgoToLink);
    }


//MOSTRA DETTAGLI
let isVisibleSportelloButton = false;
let currentMainSportelloButton = null; // Variabile per tenere traccia dell'elemento principale attualmente aperto


// Oggetto per memorizzare la posizione di scroll di ciascun box
const boxScrollPositions = {};

// Seleziona tutti i bottoni
const sportelloButtons = document.querySelectorAll(".sportello-button");

for (const sportelloButton of sportelloButtons) {
    sportelloButton.addEventListener('click', showSportelloDetails);
}