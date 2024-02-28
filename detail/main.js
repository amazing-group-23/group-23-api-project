const TMDB_API_KEY = "b472f129bf47a15cddfd73872a69e3b0";
const SPOTIFY_API_KEY = "54410b2597msh4c14c6ce560ed8cp1da39fjsn606b73555cd2";
const movieId = new URLSearchParams(window.location.search).get("movieId");
const YOUTUBE_API_KEY="AIzaSyAqQbSYuH48TygsXo1tuAYk5k5Nh8ha9rM";

const renderMovieDetail = async (videoId) => {
  // get movie detail data
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=videos&api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  const movieDetailHTML = `
    <img src="${
      data.poster_path
        ? "https://image.tmdb.org/t/p/w500" + data.poster_path
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
    }" />
    <div class="movie-detail-text">
      <iframe id="ytplayer" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0"></iframe>
      <h1>${data.title}</h1>
      <span>장르:${data.genres[0].name}</span>
      <span>평점:${data.vote_average}</span>
      <span>개봉일:${data.release_date}</span>
      <p>${data.overview}</p>
    </div>
  `;
  const movieDetailContainer = document.querySelector(
    ".movie-detail-container"
  );
  movieDetailContainer.innerHTML = movieDetailHTML;

  // get spotify ost playlist by movie title and display the playlist on the screen
  const resultElement = document.querySelector(".ost-playlist");
  resultElement.innerHTML = await getOSTFromSpotify(data.title);

  //영화 제목으로 페이지 타이틀 변경
  document.title=`${data.title} | MUVIC`;
  getYoutubeVideoId(data.title); 
};

// Get Spotify iframe of OST songs for a given movie
const getOSTFromSpotify = async (query) => {
  const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": SPOTIFY_API_KEY,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const playlist = result.albums.items.find((item) =>
      item.data.name.toLowerCase().includes("soundtrack")
    );

    // extracts spotify playlist id
    const spotifyId = playlist.data.uri.split(":")[2];
    const iframeResult = `<iframe
    style="border-radius: 12px"
    src="https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator"
    width="100%"
    height="352"
    frameborder="0"
    allowfullscreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    ></iframe>`;

    return iframeResult;
  } catch (error) {
    console.error(error);
    return "<span>No OST found</span>";
  }
};

const getYoutubeVideoId=async(movietitle)=>{
//get youtubevideo data
url = new URL(
    `https://www.googleapis.com/youtube/v3/search?type=video&videoEmbeddable=true&videoDuration=short&videoSyndicated=true&q=${movietitle}&key=${YOUTUBE_API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("item은: ", data);
  console.log("video id:",data.items[0].id.videoId);
  const videoId=data.items[0].id.videoId;   
  renderMovieDetail(videoId);
};

renderMovieDetail();
