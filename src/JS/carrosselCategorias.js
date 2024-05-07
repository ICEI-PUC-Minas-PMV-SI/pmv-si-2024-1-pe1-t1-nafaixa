          //Carrossel de categorias
          const rightBtn = document.querySelector('#right-btn');
          const leftBtn = document.querySelector('#left-btn');

          rightBtn.addEventListener("click", function(event) {
            const conent = document.querySelector('#wrapper-categorias');
            conent.scrollLeft += 150;
            event.preventDefault();
          });

          leftBtn.addEventListener("click", function(event) {
            const conent = document.querySelector('#wrapper-categorias');
            conent.scrollLeft -= 150;
            event.preventDefault();
          });
