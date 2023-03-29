const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults:0
  },
  api: {
    apiKey: '25ea83730615c0ac81169f2f44f96ccc',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

async function getApiData(endpoint) {
    // Register your key at https://www.themoviedb.org/settings/api and enter here
    // Only use this for development or very small projects. You should store your key and make requests from a server
    const API_KEY = '25ea83730615c0ac81169f2f44f96ccc';
    const API_URL = 'https://api.themoviedb.org/3/';


  
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
            <a href="tv-details.html?id=${show.id}">
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
    displayBackgroundImage("movie",movie.backdrop_path)
  
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
  
  function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }

  async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
  
    const show = await getApiData(`tv/${showId}`);
    displayBackgroundImage("tv",show.backdrop_path)
  
    const div = document.createElement('div');
  
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.title}"
    />`
        : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.title}"
  />`
    }
    </div>
    <div>
      <h2>${show.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">No of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last episode to air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Runtime:</span> ${
        show.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;
  
    document.querySelector('#show-details').appendChild(div);
  }
function swiper(){
    const swiper = new Swiper('.swiper',{
      slidesPerView : 1,
      spaceBetween:30,
      freeMode:true,
      loop:true,
      autoplay :{
        delay:4000,
        disableOnInteraction:false
      },
      breakpoints:{
        500:{
          slidesPerView:2
        },
        700:{
          slidesPerView:3
        },
        1200:{
          slidesPerView:4
        }
      }
    })
  }
  

async function displaySlider(){
  /*<div class="swiper-slide">
    <a href="movie-details.html?id=1">
      <img src="./images/no-image.jpg" alt="Movie Title" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> 8 / 10
    </h4>
  </div>*/
  const {results} = await getApiData(`movie/now_playing`)
  results.forEach((result)=>{
    const div = document.createElement('div')
    div.classList.add('swiper-slide')
    div.innerHTML=`
  
      <a href="movie-details.html?id=${result.id}">
        <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${result.vote_average} / 10
      </h4>
          
    `
    document.querySelector('.swiper-wrapper').appendChild(div)
    swiper()
  })

}


  async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');
  
    if (global.search.term !== '' && global.search.term !== null) {
      const {results,total_pages,page,total_results} = await searchAPIData();
      global.search.page=page
      global.search.totalPages=total_pages
      global.search.totalResults=total_results

      if(results.length===0){
        showAlert("Nores found","error")
        return
      }
      else{
        displaSearchResults(results)
        document.querySelector("#search-term").value=''
      }
    } else {
      showAlert('Please enter a search term',"error");
    }
  }
  
function displaSearchResults(results){
  document.querySelector("#search-results").innerHTML=``
  document.querySelector("#search-results-heading").innerHTML=``
  document.querySelector("#pagination").innerHTML=``
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              class="card-img-top"
              alt="${global.search.type==="movie"? movie.title:movie.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${global.search.type==="movie"? movie.title:movie.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type==="movie"? movie.title:movie.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type==="movie"? movie.release_date:movie.first_air_date}</small>
            </p>
          </div>
        `;
    document.querySelector('#search-results-heading').innerHTML=`
    <h2>${results.length} of ${global.search.totalResults} for ${global.search.term}</h2>`
    document.querySelector('#search-results').appendChild(div);
  })
  displayPagination()


}

function displayPagination(){
  const div = document.createElement("div")
  div.classList.add("pagination")
  div.innerHTML=`
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages} </div>
  `
  document.querySelector("#pagination").appendChild(div)
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }


  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaSearchResults(results);
  });


  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaSearchResults(results);
  })
}


  async function searchAPIData() {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
  
;
  
    const response = await fetch(
      `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
    );
  
    const data = await response.json();
  

  
    return data;
  }
  

  function showAlert(message, className) {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
  
    setTimeout(() => alertEl.remove(), 3000);
  }
  

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            console.log('Home');
            displayPopMovies()
            displaySlider()
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
          search()
            console.log("search")
            break
        case '/tv-details.html':
          console.log("tv-details")
            displayShowDetails()
            break

    }
    highLightActiveLink()
}

document.addEventListener('DOMContentLoaded',init)