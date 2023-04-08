"use strict";

// Selectors

const navLink = document.querySelectorAll(".nav-link");
const ctaButton = document.querySelector(".cta-button");
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
const modalArrowRight = document.querySelector(".modal-right-arrow");
const modalArrowLeft = document.querySelector(".modal-left-arrow");
const FAQContainer = document.querySelectorAll(".faq");
const FAQContent = document.querySelectorAll(".faq-content");
const chevronIcon = document.querySelectorAll(".chevron-icon");
const form = document.querySelector(".form");
const sectionForm = document.querySelector(".section-form");

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

let currentImage = 1;
const maxImage = imageContainer.length;
const closeModal = function () {
  modalImages.innerHTML = "";
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const goToImage = function (img) {
  currentImage = img;
  modalImages.innerHTML = "";
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  let markup = `
  <div class="image-container"><img class="image-gallery disable-hover" src="images/gallery-${img}.jpg" ></div>
    
  `;
  modalImages.insertAdjacentHTML("beforeend", markup);
};

const nextImage = function () {
  if (currentImage === maxImage) {
    currentImage = 0;
  }
  currentImage++;
  goToImage(currentImage);
};

const prevImage = function () {
  if (currentImage === 1) {
    currentImage = maxImage + 1;
  }
  currentImage--;
  goToImage(currentImage);
};

// Listeners
// Rendering image modal
imageContainer.forEach((image) => {
  image.addEventListener("click", function (e) {
    let img = e.target.classList.value.slice(-1);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    let markup = `
    <div class="image-container"><img class="image-gallery disable-hover" src="images/gallery-${img}.jpg" ></div>
    
    `;
    modalImages.insertAdjacentHTML("beforeend", markup);
    currentImage = +img;
  });
});

// Closing image modal
closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if ((e.keydown = "Escape")) {
    closeModal();
  }
});

// To next image

modalArrowRight.addEventListener("click", nextImage);
modalArrowLeft.addEventListener("click", prevImage);

// FAQ section

// Functions

const openCloseFAQ = function (faq, chevron) {
  faq.classList.toggle("hidden-accordion");
  chevron.classList.toggle("rotate");
};

// Evenet listeners

FAQContainer.forEach((faq) =>
  faq.addEventListener("click", () => {
    openCloseFAQ(faq.lastElementChild, faq.firstElementChild);
  })
);

// SCROLL INTO VIEW

// Functions

const scrollInto = function (section) {
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

navLink.forEach((nav) =>
  nav.addEventListener("click", function (e) {
    const sectionName = e.target.textContent.toLowerCase();
    const section = document.querySelector(`.section-${sectionName}`);
    scrollInto(section);
  })
);

ctaButton.addEventListener("click", () => {
  scrollInto(sectionForm);
});

// STICKY NAV
