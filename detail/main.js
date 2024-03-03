const TMDB_API_KEY = "b472f129bf47a15cddfd73872a69e3b0";
const SPOTIFY_API_KEY = "1ed631061amshf6c8f7865a35e3fp15e154jsn537f165b84dd";
const movieId = new URLSearchParams(window.location.search).get("movieId");

const renderMovieDetail = async () => {
  // get movie detail data in Korean
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=videos&api_key=${TMDB_API_KEY}&language=ko-KR`
  );
  const data = await response.json();
  let trailer = null;
  if (data.videos) {
    trailer = data.videos.results.find((video) => video.type === "Trailer");
    if (!trailer) {
      trailer = data.videos.results.find((video) => video.type === "Teaser");
    }
  }
  const movieDetailHTML = `
  <div class="movie-detail-info">
    <img class="movie-detail-poster" src="${
      data.poster_path
        ? "https://image.tmdb.org/t/p/w500" + data.poster_path
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
    }" />
    <div class="movie-detail-text">
      <h1>${data.title}</h1>
      <span>장르 : ${data.genres[0].name}</span>
      <span>평점 : ${
        data.vote_average
      }<img src="../assets/img/star.png"/></span>
      <span>개봉일 : ${data.release_date}</span>
      <div class="movie-detail-text-line"></div>
      <p>${data.overview}</p>
    </div>
  </div>
  <div class="trailer-container">
    <h1>Trailer</h1>
        <iframe 
        class="youtube-trailer"
        src="https://www.youtube.com/embed/${
          trailer ? trailer.key : "ZWcRmoLqhkc"
        }?si=rcmKr8H3D-PN33AE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>
  </div>
  `;
  const recordImage = document.querySelector("img.record-image");
  recordImage.style.backgroundImage = `url(${
    data.poster_path
      ? "https://image.tmdb.org/t/p/w500" + data.poster_path
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
  })`;

  const movieDetailContainer = document.querySelector(
    ".movie-detail-container"
  );
  movieDetailContainer.innerHTML = movieDetailHTML;

  // get spotify ost playlist by movie title and display the playlist on the screen
  renderOSTFromSpotify();

  //영화 제목으로 페이지 타이틀 변경
  document.title = `${data.title} | MUVIC`;
};

// Get Spotify iframe of OST songs for a given movie
const renderOSTFromSpotify = async () => {
  const responseMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=videos&api_key=${TMDB_API_KEY}&language=en-US`
  );
  const dataMovie = await responseMovie.json();
  const url = `https://spotify23.p.rapidapi.com/search/?q=${dataMovie.title}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": SPOTIFY_API_KEY,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const resultElement = document.querySelector(".movie-ost-container");

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (!result) {
      throw new Error("OST Not Found");
    }
    const playlist = result.albums.items.find((item) =>
      item.data.name.toLowerCase().includes("soundtrack")
    );

    if (!playlist) {
      throw new Error("OST Not Found");
    }
    // extracts spotify playlist id
    const spotifyId = playlist.data.uri.split(":")[2];
    const iframeResult = `
    <h2 class="ost-label">Original Sound Track</h2>
    <div class="movie-ost-playlist">
      <iframe
        style="border-radius: 12px"
        src="https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator"
        width="100%"
        height="500"
        frameborder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>`;

    resultElement.innerHTML = iframeResult;
  } catch (error) {
    console.error(error);
    resultElement.innerHTML = `
    <h2 class="ost-label">Original Sound Track</h2>
    <div class="movie-ost-playlist">
      <img class= "ost-not-found" src="../assets/img/404ost.png" />
    </div>
    `;
  }
};

renderMovieDetail();
