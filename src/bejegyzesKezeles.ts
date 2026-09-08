import type { Hangulat } from "./Hangulat";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const URL_LINK = import.meta.env.VITE_URL_LINK;

let data: Hangulat[];
let currentID:number;

async function torles(id: number) {
    if (!confirm("Biztos törötlni akarod?")) {return;}
    const response= await fetch(`${URL_LINK}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {throw new Error("Hiba történt: "+response.statusText);}

    const arrayIndex = data.findIndex(item=>item.id==id);
    data.splice(arrayIndex,1);
    printData();
    
}

async function modosit(item:Hangulat) {
    currentID = item.id;
    const form: HTMLFormElement = document.getElementById("hangulatForm") as HTMLFormElement;
    const formData = new FormData(form);

    (form.elements.namedItem("hangulat") as HTMLFormElement).value = item.hangulat;
    (form.elements.namedItem("leiras") as HTMLFormElement).value = item.leiras;
    (form.elements.namedItem("datum") as HTMLFormElement).value = new Date(item.datum).toISOString().slice(0,16);
}

async function modositPatch(e:Event) {
    e.preventDefault();
    const form: HTMLFormElement = document.getElementById("hangulatForm") as HTMLFormElement;
    const formData = new FormData(form);

    const hangulat = formData.get("hangulat");
    const leiras = formData.get("leiras");

    const datum = formData.get("datum");

    const response = await fetch(`${URL_LINK}/${currentID}`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({ hangulat:hangulat, leiras:leiras, datum:datum})
        })
    

    if (!response.ok) {throw new Error("Módosítás nem sikerült "+response.status);}
    else {alert("Módosítás sikeres!");}

    form.reset();
    loadData();
    
}

function printData() {
    const tabla: HTMLTableElement = document.getElementById("tabla") as HTMLTableElement;
    tabla.innerHTML = `<tr> <th>Hangulat</th>  <th>Leírás</th>  <th>Dátum</th>  <th>Törlés</th>  <th>Módosítás</th> </tr>`;

    data.forEach(element => {
        const row = document.createElement("tr");

        const hangulat = document.createElement("td");
        hangulat.textContent = element.hangulat;

        const leiras = document.createElement("td");
        leiras.textContent = element.leiras;

        const datum = document.createElement("td");
        try {
            datum.textContent = element.datum.toString() || "N/A";
        } catch (err) { datum.textContent = "N/A" }

        const torlesCella = document.createElement("td");
        const torlesBtn = document.createElement("button");
        torlesBtn.textContent = "Törlés";
        torlesBtn.onclick = () => { torles(element.id) }
        torlesCella.appendChild(torlesBtn);

        const modositCella = document.createElement("td");
        const modositButton = document.createElement("button");
        modositButton.textContent = "Módosít";
        modositButton.onclick = () => {
            modosit(element);
        }
        modositCella.appendChild(modositButton);

        row.appendChild(hangulat);
        row.appendChild(leiras);
        row.appendChild(datum);
        row.appendChild(torlesCella);
        row.appendChild(modositCella);

        tabla.appendChild(row);
    });
}

async function loadData() {
    const response = await fetch(URL_LINK);
    data = await JSON.parse(await response.text()) as Hangulat[];

    printData();
}

function init() {
    loadData();
    document.getElementById("hangulatForm")?.addEventListener("submit", modositPatch);
}

document.addEventListener("DOMContentLoaded", init);