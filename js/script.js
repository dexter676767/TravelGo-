document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // HOMEPAGE (Search bar)
  // =========================
  const searchBar = document.querySelector(".search-bar input");
  if (searchBar) {
    console.log("Homepage aktif: search bar tersedia");
    // contoh interaksi
    searchBar.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        alert(`Mencari restoran: ${searchBar.value}`);
      }
    });
  }

  // =========================
  // LOGIN FORM
  // =========================
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    console.log("Halaman login aktif");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = loginForm.querySelector(".username").value.trim();
      const password = loginForm.querySelector(".password").value.trim();

      if (username === "" || password === "") {
        alert("Nama pengguna dan kata sandi wajib diisi!");
      } else if (username === "admin" && password === "12345") {
        alert("Login berhasil! Selamat datang, Admin.");
        window.location.href = "index.html"; // redirect ke homepage
      } else {
        alert("Login gagal! Periksa kembali username dan password.");
      }
    });
  }

  // =========================
  // SIGN UP FORM
  // =========================
  const signupForm = document.querySelector("#signupForm");
  if (signupForm) {
    console.log("Halaman signup aktif");
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = signupForm.querySelector(".username").value.trim();
      const email = signupForm.querySelector(".email").value.trim();
      const password = signupForm.querySelector(".password").value.trim();

      if (username === "" || email === "" || password === "") {
        alert("Semua field wajib diisi!");
      } else {
        alert(`Akun ${username} berhasil dibuat!`);
        window.location.href = "login.html"; // redirect ke login
      }
    });
  }
});
