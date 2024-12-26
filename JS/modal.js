

let currentSlide = 0;

function moveSlide(direction) {
    const sliderWrapper = document.querySelector(".products-slider .slider-wrapper");
    const slides = document.querySelectorAll(".products-slider .product-card");
    const totalSlides = slides.length;

    // Update the current slide index
    currentSlide += direction;

    // Loop back to the first/last slide if at the end/start
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;

    // Move the slider
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
}
let currentrewviewMobileSlide = 0;

function moveRMSlide(direction) {
    const sliderWrapper = document.querySelector(".review-mobile-slider .slider-wrapper");
    const slides = document.querySelectorAll(".review-mobile-slider .review-mobile-card");
    const totalSlides = slides.length;

    // Update the current slide index
    currentrewviewMobileSlide += direction;

    // Loop back to the first/last slide if at the end/start
    if (currentrewviewMobileSlide >= totalSlides) currentrewviewMobileSlide = 0;
    if (currentrewviewMobileSlide < 0) currentrewviewMobileSlide = totalSlides - 1;

    // Move the slider
    sliderWrapper.style.transform = `translateX(-${currentrewviewMobileSlide * 100}%)`;
    
}

let currentGameSlide = 0;

function moveGameSlide(direction) {
    const gameSliderWrapper = document.querySelector(".games-slider .slider-wrapper");
    const gameSlides = document.querySelectorAll(".games-slider .game-card");
    const totalGameSlides = gameSlides.length;

    // Atualiza o índice do slide atual
    currentGameSlide += direction;

    // Faz o loop voltar para o primeiro/último slide
    if (currentGameSlide >= totalGameSlides) currentGameSlide = 0;
    if (currentGameSlide < 0) currentGameSlide = totalGameSlides - 1;

    // Move o slider
    const slideWidth = gameSlides[0].offsetWidth; // Calcula largura real de um slide
    gameSliderWrapper.style.transform = `translateX(-${currentGameSlide * slideWidth}px)`;
}

document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggles = document.querySelectorAll("[data-dropdown]");

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", event => {
            event.preventDefault();
            const dropdown = toggle.closest(".dropdown");
            dropdown.classList.toggle("active");

            // Fechar outros dropdowns
            document.querySelectorAll(".dropdown").forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove("active");
                }
            });
        });
    });

    // Fechar o dropdown ao clicar fora
    document.addEventListener("click", event => {
        if (!event.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown").forEach(dropdown => {
                dropdown.classList.remove("active");
            });
        }
    });
});

function setReviewStars(element, rating) {
    // Assegura que o valor está entre 0 e 5
    rating = Math.min(Math.max(rating, 0), 5);
    
    // Altera o atributo data-rating
    element.setAttribute("data-rating", rating);
}

let currentReviewSlide = 0;

function moveReviewSlide(direction) {
    const sliderWrapper = document.querySelector(".review-slider .review-cards");
    const blocks = document.querySelectorAll(".review-slider .block-cards");
    const totalBlocks = blocks.length;

    // Atualiza o índice do bloco
    currentReviewSlide += direction;

    // Garante que o índice do bloco seja válido (faz loop)
    if (currentReviewSlide >= totalBlocks) currentReviewSlide = 0;
    if (currentReviewSlide < 0) currentReviewSlide = totalBlocks - 1;

    // Move o slider para o bloco correto
    const slideWidth = blocks[0].offsetWidth +5; // Calcula largura real de um slide
    sliderWrapper.style.transform = `translateX(-${currentReviewSlide  * slideWidth}px)`;
}


function setMembersStars(element, rating_m) {
    // Assegura que o valor está entre 0 e 5
    rating_m = Math.min(Math.max(rating, 0), 10);
    
    // Altera o atributo data-rating
    element.setAttribute("data-rating-member", rating_m);
}

const slides = document.querySelector('.slides');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const youtubeVideos = document.querySelectorAll('.youtube-video');
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;
let players = [];
let isVideoPlaying = false;

// Função para criar os dots
function createDots() {
    for (let i = 0; i < slides.children.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            if (!isVideoPlaying) updateSlide(Number(dot.dataset.index));
        });
        dotsContainer.appendChild(dot);
    }
}

// Atualiza o estado dos dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Atualiza o slide atual
function updateSlide(index) {
    currentIndex = (index + slides.children.length) % slides.children.length;
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
    updateDots();
}


// Botão Anterior
prevButton.addEventListener('click', () => {
    if (!isVideoPlaying) {
        updateSlide(currentIndex - 1);
    }
});

// Botão Próximo
nextButton.addEventListener('click', () => {
    if (!isVideoPlaying) {
        updateSlide(currentIndex + 1);
    }
});


// Inicializa os dots
createDots();

function mobileMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


