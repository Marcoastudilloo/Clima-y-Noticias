document.getElementById('buscar').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudad').value;
    console.log('Ciudad buscada:', ciudad);

    Promise.all([
        fetch(`/api/clima?ciudad=${ciudad}`),
        fetch(`/api/noticias?ciudad=${ciudad}`)
    ])
    .then(responses => {
        return Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        }));
    })
    .then(data => {
        const climaData = data[0];
        const noticiasData = data[1];

        // Manejo del clima
        const climaDiv = document.getElementById('clima');
        climaDiv.style.opacity = 0; // Inicialmente oculto
        if (climaData.error) {
            climaDiv.innerHTML = `<p>${climaData.error}</p>`;
        } else {
            climaDiv.innerHTML = `<h2>Clima en ${climaData.name}</h2><p>${climaData.main.temp} °C</p>`;
        }

        // Manejo de noticias
        const noticiasDiv = document.getElementById('noticias');
        noticiasDiv.style.opacity = 0; // Inicialmente oculto
        noticiasDiv.innerHTML = '<h2>Últimas Noticias</h2>';

        if (noticiasData.articles && noticiasData.articles.length > 0) {
            noticiasData.articles.forEach(article => {
                noticiasDiv.innerHTML += `<p>${article.title}</p>`;
            });
        } else {
            noticiasDiv.innerHTML += '<p>No hay noticias disponibles.</p>';
        }

        // Mostrar con animación
        fadeIn(climaDiv);
        fadeIn(noticiasDiv);
    })
    .catch(error => {
        console.error('Error en las solicitudes:', error);
        const noticiasDiv = document.getElementById('noticias');
        noticiasDiv.innerHTML = '<p>Hubo un error al obtener las noticias.</p>';
    });
});

// Función para animar la aparición
function fadeIn(element) {
    let opacity = 0;
    element.style.display = 'block'; // Asegúrate de que el elemento esté visible
    const interval = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 50);
}
