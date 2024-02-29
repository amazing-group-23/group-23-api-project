// const checkbox = document.getElementById('checkbox');
const checkbox = document.querySelector(".checkbox");
console.log(checkbox);

// checkbox를 click 했을 때 해당 함수를 실행
checkbox.addEventListener("click", clickDarkMode);

// 웹사이트의 배경 바꾸기
// classList는 js가 css를 제어할 수 있게 함
//class가 존재하면 클래스 제거, 클래스가 존재하지 않으면 클래스 추가하는 메서드
function clickDarkMode() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    console.log("convert into Light Mode");
  } else {
    document.body.classList.add("dark");
    console.log("convert into Dark Mode");
  }
}
