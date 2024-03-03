const checkbox = document.querySelector(".checkbox");
const isDarkModeOn = localStorage.getItem("darkMode") === "true";
document.body.classList.remove("dark");

if (checkbox) {
  if (isDarkModeOn) {
    checkbox.checked = true;
    document.body.classList.add("dark");
  } else {
    checkbox.checked = false;
  }

  // checkbox를 click 했을 때 해당 함수를 실행
  checkbox.addEventListener("click", clickDarkMode);

  function clickDarkMode(event) {
    document.body.classList.remove("dark");
    if (event.currentTarget.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      localStorage.setItem("darkMode", false);
    }
  }
} else {
  if (isDarkModeOn) {
    document.body.classList.add("dark");
  }
}
