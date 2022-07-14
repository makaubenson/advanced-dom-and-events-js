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

//Using query selectpr
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

//createElement()
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It</button>';

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
*/
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
