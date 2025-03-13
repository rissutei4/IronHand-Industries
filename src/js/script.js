"use strict";
const headerOpenIcon = document.querySelector('.burgerIcon');
const burgerIconLines = document.querySelectorAll('.burgerIcon .line');
const menuContainer = document.querySelector('.nav-content');
const menuContainerLi = document.querySelectorAll('.nav-content li');
const headerParent = document.querySelector('header');
const brandContainer = document.querySelector('.change-bg');

const toggleMenu = function () {
    if (window.innerWidth >= 500) return;
    menuContainer.classList.toggle('d-none');
    menuContainer.classList.toggle('open-menu-container');
    headerParent.classList.toggle('open-menu-container');
    brandContainer.classList.toggle('open-menu-container');
    body.classList.toggle('open-menu-container');
    burgerIconLines.forEach(line => {
        line.classList.toggle("open-menu-container");
    });
};

// Attach event listener once
headerOpenIcon.addEventListener('click', toggleMenu);

// Close menu when clicking any menu item
menuContainerLi.forEach(item => {
    item.addEventListener('click', toggleMenu);
});
window.addEventListener("scroll", function () {
    // You can adjust the threshold value as needed
    if (window.scrollY > 100) {
        headerParent.classList.add("sticky");
    } else {
        headerParent.classList.remove("sticky");
    }
});
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});