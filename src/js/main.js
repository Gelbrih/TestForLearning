'use strict'
function filterRange(arr, a, b) {
   // добавлены скобки вокруг выражения для улучшения читабельности
   return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

let messages = [
   { text: "Hello", from: "John" },
   { text: "How goes?", from: "John" },
   { text: "See you soon", from: "Alice" }
];

//import { slider } from "./modules/_slider.js";
//import { modal} from "./modules/modal.js";
