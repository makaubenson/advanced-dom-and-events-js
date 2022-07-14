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
