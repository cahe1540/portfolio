//sections
const home = document.querySelector('.home');
const about = document.querySelector('.about');
const projects = document.querySelector('.projects');
const contact = document.querySelector('.contact');

//nav btns
const menuHome = document.querySelector('.menu-home');
const menuAbout = document.querySelector('.menu-about');
const menuProjects = document.querySelector('.menu-projects');
const menuContact = document.querySelector('.menu-contact');

//mobile menu components
const hamburger = document.querySelector('.hamburger-button');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');

//mobile nav btns
const mobileHome = document.querySelector('.mobile-home');
const mobileAbout = document.querySelector('.mobile-about');
const mobileProjects = document.querySelector('.mobile-projects');
const mobileContact = document.querySelector('.mobile-contact');

//adjust the start locations of each section
let homeStart, aboutStart, projectStart, contactStart;

//correction of 150 pxs of above values
let offset = 175;

//update breakpoints for scrolling and fading
function calcBreakPoints(){ 
    homeStart = 0;
    aboutStart = home.getBoundingClientRect().height + homeStart;
    projectStart = aboutStart + about.getBoundingClientRect().height;
    contactStart = projectStart + projects.getBoundingClientRect().height;
}

//remove the blue text from all menu items 
function removeBlueFontFromMenuItems(){
    document.querySelectorAll('.home-btn').forEach(cur => cur.classList.remove('current'));
    document.querySelectorAll('.about-btn').forEach(cur => cur.classList.remove('current'));
    document.querySelectorAll('.projects-btn').forEach(cur => cur.classList.remove('current'));
    document.querySelectorAll('.contact-btn').forEach(cur => cur.classList.remove('current'));
}

//add blue font to menu item depending on current position on page
function updateBlueFont(elmnts){
    elmnts.forEach(cur => cur.classList.add('current'));
    console.log(elmnts);
}

//set default breakpoint dimensions
calcBreakPoints();

//listen for screen resizing and adjust breakpoints
window.addEventListener('resize', calcBreakPoints);

//add fade in animation to each section
window.addEventListener('scroll', () => {
    //change color of hamburger button
    if(window.pageYOffset > aboutStart){
        document.querySelectorAll('.burger-dashes').forEach(el => {
            el.classList.add('bg-black');
        });
    } else if(window.pageYOffset <= aboutStart){
        document.querySelectorAll('.burger-dashes').forEach(el => {
            el.classList.remove('bg-black');
        });
    }

    //reset all animations
    if(window.pageYOffset < 150){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.home-btn'));
        about.classList.remove('fade-in');
        projects.classList.remove('fade-in');
        contact.classList.remove('fade-in');
    }

    //add fade in animation to about 
    if(window.pageYOffset >= aboutStart-offset && window.pageYOffset < projectStart-offset){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.about-btn'));
        about.classList.add('fade-in');
    }
    //add fade in animation to about 
    if(window.pageYOffset >= projectStart-offset && window.pageYOffset < contactStart-offset){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.projects-btn'));
        projects.classList.add('fade-in');
    }
    //add fade in animation to about 
    if(window.pageYOffset > contactStart-offset){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.contact-btn'));
        contact.classList.add('fade-in');
    }
});

/*mobile menu*/
/*open and close action*/
hamburger.addEventListener('click', e => {
    e.preventDefault();
    mobileMenu.classList.remove('mobile-close');
    mobileMenu.classList.add('mobile-open');
});

/*open and close action to sliding menu*/
closeBtn.addEventListener('click', e => {
    e.preventDefault();
    mobileMenu.classList.remove('mobile-open');
    mobileMenu.classList.add('mobile-close');
});