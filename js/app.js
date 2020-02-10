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

/**
 * End Global Variables†
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (let i = 0; i < sections.length; i++) {
  const navLi = document.createElement('li');

  let currentSection = sections[i].getAttribute('data-nav');
  let currentSectionId = sections[i].getAttribute('id');

  navLi.innerHTML = `<a href="#${currentSectionId}">${currentSection}</a>`;
  navBar.appendChild(navLi);

  navLi.addEventListener('click', scrollToAnchor());
}

// Add class 'active' to section when near top of viewport
//http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
//https://codepen.io/josephyoung83/pen/bNvpdR?editors=1010
// https://www.w3schools.com/howto/howto_js_add_class.asp
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener('scroll', function() {
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
  console.log('scroll smooth');
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

var scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = 'TOP';
var main = document.getElementsByTagName('main')[0];
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
  console.log('scroll to top');
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 10);
  }
};

scrollToTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
