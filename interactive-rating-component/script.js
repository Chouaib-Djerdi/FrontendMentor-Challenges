"use-strict";

const rating_wrapper = document.querySelector(".rating-wrapper");
const thank_wrapper = document.querySelector(".thank-wrapper");
const star_btns = document.querySelectorAll(".star-btn");
const submit_btn = document.querySelector(".submit-btn");
const rate_placeHolder = document.querySelector(".rating-result");

console.log(Array.from(star_btns));

let rated = "none";
Array.from(star_btns).forEach((btn) =>
  btn.addEventListener("click", () => {
    rated = btn.textContent;
  })
);

submit_btn.addEventListener("click", () => {
  rating_wrapper.style.display = "none";
  thank_wrapper.style.display = "flex";
  rate_placeHolder.insertAdjacentText(
    "afterbegin",
    `You selected ${rated} out of 5`
  );
});
