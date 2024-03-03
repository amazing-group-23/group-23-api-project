const searchButton = document.querySelector(".nav-right .fa-magnifying-glass");
const closeModal = document.querySelector(".nav-right .close-modal");

searchButton.addEventListener("click", () => {
  const searchModal = document.querySelector(".search-modal");
  const overlay = document.querySelector("#overlay");
  searchModal.style.display = "block";
  overlay.style.display = "block";
  searchModal.innerHTML = `
    <iframe id="search-modal-iframe" src="/search/index.html"></iframe>
  `;
  closeModal.style.display = "block";
  searchButton.style.display = "none";
  document.body.style.overflowY = "hidden";
});

closeModal.addEventListener("click", () => {
  const searchModal = document.querySelector(".search-modal");
  const overlay = document.querySelector("#overlay");
  searchModal.style.display = "none";
  overlay.style.display = "none";
  closeModal.style.display = "none";
  searchButton.style.display = "block";
  document.body.style.overflowY = "visible";
});
