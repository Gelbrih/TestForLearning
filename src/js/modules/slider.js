//import Swiper from 'swiper/bundle';
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, Thumbs } from "swiper";

export const slider = new Swiper('.swiper', {
   modules: [Navigation, Pagination, Mousewheel, Autoplay, Thumbs],
   spaceBetween: 10,
   direction: 'horizontal',
   loop: true,
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets'
   },
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   mousewheel: {
      invert: true,
   },
   autoplay: {
      delay: 3000,
   },
});
