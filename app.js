"use strict";
let currentUser;
let rooms = [
  { id: "1", name: "Room A", availability: true },
  { id: "2", name: "Room B", availability: false },
  { id: "3", name: "Room C", availability: false },
];
const btnRegister = document.querySelector(".btn__register");
const btnBookRoom = document.querySelector("#btn__bookRoom");
const btnCloseModal = document.querySelector("#btn__closeModal");

// const btnRegister = document.getElementById("btnRegister");
const formModal = document.querySelector("#form__modal");
// const btnCloseModal = document.getElementById("btn__closeModal");
const formUsername = document.querySelector("#form__username");

//
btnRegister.addEventListener("click", () => {
  formModal.style.display = "flex";
});

btnCloseModal.addEventListener("click", () => {
  formModal.style.display = "none";
});

// You can also close the modal when clicking outside of it
window.addEventListener("click", event => {
  if (event.target === formModal) {
    formModal.style.display = "none";
  }
});

// Function to handle form submission
function handleFormSubmission() {
  currentUser = formUsername.value;
  if (currentUser) {
    document.getElementById("roomList").style.display = "flex";
    populateRoomList();
    formModal.style.display = "none";
  } else {
    document.getElementById("modal-text").innerText = "Please enter your username.";
  }
}

// Add event listener for form submission
formUsername.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    handleFormSubmission();
  }
});

function populateRoomList() {
  const roomListDiv = document.getElementById("roomList");
  roomListDiv.innerHTML = "";

  rooms.map(room => {
    const roomCard = document.createElement("div");
    roomCard.className = "room-card";
    roomCard.onclick = () => showBookingForm(room);

    roomCard.innerHTML = `
          <h3>${room.name}</h3>
          <p>Availability: ${room.availability ? "Available" : "Not Available"}</p>
        `;

    roomListDiv.appendChild(roomCard);
  });
}

function showBookingForm(selectedRoom) {
  document.getElementById("bookingForm").style.display = "block";
  populateRoomDropdown();
}

function populateRoomDropdown() {
  const roomDropdown = document.getElementById("roomDropdown");
  roomDropdown.innerHTML = "";

  rooms.map(room => {
    if (room.availability) {
      const option = document.createElement("option");
      option.value = room.name;
      option.text = room.name;
      roomDropdown.appendChild(option);
    }
  });
}

btnBookRoom.addEventListener("click", () => {
  const notificationModal = document.querySelector("#notification__container");
  const selectedDatetime = document.getElementById("datetime").value;
  const notificationText = document.querySelector("#notification__text");

  // Simulate room booking, replace this with your logic
  const bookedRoom = rooms.find(room => room.name === selectedRoomName);

  if (bookedRoom && bookedRoom.availability) {
    notificationModal.style.display = "flex";
    setTimeout(() => {
      notificationModal.style.display = "none";
    }, 3000);

    notificationText.textContent = `${selectedRoomName} booked successfully for ${new Date(selectedDatetime).getDate()} by ${currentUser}`;

    bookedRoom.availability = false; // Mark the room as booked
    closeModal();
    populateRoomList(); // Refresh room list
  } else {
    const modalText = document.getElementById("modal-text");
    modalText.textContent = `Room ${selectedRoomName} is not available.`;
    document.getElementById("modal").style.display = "flex";
  }
});
btnCloseModal.addEventListener("click", () => {
  closeModal();
});

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
// document.getElementById("submit-btn").addEventListener("click", handleFormSubmission);
