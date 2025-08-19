import { getElement } from "../utils.js";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  servings: number;
  caloriesPerServing: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  instructions: string[];
  mealType: string[];
  tags: string[];
}

interface ApiResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

const recipesContainer = getElement<HTMLUListElement>("#recipes");
const prevBtn = getElement<HTMLButtonElement>("#prev");
const nextBtn = getElement<HTMLButtonElement>("#next");
const pageInfo = getElement<HTMLSpanElement>("#page-info");

let recipesData: Recipe[] = [];
let limit: number = 6;
let currentPage: number = 1;
let total: number;

function createList(title: string, items: string[]): HTMLDivElement {
  const block = document.createElement("div");
  const blockTitle = document.createElement("h3");
  const list = document.createElement("ul");

  blockTitle.innerText = title;

  items.forEach((item: string) => {
    const li = document.createElement("li");

    li.innerText = item;
    list.appendChild(li);
  });

  block.append(blockTitle, list);

  return block;
}

function createElement(
  tag: string,
  content?: string | null,
  attributes: Record<string, string> = {}
): HTMLElement {
  const element = document.createElement(tag);

  if (content) element.innerHTML = content;

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

function renderRecipes(): void {
  recipesContainer.innerHTML = "";

  const start: number = (currentPage - 1) * limit;
  const end: number = start + limit;
  const pageRecipes: Recipe[] = recipesData.slice(start, end);

  pageRecipes.forEach((recipe: Recipe) => {
    const recipeItem = document.createElement("div");

    recipeItem.classList.add("recipe");

    const infoHTML: string = `
            <strong>Cuisine:</strong> ${recipe.cuisine} |
            <strong>Difficulty:</strong> ${recipe.difficulty} |
            <strong>Servings:</strong> ${recipe.servings} |
            <strong>Calories/Serving:</strong> ${recipe.caloriesPerServing} kcal<br>
            <strong>Prep time:</strong> ${recipe.prepTimeMinutes} min |
            <strong>Cook time:</strong> ${recipe.cookTimeMinutes} min<br>
            <strong>Rating:</strong> ${recipe.rating} ⭐ (${recipe.reviewCount} reviews)
          `;

    recipeItem.append(
      createElement("h2", recipe.name),
      createElement("img", null, { src: recipe.image, alt: recipe.name }),
      createElement("p", infoHTML),
      createList("Ingredients:", recipe.ingredients),
      createList("Instructions:", recipe.instructions),
      createList("Meal type:", recipe.mealType),
      createList("Tags:", recipe.tags)
    );

    recipesContainer.appendChild(recipeItem);
  });

  updatePagination();
}

function updatePagination(): void {
  const totalPages: number = Math.ceil(total / limit);

  pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", (): void => {
  if (currentPage > 1) {
    currentPage--;
    renderRecipes();
  }
});

nextBtn.addEventListener("click", (): void => {
  const totalPages: number = Math.ceil(total / limit);
  if (currentPage < totalPages) {
    currentPage++;
    renderRecipes();
  }
});

fetch("https://dummyjson.com/recipes")
  .then((res: Response) => res.json())
  .then((data: ApiResponse) => {
    recipesData = data.recipes;
    total = data.total;
    renderRecipes();
  })
  .catch((error: Error) => {
    console.error("Ошибка при загрузке рецептов:", error);
  });
