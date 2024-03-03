// TMDB API Key
const API_KEY = "45b6699cac67a94b62f8d2f0e07277da";
let url = "";
let movieList = [];
let topRateFilmsList = [];
let trendFilmsList = [];
// 무한스크롤
let currentPage = 1;
let isLoading = false;
// Typing effect
const typingWords = ["awesome", "amazing", "fantastic"];
const typingText = document.querySelector(".typing-text");

// movies 가져오기
const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&page=${currentPage}`
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

//최고평점 영화
const getTopRateMovies = async () => {
  url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("데이터는", data);
  topRateFilmsList = data.results.slice(0, 10);
  topRateFilmsList = data.results.slice(0, 10);
  topRateFilmsRender();
};
//최고평점 영화 렌더
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

//트렌드 영화
const getTrendMovies = async () => {
  url = new URL(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("데이터는", data);
  trendFilmsList = data.results.slice(0, 10);
  trendFilmsRender();
};
//트렌드 렌더
const trendFilmsRender = () => {
  const trendMoviesHtml = trendFilmsList
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
  document.getElementById("trend-movies").innerHTML = trendMoviesHtml;
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
  await getTrendMovies();
};

const typeWord = async (word, delay = 100) => {
  const letters = word.split("");
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    typingText.innerHTML += letters[i];
    i++;
  }
  return;
};

const deleteSentence = async (eleRef) => {
  const sentence = typingText.innerHTML;
  const letters = sentence.split("");
  let i = 0;
  while (letters.length > 0) {
    await waitForMs(100);
    letters.pop();
    typingText.innerHTML = letters.join("");
  }
};

const waitForMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const typingEffect = async () => {
  var i = 0;
  while (true) {
    await typeWord(typingWords[i]);
    await waitForMs(1500);
    await deleteSentence();
    await waitForMs(500);
    i++;
    if (i >= typingWords.length) {
      i = 0;
    }
  }
};

// 영화 및 최고 평점 영화 가져오기
fetchMovies();
typingEffect();

// hamburger toggle btn
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hamburgerBtnSticks = hamburgerBtn.querySelectorAll("span"); // 수정된 부분

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtnSticks.forEach((stick) => {
    stick.classList.toggle("change");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slideNextBtn = document.querySelectorAll(".slide-next-button");
  const slidePrevBtn = document.querySelectorAll(".slide-pre-button");

  slideNextBtn.forEach((button) =>
    button.addEventListener("click", (event) => {
      const slides =
        event.currentTarget.parentNode.querySelector("ul.mv-slide");
      const itemWidth = slides.querySelector("li").offsetWidth + 20;
      const scrollAmount = slides.scrollLeft + itemWidth * 5;
      slides.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    })
  );

  slidePrevBtn.forEach((button) =>
    button.addEventListener("click", (event) => {
      const slides =
        event.currentTarget.parentNode.querySelector("ul.mv-slide");
      const itemWidth = slides.querySelector("li").offsetWidth + 20;
      const scrollAmount = slides.scrollLeft - itemWidth * 5;
      slides.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    })
  );
});
