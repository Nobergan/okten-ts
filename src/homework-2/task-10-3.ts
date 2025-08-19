// ***PAGINATION
//
// зробити масив на 100 об’єктів та дві кнопки prev next
//
// при завантаженні сторінки з’являються перші 10 об’єктів.
//
//     При натисканні next виводяться наступні 10 об’єктів
//
// При натисканні prev виводяться попередні 10 об’єктів

import { getElement } from "../utils.js";

const arrayBlock = getElement<HTMLDivElement>("#array");
const prevButton = getElement<HTMLButtonElement>("#prev");
const nextButton = getElement<HTMLButtonElement>("#next");

type Item = {
  name: string;
  price: number;
};

const array: Item[] = [];

for (let i = 0; i < 100; i++) {
  array.push({
    name: `name ${i + 1}`,
    price: i * 100,
  });
}

let currentPage: number = 1;
const itemsPerPage: number = 10;
// For cyclic scrolling
// const totalPages = Math.ceil(array.length / itemsPerPage);

function renderPage(page: number) {
  arrayBlock.innerHTML = "";
  const start: number = (page - 1) * itemsPerPage;
  const end: number = page * itemsPerPage;

  array.slice(start, end).map((item: Item): void => {
    arrayBlock.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${item.price}</p>
              </div>`
    );
  });

  // For NOT cyclic scrolling
  prevButton.disabled = page === 1;

  nextButton.disabled = page === Math.ceil(array.length / itemsPerPage);
}

nextButton.addEventListener("click", () => {
  // For cyclic scrolling
  // currentPage = currentPage >= totalPages ? 1 : currentPage + 1;

  // For NOT cyclic scrolling
  currentPage++;

  renderPage(currentPage);
});

prevButton.addEventListener("click", () => {
  // For cyclic scrolling
  // currentPage = currentPage <= 1 ? totalPages : currentPage - 1;

  // For NOT cyclic scrolling
  currentPage--;

  renderPage(currentPage);
});

renderPage(currentPage);
