const TMDB_API_KEY = "b472f129bf47a15cddfd73872a69e3b0";
const SPOTIFY_API_KEY = "54410b2597msh4c14c6ce560ed8cp1da39fjsn606b73555cd2";

const searchButton = document.querySelector("button");
const searchInput = document.querySelector("#search");

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
    const responseSpotify = await fetch(url, options);
    const resultSpotify = await responseSpotify.json();
    console.log(resultSpotify.albums.items[0].data.uri.split(":")[2]);
    const spotifyId = resultSpotify.albums.items[0].data.uri.split(":")[2];
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
searchButton.addEventListener("click", async () => {
  const query = searchInput.value;
  const resultElement = document.querySelector(".ost-playlist");
  resultElement.innerHTML = await getOSTFromSpotify(query);
});
