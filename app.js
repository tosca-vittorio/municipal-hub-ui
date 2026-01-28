function goToLink(event)
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

const Boxs = document.querySelectorAll(".playstore-box img, .applestore-box img");
for (const Box of Boxs)
{
    Box.addEventListener('click', goToLink);
}