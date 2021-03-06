/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll('section');
const navBar = document.querySelector('#navbar__list');

// add section
const addSection = () => {
  const menu = document.querySelector('main');
  const newSection = document.createElement('section');

  newSection.setAttribute('id', 'section4');
  newSection.setAttribute('data-nav', 'section 4');
  menu.appendChild(newSection);

  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'landing__container');
  newSection.appendChild(newDiv);

  const newh2 = document.createElement('h2');
  newh2.innerText = 'Section 4';
  newDiv.appendChild(newh2);

  const newp = document.createElement('p');
  newp.innerText =
    "In de tuin van het huis van de March Hare (Maartse Haas) houdt deze een thee-feestje met de Mad Hatter (hoedenmaker) en de Dormouse (Slaapmuis of Zevenslaper). Omdat ze ruzie hebben gehad met Time[1], is het er permanent theetijd, zes uur 's middags. De Dormouse vertelt een raar verhaal over drie zusjes die in een put vol met stroop wonen. Uiteindelijk gaat Alice maar weg. Ze komt weer terecht bij de toegang tot de prachtige tuin. Deze keer doet ze alles goed, en kan ze door het kleine deurtje.";
  newDiv.appendChild(newp);
};

document.addEventListener('DOMContentLoaded', addSection);

// build the nav
const addNav = () => {
  const sections = document.querySelectorAll('section');
  for (let i = 0; i < sections.length; i++) {
    const navLi = document.createElement('li');

    let currentSection = sections[i].getAttribute('data-nav');
    let currentSectionId = sections[i].getAttribute('id');

    navLi.innerHTML = `<a href="#${currentSectionId}">${currentSection}</a>`;
    navBar.appendChild(navLi);

    navLi.addEventListener('click', () => {
      scrollToAnchor();
    });
  }
};

document.addEventListener('DOMContentLoaded', addNav);

// Add class 'active' to section when near top of viewport
//http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
//https://codepen.io/josephyoung83/pen/bNvpdR?editors=1010
// https://www.w3schools.com/howto/howto_js_add_class.asp
function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  const view = rect.bottom <= window.innerHeight;

  return view;
}

// window.addEventListener('scroll', isElementInViewport());

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');

  for (const section of sections) {
    if (isElementInViewport(section)) {
      section.classList.add('your-active-class');
    } else {
      section.classList.remove('your-active-class');
    }
  }
});

// Scroll to anchor ID using scrollTO event
// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link

function scrollToAnchor() {
  let anchorlinks = document.querySelectorAll('a[href^="#"]');

  for (const anchorlink of anchorlinks) {
    anchorlink.addEventListener('click', e => {
      let hashanchor = anchorlink.getAttribute('href');
      let target = document.querySelector(hashanchor);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      history.pushState(null, null, hashanchor);
      e.preventDefault();
    });
  }
}

// add scroll to top button
// https://getflywheel.com/layout/sticky-back-to-top-button-tutorial/

const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = 'TOP';
const main = document.getElementsByTagName('main')[0];
main.appendChild(scrollToTopButton);

const scrollFunc = () => {
  let y = window.scrollY;
  if (y > 0) {
    scrollToTopButton.className = 'top-link show';
  } else {
    scrollToTopButton.className = 'top-link hide';
  }
};
window.addEventListener('scroll', scrollFunc);

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 10);
  }
};

scrollToTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
};

// Build menu
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_right

const menuButton = document.createElement('button');
menuButton.setAttribute('class', 'dropbtn');
menuButton.innerHTML = 'MENU<i class="fa fa-angle-right"></i>';
const navMenu = document.getElementsByClassName('page__header')[0];
navMenu.appendChild(menuButton);

const menuDiv = document.createElement('div');
menuDiv.setAttribute('id', 'myDropdown');
navMenu.appendChild(menuDiv);

const text = ['HOME', 'ABOUT', 'CONTACT'];
for (let i = 0; i < text.length; i++) {
  const dropText = document.createElement('a');
  dropText.innerHTML = `<a href="#${text[i]}">${text[i]}</a>`;
  menuDiv.setAttribute('id', 'myDropdown');
  menuDiv.setAttribute('class', 'dropdown-content');
  const dropDiv = document.getElementById('myDropdown');
  dropDiv.appendChild(dropText);
}

menuButton.addEventListener('click', myFunction());

function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show');
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');

    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

// hide and appear menu when scroll

const body = document.body;
const scrollUp = 'scroll-up';
const scrollDown = 'scroll-down';
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll == 0) {
    body.classList.remove(scrollUp);
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains(scrollDown)
  ) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});
