import type { Hangulat } from "./Hangulat";
import "./style.css";


const URL_LINK = import.meta.env.VITE_URL_LINK;

let data: Hangulat[];

function printData() {
    const tabla: HTMLTableElement = document.getElementById("tabla") as HTMLTableElement;
    tabla.innerHTML = `<tr> <th>Hangulat</th>  <th>Leírás</th>  <th>Dátum</th> </tr>`;

    data.forEach(element => {
        const row = document.createElement("tr");

        const hangulat = document.createElement("td");
        hangulat.textContent = element.hangulat;

        const leiras = document.createElement("td");
        leiras.textContent = element.leiras;

        const datum = document.createElement("td");
        try {
            datum.textContent = element.datum.toString() || "N/A";
        } catch(err) {datum.textContent = "N/A"}

        row.appendChild(hangulat);
        row.appendChild(leiras);
        row.appendChild(datum);

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