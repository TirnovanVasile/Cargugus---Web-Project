// script.js - Fișierul principal de logică

// --- 1. FUNCTIE TRACKING (Pagina Home) ---
function trackPackage() {
    const awb = document.getElementById('awbInput').value;
    const resultDiv = document.getElementById('tracking-result');

    if (awb.length < 3) {
        resultDiv.style.color = 'red';
        resultDiv.innerText = "Te rugăm să introduci un AWB valid.";
        return;
    }

    const statuses = [
        "Coletul a fost preluat de curier.",
        "Coletul este în tranzit către hub-ul central.",
        "Coletul a ajuns în depozitul local.",
        "În livrare. Curierul va ajunge azi."
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    resultDiv.style.color = '#0f172a';
    resultDiv.innerHTML = `AWB <strong>${awb}</strong>: ${randomStatus}`;
}

// --- 2. FUNCTIE CALCULATOR PRET (Pagina Preturi) ---
function calculateCost() {
    const weight = document.getElementById('weightInput').value;
    const resultDisplay = document.getElementById('costResult');
    
    if (weight <= 0) {
        resultDisplay.innerText = "Introdu o greutate validă.";
        resultDisplay.style.color = 'red';
        return;
    }

    let price = 0;
    
    if (weight <= 1) {
        price = 15;
    } else if (weight <= 5) {
        price = 25;
    } else if (weight <= 10) {
        price = 40;
    } else {
        price = 40 + (weight - 10) * 2;
    }

    resultDisplay.style.color = '#ff6b00';
    resultDisplay.innerText = `Cost estimat: ${price} RON`;
}

// --- 3. FORMULAR CONTACT (Pagina Contact) ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Mesajul tău a fost trimis! Un operator Cargugus te va contacta în curând.");
        contactForm.reset();
    });
}

// --- 4. GENERARE DINAMICĂ SERVICII (Pagina Servicii) ---

// Datele serviciilor (Configurația)
const serviciiData = [
    {
        titlu: "Standard (24-48h)",
        descriere: "Cea mai populară opțiune. Livrare economică și sigură direct la ușa clientului, oriunde în țară.",
        imagine: "img/livrare.png",
        btnText: "Alege Standard",
        stilImagine: "" 
    },
    {
        titlu: "Express (Azi)",
        descriere: "Livrare ultrarapidă în aceeași zi pentru București și Ilfov. Comenzi plasate până la ora 12:00.",
        imagine: "img/expres.png", 
        btnText: "Alege Express",
        stilImagine: "filter: hue-rotate(15deg);" // Truc vizual: schimbăm ușor culoarea imaginii
    },
    {
        titlu: "Cargo / Paletizat",
        descriere: "Soluții logistice complexe pentru greutăți mari și volume industriale, gestionate în hub-urile noastre.",
        imagine: "img/depozit.png",
        btnText: "Cere Ofertă",
        stilImagine: ""
    }
];

// Funcția de generare
function genereazaServicii() {
    const container = document.getElementById('services-container');

    // Verificăm dacă suntem în pagina de servicii (dacă există containerul)
    if (container) {
        container.innerHTML = ''; // Curățăm containerul

        serviciiData.forEach(serviciu => {
            const cardHTML = `
                <div class="card">
                    <img src="${serviciu.imagine}" 
                         alt="${serviciu.titlu}" 
                         class="card-image" 
                         style="${serviciu.stilImagine}">
                    
                    <h3>${serviciu.titlu}</h3>
                    <p>${serviciu.descriere}</p>
                    <button class="btn" onclick="selectService('${serviciu.titlu}')">${serviciu.btnText}</button>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    }
}

// Funcție pentru interacțiunea cu butonul
function selectService(numeServiciu) {
    alert(`Ai selectat pachetul: ${numeServiciu}. Te vom redirecționa către formular.`);
    // Aici se poate adăuga redirecționarea: window.location.href = 'contact.html';
}

// Pornim generarea când pagina este încărcată complet
document.addEventListener('DOMContentLoaded', genereazaServicii);