"use-strict";

const quote_container = document.querySelector(".quote");
const generator_btn = document.querySelector(".generator-btn");
const advice_counter = document.querySelector(".advice-counter");

let count = 1;

const renderAdvice = function (advice) {
  quote_container.textContent = advice;
  advice_counter.textContent = `Advice #${count}`;
  count++;
};

const getAdvice = function () {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.slip);
      renderAdvice(data.slip.advice);
    });
};

getAdvice();

generator_btn.addEventListener("click", getAdvice);
