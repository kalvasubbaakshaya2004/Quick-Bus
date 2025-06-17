
const buses = [
    { id: 1, name: "Bus 1", time: "10:00 AM", price: 150 },
    { id: 2, name: "Bus 2", time: "2:00 PM", price: 500 },
    { id: 3, name: "Bus 3", time: "6:00 PM", price: 350 }
];

let selectedBus = null;
let selectedSeat = null;

function searchBuses() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;


    if (source && destination && date) {
        const busListing = document.getElementById('bus-listing');
        busListing.innerHTML = '';

        buses.forEach(bus => {
            const busCard = document.createElement('div');
            busCard.classList.add('bus-card');
            busCard.innerHTML = `
                <h3>${bus.name}</h3>
                <p>${bus.time}</p>
                <p>Price: ₹${bus.price}</p>
                <button onclick="selectBus(${bus.id})">Select Bus</button>
            `;
            busListing.appendChild(busCard);
        });
    }
}

function selectBus(busId) {
    selectedBus = buses.find(bus => bus.id === busId);
    document.getElementById('bus-listing').style.display = 'none';
    document.getElementById('seat-selection').style.display = 'block';

    
    const seatMap = document.getElementById('seat-map');
    seatMap.innerHTML = '';
    for (let i = 1; i <= 20; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;
        seat.onclick = () => selectSeat(i);
        seatMap.appendChild(seat);
    }
}

function selectSeat(seatNumber) {
    if (selectedSeat !== null) {
        document.querySelector(`.seat.selected`).classList.remove('selected');
    }
    selectedSeat = seatNumber;
    document.querySelector(`.seat:nth-child(${seatNumber})`).classList.add('selected');
}

function bookSeat() {
    if (selectedBus && selectedSeat) {
        document.getElementById('seat-selection').style.display = 'none';
        document.getElementById('booking-summary').style.display = 'block';
        const summary = document.getElementById('summary');
        summary.innerHTML = `You have booked ${selectedBus.name} on ${selectedBus.time} for ₹${selectedBus.price}. Seat: ${selectedSeat}`;
    }
}

function resetBooking() {
    selectedBus = null;
    selectedSeat = null;
    document.getElementById('booking-summary').style.display = 'none';
    document.getElementById('bus-listing').style.display = 'block';
    document.getElementById('seat-selection').style.display = 'none';
}
