const products = document.querySelectorAll(".product");

products.forEach((product) => {
  if (product.dataset.specs) {
    const specsData = product.dataset.specs;
    const specsList = specsData
      .split(";")
      .map((spec) => `<li>${spec.trim()}</li>`)
      .join("");

    const specs = document.createElement("div");
    specs.classList.add("specs");
    specs.innerHTML = `<ul>${specsList}</ul>`;

    product.appendChild(specs);

    product.addEventListener("mouseenter", () => {
      specs.style.opacity = "1";
      specs.style.visibility = "visible";
    });

    product.addEventListener("mouseleave", () => {
      specs.style.opacity = "0";
      specs.style.visibility = "hidden";
    });
  }
});
