"use strict";
let currentUser;
let selectedRoomName;
let rooms = [
  { id: "1", name: "Room A", Capacity: 10, availability: true },
  { id: "2", name: "Room B", Capacity: 5, availability: false },
  { id: "3", name: "Room C", Capacity: 20, availability: false },
  { id: "4", name: "Room D", Capacity: 30, availability: false },
];
const btnRegister = document.getElementById("btn__register");
const btnBookRoom = document.querySelector("#btn__bookRoom");
const btnCloseModal = document.querySelector("#btn__closeModal");
const formModal = document.querySelector("#form-register__modal");
const formUsername = document.querySelector("#form__username");
const formUserEmail = document.querySelector("#form__email");
const formUserPassword = document.getElementById("form__password");
const formUserConfirmPassword = document.querySelector("#form-confirm__password");

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

// const formUserEmail = document.querySelector("#form__email").value;
// console.log(formUserEmail);

// document.addEventListener("DOMContentLoaded", function () {
//   // const formUserEmail = document.querySelector("#form__email").value;
//   // console.log(formUserEmail);
//   // Your other code related to form validation or other functionality goes here
// });

// function validateForm() {
//   const formUsername = document.querySelector("#form__name").value;
//   if (!formUsername || !formUsername || !formUserPassword || !formUserConfirmPassword) {
//     document.getElementById("modal-text").innerText = "All fields are required.";
//     return false;
//   }

//   if (formUserPassword !== formUserConfirmPassword) {
//     document.getElementById("modal-text").innerText = "Passwords do not match.";
//     return false;
//   }

//   // Simple email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(formUserEmail)) {
//     document.getElementById("modal-text").innerText = "Invalid email address.";
//     return false;
//   }

//   return true;
// }

// Function to handle form submission

function handleFormSubmission() {
  currentUser = formUsername.value;
  console.log(currentUser);
  if (currentUser) {
    document.getElementById("roomList").style.display = "flex";
    populateRoomList();
    formModal.style.display = "none";
  } else {
    document.getElementById("form-error-text").innerText = "Please enter your username.";
  }
}

formModal.addEventListener("submit", event => {
  event.preventDefault();
  // if (validateForm()) {
  //   handleFormSubmission();
  // }
  handleFormSubmission();
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
          <p>Capacity: ${room.Capacity} person</p>

        `;

    roomListDiv.appendChild(roomCard);
  });
}

function showBookingForm(selectedRoom) {
  selectedRoomName = selectedRoom.name;
  document.getElementById("bookingForm").style.display = "flex";
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
