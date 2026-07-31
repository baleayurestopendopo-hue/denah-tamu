const TOTAL_TABLES = 76; 
let currentSelectedTable = null;

document.addEventListener("DOMContentLoaded", () => {
  const tableGrid = document.getElementById("tableGrid");

  for (let i = 1; i <= TOTAL_TABLES; i++) {
    const tableDiv = document.createElement("div");
    tableDiv.className = "table-card";
    tableDiv.onclick = () => openModal(i);
    
    tableDiv.innerHTML = `<div class="table-number">Meja ${i}</div>`;
    tableGrid.appendChild(tableDiv);
  }
});

function openModal(tableNumber) {
  currentSelectedTable = tableNumber;
  document.getElementById("modalTitle").innerText = `Daftar Tamu - Meja ${tableNumber}`;

  const savedData = JSON.parse(localStorage.getItem(`table_${tableNumber}`)) || Array(8).fill("");

  for (let i = 1; i <= 8; i++) {
    document.getElementById(`seat${i}`).value = savedData[i - 1] || "";
  }

  document.getElementById("guestModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("guestModal").style.display = "none";
}

function saveGuestData() {
  if (!currentSelectedTable) return;

  const guests = [];
  for (let i = 1; i <= 8; i++) {
    const name = document.getElementById(`seat${i}`).value.trim();
    guests.push(name);
  }

  localStorage.setItem(`table_${currentSelectedTable}`, JSON.stringify(guests));

  alert(`Data Tamu Meja ${currentSelectedTable} berhasil disimpan!`);
  closeModal();
}

window.onclick = function(event) {
  const modal = document.getElementById("guestModal");
  if (event.target === modal) {
    closeModal();
  }
};
