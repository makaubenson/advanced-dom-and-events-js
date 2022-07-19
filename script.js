'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Using query selector
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

//createElement()
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It</button>';

//Smooth Scroll :Method 1
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  //get coordinates of the section you want to scroll to
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  //get coordinates of the button being clicked
  // console.log(e.target.getBoundingClientRect());

  //get current scroll position
  // console.log('Current scroll: (X,Y)', window.pageXOffset, window.pageYOffset);

  //Height/width of website's viewport
  // console.log(
  //   'Height/width of viewport:',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //scrolling (This works though not very smooth)
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // //smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
});
//Method 2 : Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  //get coordinates of the section you want to scroll to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //Method 2 : Modern way
  //Take Element you want to scroll to
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//Tabbed Component

//use events delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard Clause - This is an if statement returned early if some condition is met
  if (!clicked) return;

  //remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');

  // console.log(clicked.dataset.tab);
  //Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu Fade Animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
// nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
// nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Navigation Menu
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky Navigation using The Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null, //null implies viewport,one can set different section
//   // threshold: 0.1,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); //section1 is the target element

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries; // entries == entries[0] i.e they are the same
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //90px before target element : 90 is the height
});
headerObserver.observe(header);

//Revealing Elements on Scroll using The Intersection API
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //Guard Clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

//Callback Function
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return; //Guard Clause

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //Remove Class with blur effect
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  //stop observing the images
  observer.unobserve(entry.target);
};

//Create Image Observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

//Loop through the Image Targets
imgTargets.forEach(img => imgObserver.observe(img));

//Slider Component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = `scale(0.4) translateX(-800px)`;
  // slider.style.overflow = 'visible';

  // //s- slide, i - index
  // slides.forEach(function (s, i) {
  //   s.style.transform = `translateX(${100 * i}%)`;
  // });
  //0%, 100%,200%,300%

  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Go to the Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    // Function Goes Here
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    // Function Goes Here
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  //event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //getting Keyboard Activity
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}; //close slider function here
slider();
////////////////////////////////////////
// Page Navigation
///////////////////////////////////////
//Method 1: Without Delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

//Method 2: With Delegation
//1. Add event listener to common parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target); // find where the event happened.

  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});
/*
// Selecting, creating, and deleting elements
//Selecting the whole document
console.log(document.documentElement);
//Selecting the head section
console.log(document.head);
//Selecting the body section
console.log(document.body);

//getElementById()
document.getElementById('section--1');

//getElementsByTagName()
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// getElementsByClassName
console.log(document.getElementsByClassName('btn'));

//Creating and Inserting Elements
// .insertAdjacentHTML


//prepend adds the element as the first child of the element it is being added to.
// header.prepend(message);
// append adds the element as the last child of the element it is being added to.
header.append(message);

// inserting multiple copies of the same element
// header.append(message.cloneNode(true));

//inserts element before the select object
// header.before(message);
//inserts element after the select object
// header.after(message);

//delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//getting style properties for an element
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//Reading Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //http://127.0.0.1:8080/img/logo.png
console.log(logo.getAttribute('src')); //img/logo.png
console.log(logo.className);

//Cant see designer since its not a known attribute that is found in images
console.log(logo.designer); //undefined

//to fetch attributes which are not starndard use
console.log(logo.getAttribute('designer'));

//Writing Attributes
logo.alt = 'Beautiful Minimalised Logo';
console.log(logo.alt); //Beautiful Minimalised Logo
logo.setAttribute('author', 'makau');
console.log(logo.getAttribute('author')); //makau

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:8080/?#
console.log(link.getAttribute('href')); //#

//Data Attributes
console.log(logo.dataset.versionNumber);

//Classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// logo.className = 'Benson';

const alertH1 = function (e) {
  alert('addEventListener: Great, you are reading the heading :D');
  //removing event handlers
  h1.removeEventListener('mouseenter', alertH1);
};
//mouseenter
const h1 = document.querySelector('h1');
// mouseenter works similar to hover in css, it fires when mouse enters the specified element or section
h1.addEventListener('mouseenter', alertH1);

//method 2 of attaching event handlers to elements
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Good, you are reading the heading :D');
// };

//Event Propagation in Practice
//Create Random Color e.g rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  // console.log(e.currentTarget === this); // true

  //Stop Propagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
//listening to capuring phase
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );


//DOM Traversing
const h1 = document.querySelector('h1');
// Going downwards: selecting child elements
//Using query selector
// console.log(h1.querySelectorAll('.highlight')); //selects all elements that are children of h1 with highlight class
// console.log(h1.childNodes); //or
// console.log(h1.children); // This works for direct children
// console.log(h1.firstChild); //When
// console.log(h1.lastChild); //#text

// console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';
// console.log(h1.lastElementChild);
h1.lastElementChild.style.color = 'orangered';

// Going upwards: selecting parent elements
console.log(h1.parentNode);
console.log(h1.parentElement);

//finding the closest parent element
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going Side Ways: siblings
console.log(h1.previousElementSibling); //null
console.log(h1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
//HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

//Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML PARSED AND DOM TREE BUILD', e);
});

window.addEventListener('load', function (e) {
  console.log('PAGE FULLY LOADED', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
