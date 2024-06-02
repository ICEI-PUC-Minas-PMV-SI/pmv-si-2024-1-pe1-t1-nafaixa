document.addEventListener('DOMContentLoaded', function () {
    const meuPerfilLink = document.getElementById('meu-perfil');
    meuPerfilLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'cadastro-produtor.html?edit';
    });

    function updateNavbar() {
        const userData = localStorage.getItem('userData');
        const navbarLoggedOut = document.getElementById('navbar-logged-out');
        const navbarLoggedOutMobile = document.getElementById('navbar-logged-out-mobile');
        const navbarLoggedIn = document.getElementById('navbar-logged-in');

        if (userData && userData.length > 0) {
            navbarLoggedOutMobile.style.display = 'none';
            navbarLoggedOut.style.display = 'none';
            navbarLoggedIn.style.display = 'block';
        } else {
            navbarLoggedOutMobile.style.display = 'block';
            navbarLoggedOut.style.display = 'block';
            navbarLoggedIn.style.display = 'none';
        }
    }


    updateNavbar();
});