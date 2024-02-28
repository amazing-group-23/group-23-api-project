//검색창에 글자수가 1이하일 때 전송 막기


const API_KEY = "30cd8cae353bf46280229ed39cd6c327";
let url = '';
let movieList = [];

// movies 가져오기
const getMovies = async () => {
    url = new URL(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`);
    const response = await fetch(url)
    const data = await response.json();
    console.log("데이터는", data);
    movieList = data.results.slice(0, 12);
    getMoviesRender();
}

// movies 그리기
const getMoviesRender = () => {
    const moviesHtml = movieList.map(
        (item) => 
        `
        <li>
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path} || 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            " />
        </li>`
    ).join('');

    document.getElementById('movie-board').innerHTML = moviesHtml;
};

const getMovieByKeyword = async () => {
    let keyword = document.querySelector('.search-page-input-box input').value;
    url = new URL(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("검색 결과:", data);
    movieList = data.results.slice(0, 10);
    getMoviesRender();
}

// 검색 버튼 클릭 시
document.querySelector('.search-page-input-box button').addEventListener('click', getMovieByKeyword);

// Enter 키 입력 시
document.querySelector('.search-page-input-box input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getMovieByKeyword();
    }
});

getMovies(); // 초기 인기 영화 목록 로드