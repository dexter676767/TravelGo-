document.addEventListener("DOMContentLoaded", () => {
  // LOGIN FORM
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = loginForm.querySelector(".username").value.trim();
      const password = loginForm.querySelector(".password").value.trim();

      if (username === "" || password === "") {
        alert("Nama pengguna dan kata sandi wajib diisi!");
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
      const username = signupForm.querySelector(".username").value.trim();
      const email = signupForm.querySelector(".email").value.trim();
      const password = signupForm.querySelector(".password").value.trim();

      if (username === "" || email === "" || password === "") {
        alert("Semua field wajib diisi!");
      } else {
        alert(`Sign up berhasil! Akun ${username} telah dibuat.`);
      }
    });
  }
});
