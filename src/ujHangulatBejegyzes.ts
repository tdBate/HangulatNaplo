import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

async function formKezeles(e: Event) {
    e.preventDefault();
    const form: HTMLFormElement = document.getElementById("hangulatForm") as HTMLFormElement;
    const formData = new FormData(form);

    const hangulat = formData.get("hangulat");
    const leiras = formData.get("leiras");

    const datum = new Date();

    const response = await fetch(import.meta.env.VITE_URL_LINK,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ hangulat:hangulat, leiras:leiras, datum:datum})
        })
    
    if (!response.ok) {throw new Error("Feltöltés nem sikerült "+response.statusText);}
    else {alert("Feltöltés sikeres!");}

    form.reset();
}

function init() {
    document.getElementById("hangulatForm")?.addEventListener("submit", formKezeles);
}

document.addEventListener("DOMContentLoaded", init);