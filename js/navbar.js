function injectNavbar(activePage) {
  const navHTML = `
  <nav class="navbar" id="mainNav">
    <div class="nav-inner">
      <a href="home.html" class="nav-logo">
        <div class="logo-mark">🏥</div>
        <span class="logo-text">Medi<span>Queue</span></span>
      </a>
      <ul class="nav-links">
        <li><a href="home.html"           class="${activePage==='home'       ?'active':''}">Home</a></li>
        <li><a href="hospital-check.html" class="${activePage==='hospital'   ?'active':''}">Hospitals</a></li>
        <li><a href="suggestions.html"    class="${activePage==='suggestions'?'active':''}">Suggestions</a></li>
        <li><a href="contact.html"        class="${activePage==='contact'    ?'active':''}">Contact</a></li>
      </ul>
      <div class="nav-right">
        <div class="nav-avatar-wrap" onclick="window.location.href='profile.html'" title="My Profile">
          <img class="nav-avatar" src="" alt="Profile"/>
        </div>
        <button class="hamburger" id="hamburgerBtn" onclick="toggleSidebar()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-user">
        <img class="nav-avatar sidebar-avatar" src="" alt="User"/>
        <div>
          <div class="nav-username sidebar-name">Loading...</div>
          <div class="sidebar-role" id="sidebarRole">User</div>
        </div>
      </div>
      <button class="sidebar-close" onclick="closeSidebar()">✕</button>
    </div>
    <nav class="sidebar-nav">
      <a href="home.html"           class="sidebar-link ${activePage==='home'       ?'active':''}"><span class="sl-icon">🏠</span>Home<span class="sl-arrow">›</span></a>
      <a href="hospital-check.html" class="sidebar-link ${activePage==='hospital'   ?'active':''}"><span class="sl-icon">🏥</span>Hospitals<span class="sl-arrow">›</span></a>
      <a href="suggestions.html"    class="sidebar-link ${activePage==='suggestions'?'active':''}"><span class="sl-icon">💡</span>Suggestions<span class="sl-arrow">›</span></a>
      <a href="contact.html"        class="sidebar-link ${activePage==='contact'    ?'active':''}"><span class="sl-icon">📞</span>Contact<span class="sl-arrow">›</span></a>
      <a href="profile.html"        class="sidebar-link ${activePage==='profile'    ?'active':''}"><span class="sl-icon">👤</span>Profile<span class="sl-arrow">›</span></a>
      <div class="sidebar-divider"></div>
      <a href="admin.html" class="sidebar-link admin-link" id="adminLink" style="display:none"><span class="sl-icon">🔐</span>Admin Panel<span class="sl-arrow">›</span></a>
    </nav>
    <div class="sidebar-footer">
      <button class="logout-btn" onclick="logout()">🚪 Sign Out</button>
    </div>
  </aside>`;
  document.body.insertAdjacentHTML("afterbegin", navHTML);
  setTimeout(()=>{
    if(window.isAdmin){
      const al=document.getElementById("adminLink");
      const re=document.getElementById("sidebarRole");
      if(al)al.style.display="flex";
      if(re)re.textContent="Admin 🔐";
    }
  },1500);
}
function toggleSidebar(){
  const s=document.getElementById("sidebar"),o=document.getElementById("sidebarOverlay"),h=document.getElementById("hamburgerBtn"),isOpen=s.classList.contains("open");
  s.classList.toggle("open");o.classList.toggle("open");h.classList.toggle("open");
  document.body.style.overflow=isOpen?"":"hidden";
}
function closeSidebar(){
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("open");
  const h=document.getElementById("hamburgerBtn");if(h)h.classList.remove("open");
  document.body.style.overflow="";
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSidebar();});