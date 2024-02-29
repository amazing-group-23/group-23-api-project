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
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage}`
  );
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
  url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("데이터는", data);
  topRateFilmsList = data.results.slice(0, 4);
  topRateFilmsRender();
};

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
};

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
    fetchMoreMovies();
  }
});

// 추가적인 영화 가져오기
const fetchMoreMovies = async () => {
  isLoading = true;
  currentPage++;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage}`
  );
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
};

// const checkbox = document.getElementById('checkbox');
const checkbox = document.querySelector(".checkbox");
console.log(checkbox);

// checkbox를 click 했을 때 해당 함수를 실행
checkbox.addEventListener("click", clickDarkMode);

// 웹사이트의 배경 바꾸기
// classList는 js가 css를 제어할 수 있게 함
//class가 존재하면 클래스 제거, 클래스가 존재하지 않으면 클래스 추가하는 메서드
function clickDarkMode() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    console.log("convert into Light Mode");
  } else {
    document.body.classList.add("dark");
    console.log("convert into Dark Mode");
  }
}

// 영화 및 최고 평점 영화 가져오기
fetchMovies();
