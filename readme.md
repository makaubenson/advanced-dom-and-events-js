# Advanced DOM and Events

## How the DOM Really Works

- DOM is the interface between our js code and our browser.

### What is DOM

- DOM allows us to:
- Make js interact with the browser
- Create, modify and delete html elements

- DOM tree is generated from an HTML document, which we can then interact with.
- DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree.

### How DOM is organized behind the scenes

- Every single node in DOM tree is of type node.
- Each node is represented in js by the object which has access to different methods and properties.
- Node type ha child types: `element`, `text`, `comment`, `document`

#### Inheritance

- Each child types has access to each method and properties of the parent node types.

### Selecting, creating, and deleting elements

#### Selecting the whole document

```

console.log(document.documentElement);
//Selecting the head section
console.log(document.head);
//Selecting the body section
console.log(document.body);

//Using query selectpr
document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

//getElementById()
document.getElementById('section--1');


// getElementsByTagName()
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

//getElementsByClassName
console.log(document.getElementsByClassName('btn'));
```

- Both `getElementsByClassName()` and `getElementsByTagName()` returns a htmlcollection.
- `getElementById()` returns a nodelist

#### Creating and Inserting Elements

// .insertAdjacentHTML

- `createElement()`

```
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It</button>';
```

```
//prepend adds the element as the first child of the element it is being added to.
header.prepend(message);
// append adds the element as the last child of the element it is being added to.
header.append(message);

// inserting multiple copies of the same element
header.append(message.cloneNode(true));

//inserts element before the select object
header.before(message);
//inserts element after the select object
header.after(message);
```

- append and prepend can be used to move elements

#### delete elements

```
document
.querySelector('.btn--close-cookie')
.addEventListener('click', function () {
message.remove();
});
```

### Styles

- styles set using js are added to html as inline styles.

```
  message.style.backgroundColor = '#37383d';
  message.style.width = '120%';
```

##### getting style properties for an element

```
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);

//getting style properties for an element
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');
```

### Reading Attributes

```
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //http://127.0.0.1:8080/img/logo.png
console.log(logo.getAttribute('src')); //img/logo.png
console.log(logo.className);

//Cant see designer since its not a known attribute that is found in images
console.log(logo.designer);
//to fetch attributes which are not starndard use
console.log(logo.getAttribute('designer'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:8080/?#
console.log(link.getAttribute('href')); //#
```

### Writing Attributes

```
logo.alt = 'Beautiful Minimalised Logo';
console.log(logo.alt); //Beautiful Minimalised Logo
logo.setAttribute('author', 'makau');
console.log(logo.getAttribute('author')); //makau

```

### Data Attributes

```
 <img
          src="img/logo.png"
          alt="Bankist logo"
          class="nav__logo"
          id="logo"
          designer="Benson"
          data-version-number="3.0"
        />
```

- `version-number` - transformed to `versionNumber`

```
console.log(logo.dataset.versionNumber);

```

### Classes

```
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

```

- ` logo.className = 'Benson';` - It is bad practice to add classes this way as it overrides all the existing classes and only allows for one class

#### Smmoth Scroll :Method 1

```
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
e.preventDefault();
//get coordinates of the section you want to scroll to
const s1coords = section1.getBoundingClientRect();
console.log(s1coords);

//get coordinates of the button being clicked
console.log(e.target.getBoundingClientRect());

//get current scroll position
console.log('Current scroll: (X,Y)', window.pageXOffset, window.pageYOffset);

//Height/width of website's viewport
console.log(
'Height/width of viewport:',
document.documentElement.clientHeight,
document.documentElement.clientWidth
);

//scrolling
window.scrollTo(s1coords);
});
```

#### Smooth Scrolling : Old School

```
//Smooth Scroll :Method 1
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  //get coordinates of the section you want to scroll to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

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

  //smooth scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});
```

#### Smooth Scroll: New Way

- This method works in modern browsers

```
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
```

### Types of Events and Event Handlers

- Event is a signal generated by a DOM Node.
- We the use even listeners to capture those events.
- The captured events are then handled using event handlers.

#### events

##### mousenter

- mouseenter works similar to hover in css, it fires when mouse enters the specified element or section

```
const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', function (e) {
  alert('addEventListener: Great, you are reading the heading :D');
});
```

- `method 2 of attaching event handlers to elements (old school)`

  ```
  h1.onmouseenter = function (e) {
  alert('onmouseenter: Good, you are reading the heading :D');
  };
  ```

#### Why use addEventListener over the old school method?

- addEventListener() allows us to add multiple event listeners to the same event.
- We can remove event handler if we dont need it any more.

```
const alertH1 = function (e) {
  alert('addEventListener: Great, you are reading the heading :D');
//removing eventListener
  h1.removeEventListener('mouseenter', alertH1);
};
//mouseenter
const h1 = document.querySelector('h1');
// mouseenter works similar to hover in css, it fires when mouse enters the specified element or section
h1.addEventListener('mouseenter', alertH1);
```

#### Method 4 of handling events

```
 <h4 onclick="alert('You clicked here')">

```

- This method is however not recommended

### Event Propagation: Bubbling and Capturing

- Js events have
