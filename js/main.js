// ======================= DATA RESTORAN =======================
let restaurants = [];

// Load data dari JSON file
async function loadRestaurants() {
  try {
    showLoading(true);
    const response = await fetch('data/restaurants.json');
    if (!response.ok) throw new Error('Gagal memuat data');
    const data = await response.json();
    restaurants = data.restaurants;
    initSeatMaps();
    renderRestaurants(restaurants);
    renderTop3();
    showLoading(false);
  } catch (error) {
    console.error('Error loading data:', error);
    // Fallback data jika JSON gagal dimuat
    restaurants = getFallbackData();
    initSeatMaps();
    renderRestaurants(restaurants);
    renderTop3();
    showLoading(false);
  }
}

// Fallback data jika JSON tidak tersedia
function getFallbackData() {
  return [
    {
      id: 1, name: "Lumpang Emas Signature - Prapanca", category: "indonesian",
      location: "Jl. Prapanca Raya No.40A, Pulo, Jakarta Selatan",
      operationHours: "10.00–22.00 (Setiap hari)",
      priceRange: "Rp87k - Rp393k",
      rating: 4.8, totalReviews: 1127,
      facilities: "Wheelchair access, Toilet, Wi-Fi, Bar on site",
      menuHighlights: "Paru Asam Manis, Steak Nusantara",
      phone: "(021)80600900", website: "lumpangemas.com",
      imgIcon: "🍖", totalSeats: 42, seatMap: []
    },
    {
      id: 2, name: "Cerita Rasa Nusantara", category: "indonesian",
      location: "Jl. Ampera Raya No.9, Cilandak Timur, Jakarta Selatan",
      operationHours: "10.00–22.00 setiap hari",
      priceRange: "Rp39k - Rp169k",
      rating: 4.6, totalReviews: 4795,
      facilities: "Live music, Free parking, Wi-Fi, Private dining",
      menuHighlights: "Gurame Bakar, Ayam Taliwang",
      phone: "02178831600", website: "ceritarasa.co.id",
      imgIcon: "🍛", totalSeats: 56, seatMap: []
    },
    {
      id: 3, name: "Jakarta Restaurant & The Courtyard", category: "international",
      location: "Jl. Brawijaya Raya No.26, Kebayoran Baru",
      operationHours: "07.00–22.00 setiap hari",
      priceRange: "Rp115k - Rp595k",
      rating: 4.7, totalReviews: 639,
      facilities: "Halal food, Art Deco, Valet parking",
      menuHighlights: "Sop Buntut, Beef Tenderloin",
      phone: "08111025999", website: "the-dharmawangsa.com",
      imgIcon: "🍽️", totalSeats: 78, seatMap: []
    },
    {
      id: 4, name: "Plataran Dharmawangsa", category: "indonesian",
      location: "Jl. Dharmawangsa Raya No.6, Kebayoran Baru",
      operationHours: "11.00–22.00 setiap hari",
      priceRange: "Rp55k - Rp225k",
      rating: 4.7, totalReviews: 4112,
      facilities: "Live music, Joglo house, Organic dishes",
      menuHighlights: "Dendeng Batokok, Empal Gentong",
      phone: "(021)29044167", website: "plataran.com",
      imgIcon: "🍲", totalSeats: 64, seatMap: []
    },
    {
      id: 5, name: "Abunawas Restaurant - Kemang", category: "middle-eastern",
      location: "Jl. Kemang Utara No.15, Bangka, Jakarta Selatan",
      operationHours: "09.00–21.45 setiap hari",
      priceRange: "Rp42k - Rp855k",
      rating: 4.6, totalReviews: 3173,
      facilities: "Middle Eastern decor, Valet parking",
      menuHighlights: "Mandhi Lamb, Mix Grill",
      phone: "(021)71794691", website: "abunawasresto.com",
      imgIcon: "🥘", totalSeats: 50, seatMap: []
    }
  ];
}

function showLoading(show) {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) spinner.style.display = show ? 'flex' : 'none';
}

// Generate seat map random
function generateSeatMap(resto) {
  const total = resto.totalSeats;
  let seats = [];
  for (let i = 1; i <= total; i++) {
    let isBooked = Math.random() < 0.25;
    seats.push({ seatNumber: i, isBooked: isBooked, isSelected: false });
  }
  return seats;
}

function initSeatMaps() {
  restaurants.forEach(r => {
    if (!r.seatMap || r.seatMap.length === 0) {
      r.seatMap = generateSeatMap(r);
    }
  });
}

function getAvailableSeatsCount(resto) {
  return resto.seatMap.filter(seat => !seat.isBooked).length;
}

// Render TOP 3
function renderTop3() {
  const sorted = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const topContainer = document.getElementById('top3Container');
  if (!topContainer) return;
  
  topContainer.innerHTML = '';
  sorted.forEach(r => {
    const card = document.createElement('div');
    card.className = 'top-card';
    card.innerHTML = `
      <div class="badge"><i class="fas fa-crown"></i> HOT PICK</div>
      <h3>${r.name}</h3>
      <div class="location"><i class="fas fa-location-dot"></i> ${r.location.substring(0, 40)}...</div>
      <div class="rating">⭐ ${r.rating} (${r.totalReviews}+ ratings)</div>
      <button class="btn-more" data-id="${r.id}"><i class="fas fa-info-circle"></i> Detail</button>
    `;
    card.querySelector('.btn-more').addEventListener('click', () => showRestoDetail(r));
    topContainer.appendChild(card);
  });
}

function showRestoDetail(resto) {
  alert(📍 ${resto.name}\n📞 ${resto.phone}\n🌐 ${resto.website}\n🍽️ Menu: ${resto.menuHighlights}\n💰 ${resto.priceRange}\n🪑 Kursi tersedia: ${getAvailableSeatsCount(resto)});
}

// Render semua restoran
function renderRestaurants(filteredData) {
  const container = document.getElementById('restoGrid');
  if (!container) return;
  container.innerHTML = '';
  
  filteredData.forEach(resto => {
    const available = getAvailableSeatsCount(resto);
    const card = document.createElement('div');
    card.className = 'resto-card';
    card.innerHTML = `
      <div class="card-img">${resto.imgIcon} <span style="font-size:0.8rem; margin-left:5px">⭐ ${resto.rating}</span></div>
      <div class="card-content">
        <div class="resto-name">${resto.name}</div>
        <div class="resto-loc"><i class="fas fa-map-marker-alt"></i> ${resto.location}</div>
        <div class="hours-badge"><i class="far fa-clock"></i> ${resto.operationHours.substring(0, 45)}${resto.operationHours.length > 45 ? '..' : ''}</div>
        <div class="price"><i class="fas fa-tag"></i> ${resto.priceRange}</div>
        <div class="rating-stars">⭐ ${resto.rating} (${resto.totalReviews} ulasan)</div>
        <div class="amenities">${resto.facilities.split(',').slice(0, 3).map(f => <span>${f.trim()}</span>).join('')}</div>
        <div class="action-buttons">
          <button class="btn-check-seats" data-id="${resto.id}"><i class="fas fa-chair"></i> Cek Kursi (${available})</button>
          <button class="btn-reserve" data-id="${resto.id}"><i class="fas fa-calendar-check"></i> Reservasi</button>
        </div>
        <div class="resto-info"><i class="fas fa-phone"></i> ${resto.phone} | <i class="fas fa-globe"></i> ${resto.website}<br><i class="fas fa-utensils"></i> Menu: ${resto.menuHighlights}</div>
      </div>
    `;
    container.appendChild(card);
  });
  
  attachButtonEvents();
}

function attachButtonEvents() {
  document.querySelectorAll('.btn-check-seats').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.getAttribute('data-id'));
      openSeatViewer(id);
    });
  });
  document.querySelectorAll('.btn-reserve').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.getAttribute('data-id'));
      openReservationModal(id);
    });
  });
}

let tempSelectedSeats = [];

function openSeatViewer(restoId) {
  const resto = restaurants.find(r => r.id === restoId);
  renderSeatModal(resto, 'view', null);
}

function openReservationModal(restoId) {
  const resto = restaurants.find(r => r.id === restoId);
  tempSelectedSeats = [];
  renderSeatModal(resto, 'reserve', (selectedSeatsArray) => {
    if (selectedSeatsArray.length === 0) {
      alert("Pilih minimal 1 kursi/meja!");
      return false;
    }
    const guestName = prompt("Masukkan nama Anda untuk reservasi:", "Pelanggan TravelGo");
    if (!guestName) return false;
    
    selectedSeatsArray.forEach(seatNum => {
      const seatObj = resto.seatMap.find(s => s.seatNumber === seatNum);
      if (seatObj && !seatObj.isBooked) seatObj.isBooked = true;
    });
    
    alert(✅ Reservasi berhasil!\nRestoran: ${resto.name}\nNama: ${guestName}\nKursi: ${selectedSeatsArray.join(', ')}\nSisa kursi: ${getAvailableSeatsCount(resto)});
    
    // Simpan ke localStorage
    saveReservationToLocal(resto.id, guestName, selectedSeatsArray);
    
    const filtered = getFilteredRestaurants();
    renderRestaurants(filtered);
    renderTop3();
    document.getElementById('reservationModal').style.display = 'none';
    return true;
  });
}

function saveReservationToLocal(restoId, guestName, seats) {
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  reservations.push({
    restoId: restoId,
    guestName: guestName,
    seats: seats,
    date: new Date().toISOString()
  });
  localStorage.setItem('reservations', JSON.stringify(reservations));
}

function renderSeatModal(resto, mode, onConfirmCallback) {
  const modal = document.getElementById('reservationModal');
  const modalContentDiv = document.getElementById('modalContentDynamic');
  const availableSeats = getAvailableSeatsCount(resto);

  let seatsHtml = <div class="seat-screen"><i class="fas fa-film"></i> 🪑 PILIH KURSI / MEJA</div>;
  seatsHtml += <div class="seats-grid" id="dynamicSeatsGrid">;
  
  resto.seatMap.forEach(seat => {
    let seatClass = 'seat';
    let statusText = '';
    if (seat.isBooked) {
      seatClass += ' booked';
      statusText = 'Dipesan';
    } else {
      seatClass += ' available';
      statusText = 'Tersedia';
    }
    let isTempSelected = (mode === 'reserve' && tempSelectedSeats.includes(seat.seatNumber));
    let extraSelected = isTempSelected ? ' selected' : '';
    seatsHtml += `<div class="${seatClass}${extraSelected}" data-seat="${seat.seatNumber}" data-booked="${seat.isBooked}">
                    <i class="fas fa-chair"></i> <strong>${seat.seatNumber}</strong><br><small>${statusText}</small>
                  </div>`;
  });
  
  seatsHtml += </div><div class="seat-info"><i class="fas fa-info-circle"></i> Total kursi: ${resto.totalSeats} | Tersedia: ${availableSeats} | <span id="selectedCounter">0</span> kursi dipilih</div>;

  let actionButtons = '';
  if (mode === 'reserve') {
    actionButtons = <div class="modal-buttons"><button id="cancelReserveBtn" class="close-modal">Batal</button><button id="confirmBookingBtn" class="submit-modal"><i class="fas fa-check-circle"></i> Konfirmasi Reservasi</button></div>;
  } else {
    actionButtons = <div class="modal-buttons"><button id="closeSeatViewBtn" class="close-modal">Tutup</button></div>;
  }

  modalContentDiv.innerHTML = `
    <h3><i class="fas fa-utensils"></i> ${resto.name}</h3>
    <p style="font-size:0.85rem; margin-bottom:10px;"><strong>Jam:</strong> ${resto.operationHours}</p>
    ${seatsHtml}
    ${actionButtons}
  `;
  modal.style.display = 'flex';

  if (mode === 'reserve') {
    const seatsDivs = document.querySelectorAll('#dynamicSeatsGrid .seat');
    const updateCounter = () => {
      const counterSpan = document.getElementById('selectedCounter');
      if (counterSpan) counterSpan.innerText = tempSelectedSeats.length;
    };
    
    seatsDivs.forEach(seatDiv => {
      seatDiv.addEventListener('click', () => {
        const seatNum = parseInt(seatDiv.getAttribute('data-seat'));
        const isBooked = seatDiv.getAttribute('data-booked') === 'true';
        if (isBooked) {
          alert(Kursi ${seatNum} sudah dipesan.);
          return;
        }
        if (tempSelectedSeats.includes(seatNum)) {
          tempSelectedSeats = tempSelectedSeats.filter(s => s !== seatNum);
          seatDiv.classList.remove('selected');
        } else {
          tempSelectedSeats.push(seatNum);
          seatDiv.classList.add('selected');
        }
        updateCounter();
      });
    });
    
    document.getElementById('confirmBookingBtn')?.addEventListener('click', () => {
      if (onConfirmCallback) onConfirmCallback(tempSelectedSeats);
      else modal.style.display = 'none';
    });
    document.getElementById('cancelReserveBtn')?.addEventListener('click', () => {
      modal.style.display = 'none';
      tempSelectedSeats = [];
    });
  } else {
    document.getElementById('closeSeatViewBtn')?.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  
  window.onclick = function(e) { 
    if (e.target === modal) modal.style.display = 'none'; 
  };
}

function getFilteredRestaurants() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document
