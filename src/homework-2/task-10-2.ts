// *** (подібне було вище, але…будьте уважні в другій частині) створити сторінку з довільним блоком, в середині якого є значення “100грн”
//
// при перезавантаженні сторінки до значення додається по 10грн, але !!! зміна ціни відбувається тільки на перезавантаження, які відбулись пізніше ніж 10 секунд після попереднього.
//
//     При перезавантаженні, яке відбулось раніше ніж минуло 10 секунд, нічого не відбувається

import { getElement } from "../utils.js";

const moneyBlock = getElement<HTMLParagraphElement>("#money");

let money: number = +(localStorage.getItem("money") || "") || 100;
const lastTime: number = +(localStorage.getItem("lastTime") || "") || 0;

const currentTime: number = Date.now();

if (currentTime - lastTime > 4000 && lastTime !== 0) {
  money += 10;
  localStorage.setItem("money", money.toString());
}

localStorage.setItem("lastTime", currentTime.toString());

moneyBlock.innerText = `${money} грн`;
