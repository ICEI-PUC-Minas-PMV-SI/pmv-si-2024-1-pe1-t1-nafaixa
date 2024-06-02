document.addEventListener('DOMContentLoaded', function () {
    const meuPerfilLink = document.getElementById('meu-perfil');
    if (meuPerfilLink) {
        meuPerfilLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'cadastro-produtor.html?edit';
        });
    }

    function updateNavbar() {
        const userData = localStorage.getItem('userData');
        const navbarLoggedOutMobile = document.getElementById('navbar-logged-out-mobile');
        const navbarLoggedOut = document.getElementById('navbar-logged-out');
        const navbarLoggedIn = document.getElementById('navbar-logged-in');
        const searchBars = document.querySelectorAll('.nav-search');
        const criarEventoLinks = document.querySelectorAll('a[href="criar-evento.html"]');

        console.log('Updating navbar...');
        console.log('User data:', userData);

        if (userData) {
            navbarLoggedOutMobile.style.display = 'none';
            navbarLoggedOut.style.display = 'none';
            navbarLoggedIn.style.display = 'flex';
        } else {
            if (window.innerWidth < 864) {
                navbarLoggedOutMobile.style.display = 'flex';
                navbarLoggedOut.style.display = 'none';
            } else {
                navbarLoggedOutMobile.style.display = 'none';
                navbarLoggedOut.style.display = 'flex';
            }
            navbarLoggedIn.style.display = 'none';
        }

        if (window.innerWidth < 864 && userData) {
            searchBars.forEach(searchBar => {
                searchBar.style.display = 'none';
            });
            criarEventoLinks.forEach(link => {
                link.style.display = 'none';
            });
        } else {
            searchBars.forEach(searchBar => {
                searchBar.style.display = 'flex';
            });
            criarEventoLinks.forEach(link => {
                link.style.display = 'block';
            });
        }
    }

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
                        console.log('Produtor image updated:', data.logo);
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

    window.addEventListener('resize', updateNavbar);

    updateNavbar();
    updateProdutorImage();
});
