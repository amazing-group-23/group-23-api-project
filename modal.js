const searchButton = document.querySelector(".nav-right .fa-magnifying-glass");
searchButton.addEventListener("click", () => {
  const searchModal = document.querySelector(".search-modal");
  const overlay = document.querySelector("#overlay");
  searchModal.style.display = "block";
  overlay.style.display = "block";
  searchModal.innerHTML = `
    <div class="close-modal">X</div>
    <iframe src="/search/index.html"></iframe>
  `;
  const colseModal = searchModal.querySelector(".close-modal");
  colseModal.addEventListener("click", () => {
    searchModal.style.display = "none";
    overlay.style.display = "none";
  });
});
