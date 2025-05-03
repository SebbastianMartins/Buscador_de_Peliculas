const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const movieLists = document.getElementById('movieLists');
const movieDetails = document.getElementById('movieDetails');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});

function fetchMovies(query) {
  fetch(`https://search.imdbot.workers.dev/?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data && data.description) {
        displayMovies(data.description);
      } else {
        movieLists.innerHTML = '<p>No se encontraron películas.</p>';
      }
    })
    .catch(error => {
      console.error('Error al obtener las películas:', error);
    });
}


function displayMovies(movies) {
  movieLists.innerHTML = '';
  movies.forEach(movie => {
    console.log(movie);
    

    const title = movie.title || 'Título no disponible';
    const year = movie['#YEAR'] || 'Año no disponible';
    const poster = movie['#IMG_POSTER'] || 'https://via.placeholder.com/200x300';
    const imdbId = movie['#IMDB_ID'] || 'ID no disponible';
    
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${year}</p>
      <img src="${poster}" alt="${title}" />
    `;
    card.addEventListener('click', () => {
      displayMovieDetails(movie);
    });
    movieLists.appendChild(card);
  });
}


function displayMovieDetails(movie) {
  movieDetails.innerHTML = `
    <h2>${movie.title} (${movie['#YEAR'] || ''})</h2>
    <img src="${movie['#IMG_POSTER'] || 'https://dummyimage.com/200x300/000/fff'}" alt="${movie.title}" />
    <p>ID: ${movie['#IMDB_ID']}</p>
  `;
}

