window.onload = function() {
  let marqueeContent = document.querySelector('.marquee-content');
  let textWidth = marqueeContent.scrollWidth;
  let screenWidth = window.innerWidth;

  if (textWidth > screenWidth) {
      marqueeContent.style.width = textWidth + 'px';
  } else {
      marqueeContent.style.width = screenWidth + 'px';
  }
}

const viewPort = window.screen.width;
let carousel = document.querySelector('.tourney__carousel')
let carouselCount = carousel.querySelector('.carousel__count');
let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');
let width = listElems[0].offsetWidth;
let position = 0; // положение ленты прокрутки
const count = Math.floor(viewPort / width); // видимое количество изображений
width += 20; // добавим gap

carouselCount.textContent = (count + ' / ' + listElems.length)

carousel.querySelector('.tourney__carousel-prev').onclick = function() {
  // сдвиг влево
  if (Math.abs(position) === 0) {
    position = -((listElems.length * width) - width * count);
  } else {
    position += width * count;
  }
  // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
  position = Math.min(position, 0)
  list.style.marginLeft = position + 'px';
};

carousel.querySelector('.tourney__carousel-next').onclick = function() {
  // сдвиг вправо
  position -= width * count;
  if (Math.abs(position) === listElems.length * width) {
    position = 0;
  }
  // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px';
};

setInterval(function() {
  // сдвиг вправо каджые 4 секунды
  position -= width * count;
  if (Math.abs(position) === listElems.length * width) {
    position = 0;
  }
  // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px';
}, 4000); 

let carousel2 = document.querySelector('.stages__carousel')
let carouselCount2 = 0;
let list2 = document.querySelector('.stages__grid');
let listElems2 = 4; // кол-во элементов в карусели начиная с 0
let width2 = carousel2.offsetWidth;
let position2 = 0; // положение ленты прокрутки
const count2 = 1; // видимое количество изображений
width2 += (viewPort - width2)/2; // добавим gap
const point = document.querySelector('.stages__grid-arrow');
const pointCount = point.querySelectorAll('.dot');

carousel2.querySelector('.stages__grid-prev').onclick = function() {
  // сдвиг влево
  if (Math.abs(position2) !== 0) {
    position2 += width2 * count2;
    carouselCount2 --;
    pointCount.forEach((el) => {
      el.classList.remove('active')      
    })
    this.removeAttribute("disabled", "");
    this.classList.remove('btn-disabled')  
  } 
  position2 === 0 ? this.setAttribute("disabled", "") : carousel2.querySelector('.stages__grid-next').removeAttribute("disabled")
  pointCount[carouselCount2].classList.add('active')
  list2.style.transform = `translateX(${position2}Px)`;
};

carousel2.querySelector('.stages__grid-next').onclick = function() {
  // сдвиг вправо  
  if (Math.abs(position2) !== listElems2 * width2) {
    position2 -= width2 * count2;
    carouselCount2 ++;
    pointCount.forEach((el) => {
      el.classList.remove('active')
    })
  }
  Math.abs(position2) === listElems2 * width2 ? this.setAttribute("disabled", "") : carousel2.querySelector('.stages__grid-prev').removeAttribute("disabled")
  pointCount[carouselCount2].classList.add('active')
  list2.style.transform = `translateX(${position2}Px)`;
};

