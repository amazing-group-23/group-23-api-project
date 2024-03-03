//**필요한 추가 작업
//1. 무한스크롤 --> 실패 (키워드 검색 최대개수가 20개로 한정되는 문제가 있습니다.)
//헤더푸터 합치기

//검색창에 글자수가 1이하일 때 전송 막기
const API_KEY = "30cd8cae353bf46280229ed39cd6c327";
let url = "";
let movieList = [];
let popularMovieList = [];
let runningMovieList = [];

// movies 가져오기
const getMovies = async () => {
  url = new URL(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("데이터는", data);
  movieList = data.results;
  getMoviesRender();
};

//인기 영화 가져오기
const getPopularMovies = async () => {
  isLoading = true;
  popularMovieList = [];

  for (let page = 1; page <= 3; page++) {
    const url = new URL(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("데이터는", data);
    popularMovieList.push(...data.results);
  }

  getPopularMoviesRender();
};

//상영중인 영화 가져오기
const getRunningMovies = async () => {
  isLoading = true;
  runningMovieList = [];

  for (let page = 2; page <= 4; page++) {
    const url = new URL(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("데이터는", data);
    runningMovieList.push(...data.results);
  }

  getRunningMoviesRender();
};
// movies 그리기
const getMoviesRender = () => {
  const moviesHtml = movieList
    .map(
      (item) =>
        `<li>
          <a href="../detail/index.html?movieId=${item.id}" target="_parent">
              <img src="${
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
              }" />
          </a>
      </li>`
    )
    .join("");

  document.getElementById("movie-board").innerHTML = moviesHtml;
};
//검색창 인기영화 그리기
const getPopularMoviesRender = () => {
  const moviesHtml = popularMovieList
    .map(
      (item) =>
        `<li>
          <a href="../detail/index.html?movieId=${item.id}" target="_parent">
              <img src="${
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
              }" />
          </a>
      </li>`
    )
    .join("");

  document.getElementById("sp-popular-movies-board").innerHTML = moviesHtml;
};
//검색창 상영중인 영화 그리기
const getRunningMoviesRender = () => {
  const moviesHtml = runningMovieList
    .map(
      (item) =>
        `<li>
          <a href="../detail/index.html?movieId=${item.id}" target="_parent">
              <img src="${
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
              }" />
          </a>
      </li>`
    )
    .join("");

  document.getElementById("sp-running-movies-board").innerHTML = moviesHtml;
};

//키워드
const getMovieByKeyword = async () => {
  let keyword = document.querySelector(".search-page-input-box input").value;

  // 검색어가 유효하지 않은 경우 경고창 띄우고 함수 종료
  if (keyword.length <= 1) {
    document.querySelector("#search-page .search-page-input-box p").innerText =
      "검색어는 두 글자 이상이어야 합니다.";
    return;
  }

  url = new URL(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("검색 결과:", data);

  // 검색 결과가 없는 경우 경고창 띄우고 함수 종료
  if (data.results.length === 0) {
    document.querySelector("#search-page .search-page-input-box p").innerText =
      "검색결과가 없습니다";
    return;
  }

  document.querySelector(".sp-popular-movies").classList.add("sp-hidden");
  document.querySelector(".sp-running-movies").classList.add("sp-hidden");
  movieList = data.results;
  getMoviesRender();
};

// 검색 버튼 클릭 시
document
  .querySelector(".search-page-input-box .sp-search-button")
  .addEventListener("click", getMovieByKeyword);

// Enter 키 입력 시
document
  .querySelector(".search-page-input-box input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      getMovieByKeyword();
    }
  });

//close 버튼 이벤트
document
  .querySelector("#search-page .search-page-input-box .sp-close-button")
  .addEventListener("click", function () {
    document.querySelector(".search-page-input-box input").value = "";
    document.querySelector(
      "#search-page .search-page-input-box .sp-close-button"
    ).style.opacity = "0";
  });

//input 함수의 값이 지워졌을때의 함수
document
  .querySelector(".search-page-input-box input")
  .addEventListener("input", function () {
    // 입력란의 값 가져오기
    let keyword = this.value;

    // 입력값이 비어 있는 경우
    if (keyword.length === 0) {
      document.querySelector(
        "#search-page .search-page-input-box p"
      ).innerText = "";
      document.querySelector(
        "#search-page .search-page-input-box .sp-close-button"
      ).style.opacity = "0";
      // 추가로 원하는 동작을 수행할 수 있습니다.
    } else if (keyword.length !== 0) {
      document.querySelector(
        "#search-page .search-page-input-box .sp-close-button"
      ).style.opacity = "100";
    }
  });

getPopularMovies();
getRunningMovies();
