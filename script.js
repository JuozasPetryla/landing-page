"use strict";

// Selectors

const arrowLeft = document.querySelector(".left-arrow");
const arrowRight = document.querySelector(".right-arrow");
const testimonial = document.querySelectorAll(".testimonial-container");
const dots = document.querySelectorAll(".dot");
const imageContainer = document.querySelectorAll(".image-container");
const imageGallery = document.querySelectorAll(".image-gallery");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalImages = document.querySelector(".images");
const closeButton = document.querySelector(".close-modal");

// Global variables

let curSlide = 0;
const maxSlide = testimonial.length;

// TESTIMONIAL CAROUSEL
// Functions
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

// Initializing carousel

init();

// Event listeners

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

// GALLERY OVERLAY

// Functions

const closeModal = function () {
  modalImages.innerHTML = "";
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Listeners
imageContainer.forEach((image) => {
  image.addEventListener("click", function (e) {
    let img = e.target.classList.value.slice(-1);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    let markup = `
    <div class="image-container"><img class="image-gallery disable-hover" src="images/gallery-${img}.jpg" ></div>
    
    `;
    modalImages.insertAdjacentHTML("beforeend", markup);
  });
});

closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if ((e.keydown = "Escape")) {
    closeModal();
  }
});
