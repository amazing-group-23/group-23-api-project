const API_KEY = "30cd8cae353bf46280229ed39cd6c327";
let url = "";
let movieList = [];

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