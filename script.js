'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
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

*/
//DOM Traversing
const h1 = document.querySelector('h1');
// Going downwards: selecting child elements
//Using query selector
console.log(h1.querySelectorAll('.highlight')); //selects all elements that are children of h1 with highlight class
console.log(h1.childNodes); //or
console.log(h1.children); // This works for direct children
console.log(h1.firstChild); //When
console.log(h1.lastChild); //#text

console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';
console.log(h1.lastElementChild);
h1.lastElementChild.style.color = 'orangered';
