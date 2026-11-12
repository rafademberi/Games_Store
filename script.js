
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const products = Array.from(carousel.querySelectorAll(":scope > article"));
    const previousButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const pageSize = 3;
    const pageCount = Math.ceil(products.length / pageSize);
    let currentPage = 0;

    function showPage(page, direction) {
        currentPage = page;
        products.forEach((product, index) => {
            const isVisible = Math.floor(index / pageSize) === currentPage;
            product.hidden = !isVisible;
            product.classList.remove("carousel-enter-forward", "carousel-enter-backward");
            if (isVisible) {
                product.classList.add(direction === "next" ? "carousel-enter-forward" : "carousel-enter-backward");
            }
        });

        previousButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pageCount - 1;
    }

    previousButton.addEventListener("click", () => {
        if (currentPage > 0) showPage(currentPage - 1, "previous");
    });

    nextButton.addEventListener("click", () => {
        if (currentPage < pageCount - 1) showPage(currentPage + 1, "next");
    });

    products.forEach((product) => {
        product.addEventListener("animationend", () => {
            product.classList.remove("carousel-enter-forward", "carousel-enter-backward");
        });
    });

    showPage(0, "next");
});