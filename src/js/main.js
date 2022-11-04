'use strict'
function filterRange(arr, a, b) {
   // добавлены скобки вокруг выражения для улучшения читабельности
   return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert(filtered); // 3,1 (совпадающие значения)

alert(arr); // 5,3,8,1 (без изменений)


function aclean(arr) {
   let map = new Map();

   for (let word of arr) {
      // разбиваем слово на буквы, сортируем и объединяем снова в строку
      let sorted = word.toLowerCase().split("").sort().join(""); // (*)
      map.set(sorted, word);
   }

   return Array.from(map.values());
}

let messages = [
   { text: "Hello", from: "John" },
   { text: "How goes?", from: "John" },
   { text: "See you soon", from: "Alice" }
];

//import { slider } from "./modules/_slider.js";
//import { modal} from "./modules/modal.js";
