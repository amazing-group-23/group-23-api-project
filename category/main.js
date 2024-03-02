const API_KEY = "30cd8cae353bf46280229ed39cd6c327";
let url = "";
let movieList = [];
// 무한 스크롤
let page = 1; // 초기 페이지 번호

//영화가져오기
const getMovies = async () => {
    url = new URL(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("데이터는", data);
    movieList = data.results;
    getMoviesRender();
  };
  //전체영화가져오기
  const getAllMovies = async () => {
    url = new URL(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("전체 영화 데이터는", data);
    movieList = data.results;
    getMoviesRender();
};

  const getMoviesRender = () => {
    const moviesHtml = movieList
      .map(
        (item) =>
          `<li>
            <a href="../detail/index.html?movieId=${item.id}">
                <img src="${
                  item.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />
            </a>
        </li>`
      )
      .join("");
  
    document.getElementById("categorized-films-board").innerHTML = moviesHtml;
  };

  const getMoviesByGenre = async (genreId) => {
    url = new URL(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${genreId}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log(`${genreId} 장르의 영화 데이터는`, data);
    movieList = data.results;
    getMoviesRender();
};

window.addEventListener('scroll', () => {
    // 문서의 맨 아래에 도달하면 새로운 영화 가져오기
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // 현재 페이지 번호 증가
        page++;
        // 새로운 영화 가져오기
        getMoreMovies(page);
    }
});

// 추가 영화 가져오기 함수
const getMoreMovies = async (page) => {
    // API 요청을 보낼 URL에 페이지 번호 추가
    url.searchParams.set('page', page);
    // API 요청 보내기
    const response = await fetch(url);
    const data = await response.json();
    // 새로운 영화 목록을 기존 목록에 추가
    movieList.push(...data.results);
    // 영화 목록 다시 렌더링
    getMoviesRender();
};

window.onload = getAllMovies;