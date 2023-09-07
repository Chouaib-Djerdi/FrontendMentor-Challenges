"use-strict";

const switchBtn = document.querySelector("input[type=checkbox]");
const elements = document.querySelectorAll(".element");
const elementsOver = document.querySelectorAll(".element-over");
const headings = document.querySelectorAll("h1");

console.log(switchBtn);

switchBtn.addEventListener("change", (e) => {
  e.preventDefault();
  if (switchBtn.checked) {
    document.body.style.background =
      "linear-gradient(to bottom,hsl(225, 100%, 98%) 25%,hsl(0, 0%, 100%) 25%,hsl(0, 0%, 100%) 100%)";
    elements.forEach(
      (el) => (el.style.backgroundColor = "var(--Light-Grayish-Blue")
    );
    elementsOver.forEach(
      (el) => (el.style.backgroundColor = "var(--Light-Grayish-Blue")
    );
    headings.forEach((head) => (head.style.color = "var(--Very-Dark-Blue)"));
  } else {
    document.body.style.background =
      "linear-gradient(to bottom,hsl(232, 19%, 15%) 25%,hsl(230, 17%, 14%) 25%,hsl(230, 17%, 14%) 100%)";
    elements.forEach(
      (el) => (el.style.backgroundColor = "var(--Dark-Desaturated-Blue")
    );
    elementsOver.forEach(
      (el) => (el.style.backgroundColor = "var(--Dark-Desaturated-Blue")
    );
    headings.forEach((head) => (head.style.color = "var(--White)"));
  }
});
