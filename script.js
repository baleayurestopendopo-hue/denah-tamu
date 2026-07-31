// Data koordinat posisi titik meja yang sudah dikoreksi presisi di tengah meja
const tablePositions = {
  // AREA Karpet Cokelat (Kiri)
  1:  { x: 17.5, y: 24.0 },
  2:  { x: 17.5, y: 17.5 },
  3:  { x: 15.0, y: 11.8 },
  4:  { x: 20.8, y: 11.8 },
  5:  { x: 22.8, y: 17.5 },
  6:  { x: 22.8, y: 24.0 },
  7:  { x: 26.5, y: 11.8 },
  8:  { x: 28.5, y: 17.5 },
  9:  { x: 32.5, y: 11.8 },
  10: { x: 34.5, y: 17.5 },
  60: { x: 32.5, y: 20.0 },
  11: { x: 38.0, y: 11.8 },
  12: { x: 42.2, y: 20.0 },
  13: { x: 42.2, y: 11.8 },
  14: { x: 45.2, y: 17.5 },
  15: { x: 46.5, y: 11.8 },

  // AREA Karpet Cream (Kanan)
  16: { x: 50.8, y: 23.5 },
  17: { x: 50.8, y: 17.5 },
  18: { x: 50.8, y: 11.8 },
  19: { x: 55.2, y: 30.5 },
  20: { x: 55.2, y: 23.5 },
  21: { x: 55.2, y: 17.5 },
  22: { x: 55.2, y: 11.8 },
  23: { x: 59.8, y: 30.5 },
  24: { x: 59.8, y: 25.5 },
  25: { x: 59.8, y: 19.5 },
  26: { x: 59.8, y: 14.2 },
  27: { x: 64.2, y: 28.5 },
  28: { x: 64.2, y: 22.5 },
  29: { x: 64.2, y: 17.5 },
  30: { x: 64.2, y: 11.5 },
  31: { x: 68.8, y: 30.5 },
  32: { x: 68.8, y: 23.5 },
  33: { x: 68.8, y: 18.0 },
  34: { x: 68.8, y: 12.8 },
  35: { x: 73.2, y: 27.5 },
  36: { x: 73.2, y: 21.0 },
  37: { x: 73.2, y: 16.0 },
  38: { x: 73.2, y: 10.5 },
  39: { x: 77.8, y: 30.5 },
  40: { x: 77.8, y: 24.5 },
  41: { x: 77.8, y: 17.5 },
  42: { x: 77.8, y: 11.5 },
  43: { x: 82.2, y: 30.5 },
  44: { x: 82.2, y: 25.0 },
  45: { x: 82.2, y: 18.5 },
  46: { x: 82.2, y: 13.5 },
  47: { x: 82.2, y: 8.5 },
  48: { x: 86.8, y: 30.5 },
  49: { x: 86.8, y: 25.0 },
  50: { x: 86.8, y: 19.0 },
  51: { x: 86.8, y: 13.5 },
  52: { x: 86.8, y: 8.5 },

  // AREA OUTDOOR & CAFE (Bawah)
  53: { x: 70.8, y: 56.5 },
  54: { x: 74.2, y: 59.5 },
  55: { x: 79.2, y: 56.5 },
  56: { x: 82.8, y: 59.5 },
  57: { x: 90.0, y: 67.5 },
  58: { x: 84.2, y: 66.5 },
  59: { x: 78.5, y: 66.5 },
  61: { x: 72.8, y: 66.5 },
  62: { x: 65.8, y: 66.5 },
  63: { x: 59.8, y: 66.5 },
  64: { x: 53.8, y: 66.5 },
  65: { x: 53.8, y: 73.0 },
  66: { x: 60.8, y: 73.0 },
  67: { x: 66.8, y: 71.0 },
  68: { x: 73.8, y: 75.5 },
  69: { x: 78.5, y: 73.0 },
  70: { x: 84.2, y: 73.0 },
  71: { x: 67.8, y: 83.5 },
  72: { x: 71.8, y: 89.0 },
  73: { x: 75.8, y: 83.5 },
  74: { x: 79.8, y: 89.0 },
  75: { x: 83.8, y: 83.5 },
  76: { x: 49.5, y: 82.5 }
};

let currentSelectedTable = null;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pinsContainer");
  if (!container) return;

  for (let i = 1; i <= 76; i++) {
    const pin = document.createElement("div");
    pin.className = "table-pin";
    pin.innerText = i;
    
    const pos = tablePositions[i] || { x: 50, y: 50 };
    
    pin.style.left = pos.x + "%";
    pin.style.top = pos.y + "%";
    
    pin.onclick = () => openModal(i);
    container.appendChild(pin);
  }
});

function openModal(tableNumber) {
  currentSelectedTable = tableNumber;
  const modalTitle = document.getElementById("modalTitle");
  if (modalTitle) modalTitle.innerText = `Daftar Tamu - Meja ${tableNumber}`;

  const savedData = JSON.parse(localStorage.getItem(`table_${tableNumber}`)) || Array(8).fill("");

  for (let i = 1; i <= 8; i++) {
    const seatInput = document.getElementById(`seat${i}`);
    if (seatInput) seatInput.value = savedData[i - 1] || "";
  }

  const modal = document.getElementById("guestModal");
  if (modal) modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("guestModal");
  if (modal) modal.style.display = "none";
}

function saveGuestData() {
  if (!currentSelectedTable) return;

  const guests = [];
  for (let i = 1; i <= 8; i++) {
    const seatInput = document.getElementById(`seat${i}`);
    const name = seatInput ? seatInput.value.trim() : "";
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
