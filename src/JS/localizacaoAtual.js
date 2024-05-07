        // // Função para obter a localização do usuário e preencher os dados
        // function getUserLocationAndFillData() {
        //     if ('geolocation' in navigator) {
        //         navigator.geolocation.getCurrentPosition(function(position) {
        //             const latitude = position.coords.latitude;
        //             const longitude = position.coords.longitude;

        //             const KEY = "AIzaSyC6Mt2GUjTup_ly3tWro_MnX6L9v_l5o1s"; // Substitua pela sua chave de API do Google Maps

        //             // Montando a URL da requisição de geocodificação reversa
        //             const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;

        //             // Fazendo a requisição para a API de geocodificação reversa
        //             fetch(url)
        //                 .then(response => response.json())
        //                 .then(data => {
        //                     console.log(data); // Exibir dados no console para depuração



        //                     // Extraindo e exibindo o nome da cidade no elemento HTML web
        //                     const addressComponents = data.results[0].address_components;
        //                     addressComponents.forEach(part => {
        //                         if (part.types.includes("administrative_area_level_2")) {
        //                             const cityName = part.long_name;
        //                             document.getElementById('city').innerHTML = `<p> ${cityName}</p>`;
        //                         }
        //                     });

        //                       // Extraindo e exibindo o nome da cidade no elemento HTML mobile
        //                       const addressComponents2 = data.results[0].address_components;
        //                     addressComponents2.forEach(part => {
        //                         if (part.types.includes("administrative_area_level_2")) {
        //                             const cityName1 = part.long_name;
        //                             document.getElementById('city1').innerHTML = `<p> ${cityName1}</p>`;
        //                         }
        //                     });
        //                 })
        //                 .catch(error => {
        //                     console.error('Erro ao obter dados de localização:', error);
        //                 });
        //         }, function(error) {
        //             console.error('Erro ao obter a localização do usuário:', error);
        //         });
        //     } else {
        //         console.error('Geolocalização não é suportada pelo navegador.');
        //     }
        // }