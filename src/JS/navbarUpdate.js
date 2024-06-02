document.addEventListener('DOMContentLoaded', function () {
    const meuPerfilLink = document.getElementById('meu-perfil');
    meuPerfilLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'cadastro-produtor.html?edit';
    });

    function updateNavbar() {
        const userData = localStorage.getItem('userData');
        const navbarLoggedOutMobile = document.getElementById('navbar-logged-out-mobile');
        const navbarLoggedOut = document.getElementById('navbar-logged-out');
        const navbarLoggedIn = document.getElementById('navbar-logged-in');
        const searchBars = document.querySelectorAll('.nav-search');

        navbarLoggedOutMobile.style.display = userData ? 'none' : 'flex';
        navbarLoggedOut.style.display = userData ? 'none' : 'flex';
        navbarLoggedIn.style.display = userData ? 'flex' : 'none';

        if (window.innerWidth < 864 && userData) {
            searchBars.forEach(searchBar => {
                searchBar.style.display = 'none';
            });
        } else {
            searchBars.forEach(searchBar => {
                searchBar.style.display = 'flex';
            });
        }
    }

    window.addEventListener('resize', updateNavbar);

    document.addEventListener('DOMContentLoaded', updateNavbar);

    async function updateProdutorImage() {
        const produtorId = localStorage.getItem('userData');
        if (produtorId) {
            const produtorImg = document.getElementById('logo-produtor-menu');
            try {
                const response = await fetch(`http://localhost:3000/produtor/${produtorId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.logo) {
                        produtorImg.src = data.logo;
                    } else {
                        console.error('URL da imagem do produtor está vazia.');
                    }
                } else {
                    console.error('Erro ao obter dados do produtor:', response.status);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do produtor:', error);
            }
        }
    }

    window.onload = function () {
        updateNavbar();
        updateProdutorImage();
    };
});
