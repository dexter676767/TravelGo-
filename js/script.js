// Script TravelGo! untuk Login, Sign Up, dan Homepage
document.addEventListener("DOMContentLoaded", () => {
  // LOGIN FORM
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = loginForm.querySelector(".username").value;
      const password = loginForm.querySelector(".password").value;

      if (username === "" || password === "") {
        alert("Username dan Password wajib diisi!");
      } else {
        alert(`Login berhasil! Selamat datang, ${username}`);
      }
    });
  }

  // SIGN UP FORM
  const signupForm = document.querySelector("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = signupForm.querySelector(".username").value;
      const email = signupForm.querySelector(".email").value;
      const password = signupForm.querySelector(".password").value;

      if (username === "" || email === "" || password === "") {
        alert("Semua field wajib diisi!");
      } else {
        alert(`Sign up berhasil! Akun ${username} telah dibuat.`);
      }
    });
  }

  // SEARCH BAR HOMEPAGE
  const searchBar = document.querySelector(".search-bar input");
  const searchButtons = document.querySelectorAll(".search-bar button");

  if (searchBar && searchButtons.length > 0) {
    searchButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (searchBar.value.trim() === "") {
          alert("Masukkan kata kunci pencarian terlebih dahulu!");
        } else {
          alert(`Mencari: ${searchBar.value}`);
        }
      });
    });
  }
});
