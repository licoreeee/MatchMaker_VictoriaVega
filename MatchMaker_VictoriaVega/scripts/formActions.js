const NACIONALIDADES_ACEPTADAS = [
    {key: 'AU', name: "Australia"},
    {key: 'BR', name: "Brasil"},
    {key: 'CA', name: "Canadá"},
    {key: 'CH', name: "Suiza"},
    {key: 'DE', name: "Alemania"},
    {key: 'DK', name: "Dinamarca"},
    {key: 'ES', name: "España"},
    {key: 'FI', name: "Finlandia"},
    {key: 'FR', name: "Francia"},
    {key: 'GB', name: "Reino Unido"},
    {key: 'IE', name: "Irlanda"},
    {key: 'IN', name: "India"},
    {key: 'IR', name: "Irán"},
    {key: 'MX', name: "México"},
    {key: 'NL', name: "Países Bajos"},
    {key: 'NO', name: "Noruega"},
    {key: 'NZ', name: "Nueva Zelanda"},
    {key: 'RS', name: "Serbia"},
    {key: 'TR', name: "Turquía"},
    {key: 'UA', name: "Ucrania"},
    {key: 'US', name: "Brasil"},
];

window.onload = function() {
    const form = document.getElementsByTagName("form");
    const inputs = form[0].getElementsByTagName("input");
    const selects = form[0].getElementsByTagName("select");

    for (let input of inputs) {
        input.onfocus = resaltar;

        input.addEventListener('blur', resaltarDesresaltar);
    }

    for (let select of selects) {
        select.onfocus = resaltar;

        select.addEventListener('blur', noResaltar);
    }

    llenarNacionalidad();
    //form[0].onsubmit = enviar;
    form[0].onsubmit = enviar2;
}

function llenarNacionalidad() {
    const nacionalidad = document.getElementById("nationality");

    for(let {key, name} of NACIONALIDADES_ACEPTADAS) {
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = name;
        nacionalidad.appendChild(option);
    }
}

function resaltar(evento) {
    evento.target.classList.add("selected");
} 

function noResaltar(evento) {
    const clase = evento.target.classList.contains("selected");
    if (clase) {
        evento.target.classList.remove("selected");
    }
}

function resaltarDesresaltar(evento) {
    evento.target.classList.toggle("selected");
}

function obtenerGenero() {
    /*
    const gSelected = document.querySelectorAll("input[name=interest]:checked");
    
    for(let g of gSelected) {
        activos.push(g.value);
    }
    */
    
    const genero = document.getElementsByName("interest");
    const activos = [];
    for(let g of genero) {
        if (g.checked) {
            activos.push(g.value);
        }
    }
    if (activos.length == 0) {
        activos.push("male");
        activos.push("female");
    }

    const index = activos.length > 1 ? Math.floor(Math.random() * 2) : 0;
    return activos[index];
}

function enviar(evento) {
    evento.preventDefault();
    const nacionalidad = document.getElementById("nationality");
    const genero = obtenerGenero();

    window.location.href = `its-a-match.html?nac=${nacionalidad.value}&genero=${genero}`;
}

function enviar2(evento) {
    evento.preventDefault();

    const nac = document.getElementById("nationality");
    const genero = obtenerGenero();

    const request = new Request(
        `https://randomuser.me/api/?nat=${nac}&gender=${genero}`, 
        {
            method: 'get',
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }
    );

    fetch(request).then(function(response){
        return response.json();
    }).then(function(data){
        localStorage.setItem("matchInfo", JSON.stringify(data.results[0]));
        window.location.href = "its-a-match.html";
    }).catch(function(error){
        alert("Hubo un error encontrando a tu otra mitad :(");
    })
}
