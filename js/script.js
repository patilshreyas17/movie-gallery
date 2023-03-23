const global={
    currentPage:window.location.pathname
}

async function getApiData(endpoint) {
    // Register your key at https://www.themoviedb.org/settings/api and enter here
    // Only use this for development or very small projects. You should store your key and make requests from a server
    const API_KEY = '25ea83730615c0ac81169f2f44f96ccc';
    const API_URL = 'https://api.themoviedb.org/3/';

    console.log(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
  
    const data = await response.json();
  
    return data;
  }
  

  async function displayPopMovies() {
    const { results } = await getApiData('movie/popular');
  
    results.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
              </p>
            </div>
          `;
  
      document.querySelector('#popular-movies').appendChild(div);
    });
  }

  

  async function displayPopShows() {
    const { results } = await getApiData('tv/popular');
  
    results.forEach((show) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="movie-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Air-Date: ${show.first_air_date}</small>
              </p>
            </div>
          `;
  
      document.querySelector('#popular-shows').appendChild(div);
    });
  }
  

function highLightActiveLink(){
    const hreLinks = document.querySelectorAll('.nav-link')
    hreLinks.forEach((link)=>{
        if (link.getAttribute('href')===global.currentPage){
            link.classList.add("active")
        }
    })
}

async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];
  
    const movie = await getApiData(`movie/${movieId}`);
  
    const div = document.createElement('div');
  
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
        : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${movie.title}"
  />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${
        movie.budget
      }</li>
      <li><span class="text-secondary">Revenue:</span> $${
        movie.revenue
      }</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;
  
    document.querySelector('#movie-details').appendChild(div);
  }
  

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            console.log('Home');
            displayPopMovies()
            break
        case '/shows.html':
            console.log("shows")
            displayPopShows()
            break
        case '/movie-details.html':
            
            console.log("movie-details")
            displayMovieDetails()
            break
        case '/search.html':
            console.log("search")
            break
        case '/tv-details.html':
            console.log("tv-details")
            break

    }
    highLightActiveLink()
}

document.addEventListener('DOMContentLoaded',init)