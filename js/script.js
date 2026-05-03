// Validasi sederhana untuk form login & sign up
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");
  const signupForm = document.querySelector("#signupForm");

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
});
