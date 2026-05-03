document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // HOMEPAGE (Search bar)
  // =========================
  const searchBar = document.querySelector(".search-bar input");
  if (searchBar) {
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
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = loginForm.querySelector(".username").value.trim();
      const password = loginForm.querySelector(".password").value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const match = users.find(
        (u) => u.username === username && u.password === password
      );

      if (match) {
        alert(`Login berhasil! Selamat datang, ${username}`);
        window.location.href = "index.html"; // redirect ke homepage
      } else {
        alert("Login gagal! Username atau password salah.");
      }
    });
  }

  // =========================
  // SIGN UP FORM
  // =========================
  const signupForm = document.querySelector("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = signupForm.querySelector(".username").value.trim();
      const email = signupForm.querySelector(".email").value.trim();
      const password = signupForm.querySelector(".password").value.trim();

      if (!username || !email || !password) {
        alert("Semua field wajib diisi!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const exists = users.find(
        (u) => u.username === username || u.email === email
      );

      if (exists) {
        alert("Username atau email sudah terdaftar!");
      } else {
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Akun ${username} berhasil dibuat!`);
        window.location.href = "login.html"; // redirect ke login
      }
    });
  }
});
