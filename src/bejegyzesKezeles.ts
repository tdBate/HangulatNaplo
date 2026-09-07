import type { Hangulat } from "./Hangulat";
import "./style.css";


const URL_LINK = import.meta.env.VITE_URL_LINK;

let data: Hangulat[];

async function torles(id: number) {
    const response= await fetch(`${URL_LINK}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {throw new Error("Hiba történt: "+response.statusText);}

    const arrayIndex = data.findIndex(item=>item.id==id);
    data.splice(arrayIndex,1);
    printData();
    
}

async function modosit(id: number) {

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

        const torlesBtn = document.createElement("button");
        torlesBtn.textContent = "Törlés";
        torlesBtn.onclick = () => { torles(element.id) }

        const modositButton = document.createElement("button");
        modositButton.textContent = "Módosít";
        modositButton.onclick = () => {
            modosit(element.id);
        }

        row.appendChild(hangulat);
        row.appendChild(leiras);
        row.appendChild(datum);
        row.appendChild(torlesBtn);

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
}

document.addEventListener("DOMContentLoaded", init);