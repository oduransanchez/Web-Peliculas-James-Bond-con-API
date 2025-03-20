const contenedor = document.getElementById("contenedor");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

let currentPage = 1;
const itemsPerPage = 4;
let movies = [];

async function fetchMovies() {
  try {
    const response = await fetch("https://api.themoviedb.org/3/collection/645?api_key=192e0b9821564f26f52949758ea3c473");
    const data = await response.json();
    movies = data.parts;
    renderMovies();
  } catch (error) {
    console.error("Error al obtener las películas:", error);
  }
}

function renderMovies() {
  contenedor.innerHTML = "";

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const moviesToShow = movies.slice(start, end);

  moviesToShow.forEach(movie => createMovieCard(movie));

  updatePaginationButtons(totalPages);
}

function createMovieCard(movie) {
  const div = document.createElement("div");
  div.classList.add("pelicula");

  const img = document.createElement("img");
  img.classList.add("poster");
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;

  const title = document.createElement("h3");
  title.classList.add("titulo");
  title.textContent = movie.title;

  div.appendChild(img);
  div.appendChild(title);
  contenedor.appendChild(div);
}

function updatePaginationButtons(totalPages) {
  btnAnterior.disabled = currentPage === 1;
  btnSiguiente.disabled = currentPage === totalPages;
}

btnSiguiente.addEventListener("click", () => {
  currentPage++;
  renderMovies();
});

btnAnterior.addEventListener("click", () => {
  currentPage--;
  renderMovies();
});

fetchMovies();