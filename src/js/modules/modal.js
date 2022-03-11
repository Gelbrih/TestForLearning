function modalOpen(e) {
   if (!e.target.classList.contains('modal-open')) {
      return;
   }
   e.preventDefault();
   document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
   document.body.classList.add('overflow-hidden');
   document.querySelector(e.target.getAttribute('href')).classList.add('modal-opened');
}

function modalClose(e) {
   if (!e.target.classList.contains('modal-close')) {
      return;
   }
   e.preventDefault();
   document.body.classList.remove('overflow-hidden');
   document.body.style.marginRight = 0;
   e.target.closest('.modal').classList.remove('modal-opened');
}

export const modal = () => {
   let modalLinks = document.querySelectorAll('.modal-open');
   let modalCloseLinks = document.querySelectorAll('.modal-close');

   modalLinks.forEach(elem => elem.addEventListener('click', modalOpen));
   modalCloseLinks.forEach(elem => elem.addEventListener('click', modalClose))
}