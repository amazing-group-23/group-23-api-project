const API_KEY = "45b6699cac67a94b62f8d2f0e07277da";
let url = '';
let movieList = [];

// movies 가져오기
const getMovies = async () => {
    url = new URL(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`);
    const response = await fetch(url)
    const data = await response.json();
    console.log("데이터는", data);
    movieList = data.results.slice(0, 10);
    
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
            }" />
        </li>`
    ).join('');

    document.getElementById('movie-board').innerHTML = moviesHtml;
}
getMovies();