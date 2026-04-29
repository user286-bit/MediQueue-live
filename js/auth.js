// ============================================================
//  AUTH.JS  –  Handles login, logout, and page protection
// ============================================================

// ── Which page is this? ──────────────────────────────────────
const PAGE = window.location.pathname.split("/").pop() || "index.html";

const PUBLIC_PAGES = ["index.html", ""];   // No login needed
const ADMIN_PAGE   = "admin.html";

// ── Listen for auth state ────────────────────────────────────
auth.onAuthStateChanged(async (user) => {

  // Not logged in
  if (!user) {
    if (!PUBLIC_PAGES.includes(PAGE)) {
      window.location.href = "index.html";
    }
    return;
  }

  // Logged in → redirect away from login page
  if (PUBLIC_PAGES.includes(PAGE)) {
    window.location.href = "home.html";
    return;
  }

  // Admin page check
  if (PAGE === ADMIN_PAGE) {
    if (!ADMIN_EMAILS.includes(user.email)) {
      alert("⛔ Access Denied. You are not an admin.");
      window.location.href = "home.html";
      return;
    }
  }

  // Store user info globally
  window.currentUser = user;
  window.isAdmin     = ADMIN_EMAILS.includes(user.email);

  // Update navbar user info if available
  updateNavbarUser(user);
});

// ── Google Login ─────────────────────────────────────────────
function loginWithGoogle() {
  const btn = document.getElementById("googleLoginBtn");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Signing in...`;
  }

  auth.signInWithPopup(googleProvider)
    .then(() => { window.location.href = "home.html"; })
    .catch((err) => {
      console.error(err);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20"/> Sign in with Google`;
      }
      alert("Login failed: " + err.message);
    });
}

// ── Logout ───────────────────────────────────────────────────
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// ── Update navbar avatar / name ──────────────────────────────
function updateNavbarUser(user) {
  const nameEls   = document.querySelectorAll(".nav-username");
  const photoEls  = document.querySelectorAll(".nav-avatar");

  nameEls.forEach(el  => el.textContent = user.displayName || "User");
  photoEls.forEach(el => {
    el.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=0ea5e9&color=fff`;
    el.alt = user.displayName;
  });
}