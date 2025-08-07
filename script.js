const addButtons = document.querySelectorAll(".add-btn");
const bundleItems = document.getElementById("bundle-items");
const progressFill = document.getElementById("progress-fill");
const discountEl = document.getElementById("discount");
const subtotalEl = document.getElementById("subtotal");
const ctaBtn = document.getElementById("cta-btn");

let selected = [];

const products = [
  { id: 1, title: "Tie-Dye Lounge Set", img: "product-1.jpg" },
  { id: 2, title: "Sunburst Tracksuit", img: "product-2.jpg" },
  { id: 3, title: "Retro Red Streetwear", img: "product-3.jpg" },
  { id: 4, title: "Urban Sportwear Combo", img: "product-4.jpg" },
  { id: 5, title: "Oversized Knit & Coat", img: "product-5.jpg" },
  { id: 6, title: "Chic Monochrome Blazer", img: "product-6.jpg" },
];

addButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const product = products[index];
    const exists = selected.find((item) => item.id === product.id);

    if (exists) {
      selected = selected.filter((item) => item.id !== product.id);
      btn.classList.remove("added");
      btn.textContent = "Add to Bundle +";
    } else {
      selected.push(product);
      btn.classList.add("added");
      btn.textContent = "Remove from Bundle –";
    }

    updateSidebar();
  });
});

function updateSidebar() {
  bundleItems.innerHTML = "";
  let total = 0;

  selected.forEach((item) => {
    total += 150;
    bundleItems.innerHTML += `
      <li>
        <img src="${item.img}" alt="" />
        <span>${item.title}</span>
        <span>$150.00</span>
      </li>
    `;
  });

  // Progress bar (3 items = 100%)
  const progressPercent = Math.min((selected.length / 3) * 100, 100);
  progressFill.style.width = progressPercent + "%";

  // Discount logic
  let discount = 0;
  if (selected.length >= 3) {
    discount = total * 0.3; // 30%
  }

  const subtotal = total - discount;

  discountEl.textContent = `-$${discount.toFixed(2)}`;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  ctaBtn.disabled = selected.length < 3;

}
