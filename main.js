// TMDB API Key
const API_KEY = "45b6699cac67a94b62f8d2f0e07277da";
let url = "";
let movieList = [];
let topRateFilmsList = [];
// 무한스크롤
let currentPage = 1;
let isLoading = false;


// movies 가져오기
const getMovies = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage}`);
  const data = await response.json();
  console.log("데이터는", data);
  movieList = data.results;
  getMoviesRender();
};

// movies 그리기
const getMoviesRender = () => {
  const moviesHtml = movieList
    .map(
      (item) =>
        `<li>
            <a href="./detail/index.html?movieId=${item.id}">
                <img src="${
                  item.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />
            </a>
        </li>`
    )
    .join("");

  document.getElementById("main-movie-board").innerHTML = moviesHtml;
};


const getTopRateMovies = async () => {
  url = new URL(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`);
  const response = await fetch(url)
  const data = await response.json();
  console.log("데이터는", data);
  topRateFilmsList = data.results.slice(0, 4);
  topRateFilmsRender();
}


const topRateFilmsRender = () => {
  const TopMoviesHtml = topRateFilmsList
  .map(
    (item) =>
      `<li>
          <a href="./detail/index.html?movieId=${item.id}">
              <img src="${
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
              }" />
          </a>
      </li>`
  )
  .join("");
  document.getElementById("top-rate-movies").innerHTML = TopMoviesHtml;
}

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
    fetchMoreMovies();
  }
});

// 추가적인 영화 가져오기
const fetchMoreMovies = async () => {
  isLoading = true;
  currentPage++;
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage}`);
  const data = await response.json();
  console.log("추가 데이터는", data);
  movieList = [...movieList, ...data.results];
  getMoviesRender();
  isLoading = false;
};

// 영화 및 최고 평점 영화 가져오기
const fetchMovies = async () => {
  await getMovies();
  await getTopRateMovies();
}

// 영화 및 최고 평점 영화 가져오기
fetchMovies();