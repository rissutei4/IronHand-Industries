const headerOpenIcon = document.querySelector('.burgerIcon');
const burgerIconLines = document.querySelectorAll('.burgerIcon .line');
const menuContainer = document.querySelector('.nav-content');
const headerParent = document.querySelector('header');
const brandContainer = document.querySelector('.change-bg');
const body = document.querySelector('body');

headerOpenIcon.addEventListener('click', () => {
    menuContainer.classList.toggle('d-none');
    menuContainer.classList.toggle('open-menu-container');
    headerParent.classList.toggle('open-menu-container');
    brandContainer.classList.toggle('open-menu-container');
    body.classList.toggle('open-menu-container');
    burgerIconLines.forEach(line => {
        line.classList.toggle("open-menu-container");
    });
})