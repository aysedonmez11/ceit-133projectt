let storageKey = "";
let formId = "";
let listId = "";

if (document.getElementById("offerForm")) {
    storageKey = "rideOffers";
    formId = "offerForm";
    listId = "offerList";
} else if (document.getElementById("requestForm")) {
    storageKey = "rideRequests";
    formId = "requestForm";
    listId = "requestList";
} else {
    console.error("No valid form found on this page.");
    throw new Error("Missing form.");
}

const form = document.getElementById(formId);
const list = document.getElementById(listId);

const entries = JSON.parse(localStorage.getItem(storageKey) || "[]");
entries.forEach(displayEntry);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        location: form.location.value,
        date: form.date.value,
        time: form.time.value,
        people: form.people.value,
        notes: form.notes.value,
    };

    entries.push(data);
    localStorage.setItem(storageKey, JSON.stringify(entries));
    displayEntry(data);
    form.reset();
});

function displayEntry(entry) {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
    <strong>Location:</strong> ${entry.location}<br>
    <strong>Date:</strong> ${entry.date}<br>
    <strong>Time:</strong> ${entry.time}<br>
    <strong>People:</strong> ${entry.people}<br>
    <strong>Notes:</strong> ${entry.notes}
  `;
    list.appendChild(div);
}
