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
        case 'movie-details':
            console.log("movie-details")
            break
        case 'search.html':
            console.log("search")
            break
        case 'tv-details':
            console.log("tv-details")
            break

    }
    highLightActiveLink()
}

document.addEventListener('DOMContentLoaded',init)