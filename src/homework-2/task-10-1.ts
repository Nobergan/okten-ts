// – створити інпут, який приймає вік людини, та кнопку, яка підтверджує дію. При натисканні на кнопку зчитати інформацію з інпуту та перевірити вік, чи менше він за 18, та повідомити про це користувача

import { getElement } from "../utils.js";

const form = getElement<HTMLFormElement>("#form");
const message = getElement<HTMLParagraphElement>("#message");

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const ageInput = getElement<HTMLInputElement>('input[name="age"]');

  if (ageInput) {
    const age = Number(ageInput.value);
    console.log(age);

    message.textContent =
      age < 18 ? "You are too young!!!" : "You are old enough!!!";
  }
});
