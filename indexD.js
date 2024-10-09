let carousel = document.querySelector(".carousel");
let movieContainer = document.querySelector(".movie");
let movieRecommendation = document.querySelector(".recommendations");
const API_KEY = "api_key=b4b5f9d98442f11bbdd50a5adf70f1d1";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const language = "language=pt-BR";
let movies = [];

function removerVideo() {
  var video = document.querySelector(".intro-container");
  video.style.display = "none"; // Oculta o vídeo
  video.pause();
}
async function getMovies() {
  for (let i = 1; i <= 4; i++) {
    let response = await fetch(
      `${BASE_URL}movie/popular?${API_KEY}&${language}&page=${i}`
    );
    let data = await response.json();

    movies.push(...data.results);
  }

  carousel.innerHTML = "";

  movies.forEach((movie) => {
    carousel.innerHTML += `<img onclick="getMovie(${movie.id})" src=${
      IMG_URL + movie.poster_path
    } alt="${movie.title} poster" />`;
  });
}

async function getRandomMovie() {
  const page = Math.floor(Math.random() * 100) + 1;
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();

  const movies = data.results;
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];

  console.log(randomMovie);
}

async function getMovie(id) {
  let movie = movies.find((item) => id == item.id);

  let responseMovie = await fetch(
    `${BASE_URL}movie/${id}?${API_KEY}&${language}`
  );
  movie = await responseMovie.json();

  let responseTrailer = await fetch(
    `${BASE_URL}movie/${id}/videos?${API_KEY}&${language}`
  );
  let trailer = await responseTrailer.json();

  movieContainer.innerHTML = `
    <div>
        <h2>${movie.title}</h2>
        <span class=${
          movie.vote_average >= 7
            ? "good"
            : movie.vote_average >= 4
            ? "average"
            : "bad"
        }>
        ${(movie.vote_average * 10).toFixed(0)}% gostaram 
        </span>
        <span>Gêneros: ${movie.genres.map((genre) => genre.name)}</span>
        <p>${movie.overview}</p>
    </div>
    ${
      trailer.results.length > 0
        ? `<iframe width="560" height="315" autoplay src="https://www.youtube.com/embed/${trailer.results[0].key}?autoplay=1&controls=0&modestbranding=1&origin=1" title="YouTube video player" frameborder="0"></iframe>`
        : `<img src=${IMG_URL + movie.backdrop_path} alt="${
            movie.title
          } poster" />`
    }
    `;
}
getRandomMovie();
getMovies();

function goLeft() {
  carousel.scrollLeft -= carousel.offsetWidth;
}

function goRight() {
  carousel.scrollLeft += carousel.offsetWidth;
}
