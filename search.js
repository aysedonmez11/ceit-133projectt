const CAMPUS_LOCATIONS = [
    "Main Gate", 
    "Computer Engineering Building",
    "Electrical Engineering Building",
    "Mechanical Engineering Building",
    "Library",
    "Cafeteria",
    "Sports Center",
    "Dormitories",
    "Administration Building",
    "Chemistry Department",
    "Physics Department",
    "Mathematics Department",
    "English Teaching Building",
    "Student Center",
    "Parking Lot A",
    "Parking Lot B",
    "Medical Center",
    "Auditorium"
];

// Sample ride data - would normally come from a database
let rideData = {
    offers: [
        {
            id: 1,
            from: "Computer Engineering Building",
            to: "Dormitories",
            date: "2023-12-15",
            time: "16:30",
            seats: 3,
            driver: "John D.",
            contact: "john@email.com",
            notes: "Can pick up along the way"
        },
        {
            id: 2,
            from: "Main Gate",
            to: "Library",
            date: "2023-12-16",
            time: "10:00",
            seats: 2,
            driver: "Alice M.",
            contact: "alice@email.com",
            notes: "Leaving right after class"
        }
    ],
    requests: [
        {
            id: 101,
            from: "Sports Center",
            to: "Cafeteria",
            date: "2023-12-15",
            time: "12:30",
            passengers: 2,
            requester: "Bob T.",
            contact: "bob@email.com",
            notes: "Need ride for lunch"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        document.getElementById('login-prompt').style.display = 'block';
        document.getElementById('rides-list').style.display = 'none';
        document.querySelector('.search-filters').style.opacity = '0.5';
        document.querySelector('.search-filters').style.pointerEvents = 'none';
        return;
    }

    // User is logged in, show search functionality
    document.getElementById('login-prompt').style.display = 'none';
    document.querySelector('.search-filters').style.opacity = '1';
    document.querySelector('.search-filters').style.pointerEvents = 'auto';

    // Populate location dropdowns
    const fromLocation = document.getElementById('from-location');
    const toLocation = document.getElementById('to-location');
    
    CAMPUS_LOCATIONS.forEach(location => {
        const option1 = document.createElement('option');
        option1.value = location;
        option1.textContent = location;
        fromLocation.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = location;
        option2.textContent = location;
        toLocation.appendChild(option2);
    });

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    // Add event listener for search button
    document.getElementById('search-btn').addEventListener('click', performSearch);

    // Perform initial search
    performSearch();
});

function performSearch() {
    if (!isLoggedIn()) return;

    const rideType = document.getElementById('ride-type').value;
    const fromLocation = document.getElementById('from-location').value;
    const toLocation = document.getElementById('to-location').value;
    const date = document.getElementById('date').value;
    const seats = parseInt(document.getElementById('seats').value);

    let results = [];

    if (rideType === 'all' || rideType === 'offer') {
        results = results.concat(filterRides(rideData.offers, fromLocation, toLocation, date, seats, true));
    }
    
    if (rideType === 'all' || rideType === 'request') {
        results = results.concat(filterRides(rideData.requests, fromLocation, toLocation, date, seats, false));
    }

    displayResults(results);
}

function filterRides(rides, fromFilter, toFilter, dateFilter, seatsFilter, isOffer) {
    return rides.filter(ride => {
        // Location filter
        if (fromFilter && ride.from !== fromFilter) return false;
        if (toFilter && ride.to !== toFilter) return false;
        
        // Date filter
        if (dateFilter && ride.date !== dateFilter) return false;
        
        // Seats filter
        const rideSeats = isOffer ? ride.seats : ride.passengers;
        if (seatsFilter && rideSeats < seatsFilter) return false;
        
        return true;
    });
}

function displayResults(results) {
    const ridesList = document.getElementById('rides-list');
    const noResults = document.getElementById('no-results');
    
    ridesList.innerHTML = '';
    ridesList.style.display = 'none';
    noResults.style.display = 'none';

    if (results.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    results.forEach(ride => {
        const rideElement = document.createElement('div');
        rideElement.className = 'ride-item';
        
        const isOffer = 'driver' in ride;
        
        rideElement.innerHTML = `
            <div class="ride-header">
                <h4>${isOffer ? 'Ride Offer' : 'Ride Request'}</h4>
                <span class="ride-date">${ride.date} at ${ride.time}</span>
            </div>
            <div class="ride-locations">
                <span class="from-location">${ride.from}</span>
                <span class="to-arrow">→</span>
                <span class="to-location">${ride.to}</span>
            </div>
            <div class="ride-details">
                <span>${isOffer ? 'Seats available: ' + ride.seats : 'Passengers: ' + ride.passengers}</span>
                <span>${isOffer ? 'Driver: ' + ride.driver : 'Requester: ' + ride.requester}</span>
            </div>
            ${ride.notes ? `<div class="ride-notes">Notes: ${ride.notes}</div>` : ''}
            <div class="ride-contact">
                <a href="mailto:${ride.contact}" class="btn-contact">Contact</a>
            </div>
        `;
        
        ridesList.appendChild(rideElement);
    });

    ridesList.style.display = 'block';
}
