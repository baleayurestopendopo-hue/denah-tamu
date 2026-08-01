// Mengambil data langsung dari Tab Sheet 2 (gid=398888358)
const SPREADSHEET_ID = "1cC9Xf2CFO33_BHAOVC3UZtHNNJSIRAjkUNoNmkHQSVU";
const API_URL = `https://opensheet.elk.sh/${SPREADSHEET_ID}/2`; // Nomor 2 menandakan Sheet/Tab ke-2

const tablePositions = {
  // AREA Karpet Cokelat (Kiri)
  1:  { x: 19.5, y: 24.2 }, 2:  { x: 19.5, y: 18.2 }, 3:  { x: 17.0, y: 12.0 },
  4:  { x: 22.8, y: 12.0 }, 5:  { x: 25.0, y: 18.2 }, 6:  { x: 25.0, y: 24.2 },
  7:  { x: 28.8, y: 12.0 }, 8:  { x: 30.8, y: 18.2 }, 9:  { x: 34.8, y: 12.0 },
  10: { x: 36.8, y: 18.2 }, 60: { x: 34.8, y: 21.0 }, 11: { x: 40.5, y: 12.0 },
  12: { x: 44.8, y: 21.0 }, 13: { x: 44.8, y: 12.0 }, 14: { x: 47.8, y: 18.2 },
  15: { x: 49.0, y: 12.0 },

  // AREA Karpet Cream (Kanan)
  16: { x: 53.5, y: 24.5 }, 17: { x: 53.5, y: 18.2 }, 18: { x: 53.5, y: 12.0 },
  19: { x: 58.0, y: 31.8 }, 20: { x: 58.0, y: 24.5 }, 21: { x: 58.0, y: 18.2 },
  22: { x: 58.0, y: 12.0 }, 23: { x: 62.5, y: 31.8 }, 24: { x: 62.5, y: 26.5 },
  25: { x: 62.5, y: 20.2 }, 26: { x: 62.5, y: 14.8 }, 27: { x: 67.0, y: 29.8 },
  28: { x: 67.0, y: 23.5 }, 29: { x: 67.0, y: 18.2 }, 30: { x: 67.0, y: 12.0 },
  31: { x: 71.5, y: 31.8 }, 32: { x: 71.5, y: 24.5 }, 33: { x: 71.5, y: 18.8 },
  34: { x: 71.5, y: 13.2 }, 35: { x: 76.0, y: 28.8 }, 36: { x: 76.0, y: 21.8 },
  37: { x: 76.0, y: 16.5 }, 38: { x: 76.0, y: 10.8 }, 39: { x: 80.5, y: 31.8 },
  40: { x: 80.5, y: 25.5 }, 41: { x: 80.5, y: 18.2 }, 42: { x: 80.5, y: 12.0 },
  43: { x: 85.0, y: 31.8 }, 44: { x: 85.0, y: 26.0 }, 45: { x: 85.0, y: 19.2 },
  46: { x: 85.0, y: 14.0 }, 47: { x: 85.0, y: 8.8 },  48: { x: 89.5, y: 31.8 },
  49: { x: 89.5, y: 26.0 }, 50: { x: 89.5, y: 19.8 }, 51: { x: 89.5, y: 14.0 },
  52: { x: 89.5, y: 8.8 },

  // AREA OUTDOOR & CAFE (Bawah)
  53: { x: 73.2, y: 56.5 }, 54: { x: 76.8, y: 59.8 }, 55: { x: 81.8, y: 56.5 },
  56: { x: 85.2, y: 59.8 }, 57: { x: 92.5, y: 67.8 }, 58: { x: 86.8, y: 66.8 },
  59: { x: 80.8, y: 66.8 }, 61: { x: 74.8, y: 66.8 }, 62: { x: 67.8, y: 66.8 },
  63: { x: 61.8, y: 66.8 }, 64: { x: 55.8, y: 66.8 }, 65: { x: 55.8, y: 73.5 },
  66: { x: 62.8, y: 73.5 }, 67: { x: 68.8, y: 71.5 }, 68: { x: 75.8, y: 76.0 },
  69: { x: 80.8, y: 73.5 }, 70: { x: 86.8, y: 73.5 }, 71: { x: 69.8, y: 83.8 },
  72: { x: 73.8, y: 89.5 }, 73: { x: 77.8, y: 83.8 }, 74: { x: 81.8, y: 89.5 },
  75: { x: 85.8, y: 83.8 }, 76: { x: 50.2, y: 82.8 }
};

let allGuestData = {};
let currentSelectedTable = null;

document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("pinsContainer");
  if (!container) return;

  for (var i = 1; i <= 76; i++) {
    var pin = document.createElement("div");
    pin.className = "table-pin";
    pin.innerText = i;

    var pos = tablePositions[i] || { x: 50, y: 50 };
    pin.style.left = pos.x + "%";
    pin.style.top = pos.y + "%";

    (function (tableNum) {
      pin.onclick = function () {
        openModal(tableNum);
      };
    })(i);

    container.appendChild(pin);
  }

  // Tarik data Google Sheets
  fetchSheetData();
});

function fetchSheetData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      allGuestData = {};
      data.forEach(row => {
        // Ambil nilai kolom Meja / Table
        var tableNum = parseInt(row["Meja"] || row["meja"] || row["NO MEJA"] || row["No Meja"] || Object.values(row)[0]);
        if (!isNaN(tableNum)) {
          var keys = Object.keys(row);
          var seats = [];
          
          // Ambil nilai 8 kolom nama setelah nomor meja
          for (var j = 1; j < keys.length && j <= 8; j++) {
            seats.push(row[keys[j]] || "");
          }
          allGuestData[tableNum] = seats;
        }
      });
      console.log("Data berhasil ditarik dari Sheets:", allGuestData);
    })
    .catch(error => console.error("Gagal menarik data dari Google Sheets:", error));
}

function openModal(tableNumber) {
  currentSelectedTable = tableNumber;
  var modalTitle = document.getElementById("modalTitle");
  if (modalTitle) {
    modalTitle.innerText = "Daftar Tamu - Meja " + tableNumber;
  }

  var savedData = allGuestData[tableNumber] || ["", "", "", "", "", "", "", ""];

  for (var i = 1; i <= 8; i++) {
    var seatInput = document.getElementById("seat" + i);
    if (seatInput) {
      seatInput.value = savedData[i - 1] || "";
    }
  }

  var modal = document.getElementById("guestModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal() {
  var modal = document.getElementById("guestModal");
  if (modal) {
    modal.style.display = "none";
  }
}

window.onclick = function (event) {
  var modal = document.getElementById("guestModal");
  if (event.target === modal) {
    closeModal();
  }
};
