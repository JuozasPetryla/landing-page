"use strict";

const arrowLeft = document.querySelector(".left-arrow");
const arrowRight = document.querySelector(".right-arrow");
const testimonial = document.querySelectorAll(".testimonial-container");
const dots = document.querySelectorAll(".dot");

let curSlide = 0;
const maxSlide = testimonial.length;

const goToSlide = function (slide) {
  testimonial.forEach(
    (testimonial, i) =>
      (testimonial.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const activateDot = function (slide) {
  curSlide = slide;
  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
    document.querySelector(`.dot-${slide + 1}`).classList.add("active-dot");
  });
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = -1;
  }
  curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  }
  curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  activateDot(0);
};

init();

arrowLeft.addEventListener("click", prevSlide);
arrowRight.addEventListener("click", nextSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

document.querySelector(".dots").addEventListener("click", function (e) {
  if (e.target.classList.contains("dots")) return;
  curSlide = e.target.classList.value.slice(-1) - 1;
  activateDot(curSlide);
  goToSlide(curSlide);
});
