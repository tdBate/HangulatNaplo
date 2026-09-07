import type { Hangulat } from "./Hangulat";
import "./style.css";


const URL_LINK = import.meta.env.VITE_URL_LINK;

let data:Hangulat;

async function loadData() {
    const response = await fetch(URL_LINK);
    data = await JSON.parse(await response.text()) as Hangulat;
    console.log(data);
}

function init() {
    loadData();
}

document.addEventListener("DOMContentLoaded", init);