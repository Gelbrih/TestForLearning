'use strict'
let fruits = ["Яблоки", "Груша", "Апельсин"];

let shoppingCart = fruits;

shoppingCart.push("Банан");

alert(fruits.length); // 4


function getMaxSubSum(arr) {
   let maxSum = 0;
   let partialSum = 0;

   for (let item of arr) { // для каждого элемента массива
      partialSum += item; // добавляем значение элемента к partialSum
      maxSum = Math.max(maxSum, partialSum); // запоминаем максимум на данный момент
      if (partialSum < 0) partialSum = 0; // ноль если отрицательное
   }

   return maxSum;
}
//import { slider } from "./modules/_slider.js";
//import { modal} from "./modules/modal.js";