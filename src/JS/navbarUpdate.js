function updateNavbar() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navbarLoggedOut = document.getElementsById('navbar-logged-out');
    const navbarLoggedIn = document.getElementById('navbar-logged-in');
  
    if (userData && userData.id) {
        navbarLoggedOut.style.display = 'none';
        navbarLoggedIn.style.display = 'block';
    } else {
        navbarLoggedOut.style.display = 'block';
        navbarLoggedIn.style.display = 'none';
    }
  }
  
  
  updateNavbar();