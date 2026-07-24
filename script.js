// Dati del Menu Dinamico
const menuData = [
    { id: 1, name: "Antipasto all'Arsitana", category: "antipasti", price: "€ 12.00", desc: "Selezione di salumi tipici teramani, formaggi locali e miele." },
    { id: 2, name: "Pallotte Cacio e Ova", category: "antipasti", price: "€ 9.50", desc: "Le tradizionali polpette di pane, formaggio e uova in sugo di pomodoro." },
    { id: 3, name: "Maccheroni alla Chitarra", category: "primi", price: "€ 13.00", desc: "Pasta fresca all'uovo con ragù misto di carne teramano." },
    { id: 4, name: "Virtù Teramane", category: "primi", price: "€ 14.00", desc: "Celebre zuppa della tradizione con legumi, verdure e polpette (secondo stagione)." },
    { id: 5, name: "Arrosticini di Pecora (10pz)", category: "secondi", price: "€ 10.00", desc: "I classici spiedini di carne ovina cotti alla brace." },
    { id: 6, name: "Agnello alla Brace", category: "secondi", price: "€ 16.00", desc: "Taglio scelto di agnello locale profumato al rosmarino." },
    { id: 7, name: "Pizza Dolce Teramana", category: "dessert", price: "€ 6.00", desc: "Pan di spagna bagnato all'alchermes con crema pasticcera e cioccolato." },
    { id: 8, name: "Ferratelle (Cancellate)", category: "dessert", price: "€ 5.00", desc: "Dolce tipico abruzzese servito con marmellata d'uva." }
];

// Funzione per mostrare il menu in modo dinamico
function displayMenu(category) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';

    const filtered = category === 'tutti' 
        ? menuData 
        : menuData.filter(item => item.category === category);

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <div class="menu-item-header">
                <h4>${item.name}</h4>
                <span class="price">${item.price}</span>
            </div>
            <p>${item.desc}</p>
        `;
        grid.appendChild(div);
    });
}

// Gestione dei filtri del menu
function filterMenu(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayMenu(category);
}

// Gestione invio prenotazione
function handleBooking(event) {
    event.preventDefault();

    const booking = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        guests: document.getElementById('guests').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        timestamp: new Date().toLocaleString()
    };

    // Salva nel LocalStorage del browser
    let bookings = JSON.parse(localStorage.getItem('perino_bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('perino_bookings', JSON.stringify(bookings));

    // Mostra messaggio di successo
    const msgDiv = document.getElementById('booking-msg');
    msgDiv.style.color = '#16a34a';
    msgDiv.innerHTML = `Grazie ${booking.name}! Tavolo prenotato con successo per il ${booking.date} alle ore ${booking.time}.`;

    // Reset form
    document.getElementById('booking-form').reset();
}

// Inizializza il menu all'avvio
document.addEventListener('DOMContentLoaded', () => {
    displayMenu('tutti');
});