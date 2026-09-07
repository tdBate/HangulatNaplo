import type { Hangulat } from "./Hangulat";
import "./style.css";

const URL_LINK = import.meta.env.VITE_URL_LINK;

let data: Hangulat[];
const hangulatok = ["boldog","semleges","szomoru","faradt","merges"];

function printData() {
    const tabla = document.getElementById("tabla")!;
    tabla.innerHTML = `<tr> <th>Hangulat</th> <th>Szám</th></tr>`;

    hangulatok.forEach(hangulat => {
        const row = document.createElement("tr");

        const hangulatCella = document.createElement("td");
        hangulatCella.textContent = hangulat;

        const countCella = document.createElement("td");
        countCella.textContent = data.filter(item=> item.hangulat == hangulat).length.toString();

        row.appendChild(hangulatCella);
        row.appendChild(countCella);

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