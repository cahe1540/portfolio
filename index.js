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

//elements for sending email
const form = document.getElementById('email-form');
const success = document.querySelector('.success');
const fail = document.querySelector('.fail');

//adjust the start locations of each section
let homeStart, aboutStart, projectStart, contactStart;

//correction of 150 pxs of above values
let offset = 165;

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
        about.classList.remove('fade-in');
        projects.classList.remove('fade-in');
        contact.classList.remove('fade-in');
    }
    //add fade in animation to about 
    if(window.pageYOffset >= aboutStart-offset && window.pageYOffset < projectStart-offset){
        about.classList.add('fade-in');
    }
    //add fade in animation to about 
    if(window.pageYOffset >= projectStart-offset && window.pageYOffset < contactStart-offset){
        projects.classList.add('fade-in');
    }
    //add fade in animation to about 
    if(window.pageYOffset > contactStart-offset){
        contact.classList.add('fade-in');
    }

    /*change highlighted btn*/
    if(window.pageYOffset <= aboutStart){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.home-btn'));
    }
    if(window.pageYOffset > aboutStart-20 && window.pageYOffset <= projectStart){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.about-btn'));
    }
    if(window.pageYOffset > projectStart-20 && window.pageYOffset <= contactStart){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.projects-btn'));
    }
    if(window.pageYOffset > contactStart-30){
        removeBlueFontFromMenuItems();
        updateBlueFont(document.querySelectorAll('.contact-btn'));
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

/*reset all form values on email send*/
form.addEventListener('submit', async (e) => {   
    
    e.preventDefault();
    
    //get data from form
    const data = new FormData(e.target);
    
    //send data
    const res = await fetch(e.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });
    
    if(res.status === 200){
        success.innerHTML = "Thanks for your submission!";
        fail.innerHTML = '';
        form.reset();
    } else{
        fail.innerHTML = "Oops! There was a problem submitting your form";
        success.innerHTML = '';
    }   
});