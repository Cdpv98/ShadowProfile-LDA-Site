document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");



    // Move the slider
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    // Altera o header ao rolar a página
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    
});
