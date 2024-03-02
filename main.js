// TMDB API Key
const API_KEY = "45b6699cac67a94b62f8d2f0e07277da";
let url = "";
let movieList = [];
let topRateFilmsList = [];
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

const getTopRateMovies = async () => {
  url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("데이터는", data);
  topRateFilmsList = data.results.slice(0, 10);
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
// function clickDarkMode() {
//   if (document.body.classList.contains("dark")) {
//     //documentElement.head.classList.remove("dark");
//     document.head.classList.remove("dark");
//     //HTMLBodyElement.head.classList.remove("dark");
//     //document.head.classList.remove("dark");
//     document.body.classList.remove("dark");
//     //document.documentElement.classList.remove("dark");
//     //document.head.classList.remove("dark");
//     console.log("convert into Light Mode");
//   } else {
//     //HTMLBodyElement.head.classList.add("dark");
//     //documentElement.head.classList.add("dark");
//     document.head.classList.add("dark");
//     document.body.classList.add("dark");
//     //document.documentElement.classList.add("dark");
//     //document.head.classList.add("dark");
//     console.log("convert into Dark Mode");
//   }
// }

function clickDarkMode() {
  // Toggle dark mode for the body
  document.body.classList.toggle("dark");

  // Toggle dark mode for specific elements in the header
  const headerElements = document.querySelectorAll(".home-header");

  headerElements.forEach((element) => {
    element.classList.toggle("dark");
  });

  console.log("Dark mode toggled");
}

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
const hamburgerBtn = document.querySelector('.hamburger-btn');
const hamburgerBtnSticks = hamburgerBtn.querySelectorAll('span'); // 수정된 부분

hamburgerBtn.addEventListener('click',() => {
  hamburgerBtnSticks.forEach(stick => {
    stick.classList.toggle('change');
  });
});

//top10 slide
document.addEventListener('DOMContentLoaded', function () {
  const slide = document.querySelector('#top-rate-movies');
  const nextBtn = document.querySelector('.tr-next-button');
  const prevBtn = document.querySelector('.tr-pre-button');

  nextBtn.addEventListener('click', function () {
    const itemWidth = slide.querySelector('li').offsetWidth + 20; // Adjusted for margin
    const scrollAmount = slide.scrollLeft + itemWidth * 5;
    slide.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  prevBtn.addEventListener('click', function () {
    const itemWidth = slide.querySelector('li').offsetWidth + 20; // Adjusted for margin
    const scrollAmount = slide.scrollLeft - itemWidth * 5;
    slide.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
});