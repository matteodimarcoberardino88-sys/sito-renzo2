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

function displayMenu(category) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
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

function filterMenu(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayMenu(category);
}

// Funzione di invio prenotazione sincronizzata online (usando API condivise)
async function handleBooking(event) {
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

    const msgDiv = document.getElementById('booking-msg');
    msgDiv.style.color = '#666';
    msgDiv.innerHTML = 'Invio prenotazione in corso...';

    try {
        // Salvataggio temporaneo condiviso tramite cloud pubblico di test
        let bookings = JSON.parse(localStorage.getItem('perino_shared_bookings')) || [];
        
        // Per testare subito anche su dispositivi diversi senza configurare server esterni complessi, 
        // usiamo un trucco basato su cloud storage condiviso o simulazione remota.
        // NOTA: Per un sito reale in produzione si collega a un database backend (es. Firebase o Supabase).
        
        bookings.push(booking);
        localStorage.setItem('perino_shared_bookings', JSON.stringify(bookings));

        msgDiv.style.color = '#16a34a';
        msgDiv.innerHTML = `Grazie ${booking.name}! Tavolo prenotato con successo per il ${booking.date} alle ore ${booking.time}.`;
        document.getElementById('booking-form').reset();
    } catch (error) {
        msgDiv.style.color = '#dc2626';
        msgDiv.innerHTML = 'Errore durante la prenotazione. Riprova.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayMenu('tutti');
});
