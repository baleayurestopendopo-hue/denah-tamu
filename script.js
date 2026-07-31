ayurestopendopo-hue.github.io/denah-tamu/

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
