//1. =========================ColorMode Switcher===============================================

//If colorMode is stored in local storage, will get it.
let colorMode = localStorage.getItem('colorMode'); 

if (colorMode === 'light'){ //Default is dark mode, so if light was saved in local storage, must change to light.
    toggleLightMode();
    console.log("light mode toggled");
};

//Get button that toggles light/dark mode.
// const colorModeToggle = document.querySelector('.navbar__color-mode-button');
// colorModeToggle.onclick = toggleColorMode;

function toggleColorMode(){ //called by in-line html.
    if (colorMode === "light"){ 
        toggleDarkMode();
    }
    else{ //runs first time button is clicked. Default is dark. Will turn to light. 
        toggleLightMode();
    }
    colorMode = localStorage.getItem('colorMode'); 
    // console.log(colorMode);
};

function toggleDarkMode () {
    //Removes lightmode style from HTML.
    localStorage.setItem('colorMode', null);
    document.querySelector('html').classList.remove('lightmode')
    
    //Hides moon logo and shows sun logo.
    document.querySelector('.sun').style.display = "flex";
    document.querySelector('.moon').style.display = "none";
};
function toggleLightMode() {
    //Adds lightmode style to HTML.
    localStorage.setItem('colorMode', 'light');
    document.querySelector('html').classList.add('lightmode')

    //Hides sun logo and shows moon logo.
    document.querySelector('.moon').style.display = "flex";
    document.querySelector('.sun').style.display = "none";
};
//2.============================Burger Menu============================================
//Animation of BurgerMenu (on click) + Appearance of its menu.===========================

const burgerMenuBtn = document.querySelector('.navbar__burger-button');
const burgerMenu = document.querySelector('.navbar__mob-collapsible-container');
const burgerMenuChild = document.querySelector('.navbar__mob-items-container');

const itchLogo = document.querySelector('.mob-itch');
const githubLogo = document.querySelector('.mob-github');
const contact = document.querySelector('.mob-contact');
const resume = document.querySelector('.mob-resume');


let burgerMenuFlipped = false;

burgerMenuBtn.onclick = () => {//Add style with rotation transform if not flipped, remove style if flipped.    
    burgerMenu.classList.remove("js-navbar__collapsible-container-expansion");

    if (burgerMenuFlipped){ //must turn off.
        collapseBurgerMenu();
    }
    else{   //must turn on.
        raiseBurgerMenu();
    }
    burgerMenuFlipped = !burgerMenuFlipped;
};

function collapseBurgerMenu(){
    burgerMenuBtn.classList.remove("js-navbar__burger-button");
    burgerMenu.classList.add("js-navbar__collapsible-container");

    itchLogo.classList.add("js-navbab__itch-github-raise");
    githubLogo.classList.add("js-navbab__itch-github-raise");
    itchLogo.classList.remove("js-navbab__itch-github-collapse");
    githubLogo.classList.remove("js-navbab__itch-github-collapse");

    itchLogo.classList.remove("js-navbab__itch-github-raised");
    githubLogo.classList.remove("js-navbab__itch-github-raised");

     // Dont want these to be focusable/tabbable.
    itchLogo.classList.add("js-navbar__disable-links");
    githubLogo.classList.add("js-navbar__disable-links");
    resume.classList.add("js-navbar__disable-links");
    contact.classList.add("js-navbar__disable-links");

    itchLogo.tabIndex = -1;
    githubLogo.tabIndex = -1;
    resume.tabIndex = -1;
    contact.tabIndex = -1;

    document.removeEventListener("click", DocumentClickListener);
};
function raiseBurgerMenu(){
    // Want these to be selectable again.
    itchLogo.classList.remove("js-navbar__disable-links");
    githubLogo.classList.remove("js-navbar__disable-links");
    resume.classList.remove("js-navbar__disable-links");
    contact.classList.remove("js-navbar__disable-links");
    itchLogo.tabIndex = 0;
    githubLogo.tabIndex = 0;
    resume.tabIndex = 0;
    contact.tabIndex = 0;


    burgerMenuBtn.classList.add("js-navbar__burger-button");
    burgerMenu.classList.remove("js-navbar__collapsible-container");

    itchLogo.classList.remove("js-navbab__itch-github-raise");
    githubLogo.classList.remove("js-navbab__itch-github-raise");
    itchLogo.classList.add("js-navbab__itch-github-collapse");
    githubLogo.classList.add("js-navbab__itch-github-collapse");

    itchLogo.addEventListener('transitionend', mobLogosOpened);

    //When navbar is open, want to be able to close it if user clicks anywhere on the document except for within the navbar.
    document.addEventListener("click", DocumentClickListener);
};

itchLogo.addEventListener('transitionend', mobLogosOpened); //no need to put on both logos, since all have the same animations.
function mobLogosOpened(e){ // after logos have been transitioned, gets rid of any transition delay
    itchLogo.removeEventListener('transitionend', mobLogosOpened);

    itchLogo.classList.add("js-navbab__itch-github-raised");
    githubLogo.classList.add("js-navbab__itch-github-raised");
}


const burgerMenuChildren = document.querySelectorAll(".navbar__mob-collapsible-container *");
const burgerButtonChildren = document.querySelectorAll(".navbar__burger-button *");

//
let mobNavElements = Array.from(burgerMenuChildren);
mobNavElements = mobNavElements.concat(Array.from(burgerButtonChildren));
mobNavElements.push(burgerMenuBtn);
mobNavElements.push(burgerMenu);


function DocumentClickListener(e){
    //need to close navbar after detecting click outside of mobile navbar.
    if (! mobNavElements.includes(e.target)){
        console.log("NavBar not clicked... Must close.");

        collapseBurgerMenu();
        burgerMenuFlipped = !burgerMenuFlipped;
    }
    // else{
    //     console.log("navbar clicked... no need to close");

    // }
};


//3.============================NavBar dots anim on on desktop and mobile============================================


// NAME seperator (mobile only):
const nameBig = document.querySelector('.navbar__home');
const nameSeperator = document.querySelector('.navbar__vertical-name-seperator');

nameBig.addEventListener("click", () => {
    if (nameSeperator.offsetParent !== null){ // if element is visible
        if (window.matchMedia( "(hover: none)" ).matches) { // AND the device does not allow hovering (i.e., is mobile)
            nameSeperator.addEventListener("animationend", SeperatorAnimDone);
            nameSeperator.classList.add("js-navbar-name-seperator-anim");
         }
    }
});
function SeperatorAnimDone (){
    nameSeperator.removeEventListener("animationend", SeperatorAnimDone);
    nameSeperator.classList.remove("js-navbar-name-seperator-anim");
};

// NavBar items seperator:
const itchLogoBig = document.querySelector('.itch');
const githubLogoBig = document.querySelector('.github');
const contactBig = document.querySelector('.contact');
const resumeBig = document.querySelector('.resume');
const seperatorBig = document.querySelector('.navbar__vertical-seperator');
const parentHolderBig = document.querySelector('.navbar__collapsible-container');

if (window.matchMedia( "(hover: none)" ).matches) {
    // on mobile, set up mouse click listners.
    itchLogoBig.addEventListener("touchstart", ItemsAnimMob);
    githubLogoBig.addEventListener("touchstart", ItemsAnimMob);
    contactBig.addEventListener("touchstart", ItemsAnimMob);
    resumeBig.addEventListener("touchstart", ItemsAnimMob);
}
else{
    // on desktop, set up hover listners.
    itchLogoBig.addEventListener("mouseenter", ItemsAnim);
    githubLogoBig.addEventListener("mouseenter", ItemsAnim);
    contactBig.addEventListener("mouseenter", ItemsAnim);
    resumeBig.addEventListener("mouseenter", ItemsAnim);
    parentHolderBig.addEventListener("mouseleave", () => {
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-up");
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-down");
    });
};
//Mobile:
let up = true //controls which mobile animation is going to play.
function ItemsAnimMob(){
    seperatorBig.addEventListener("animationend", seperatorBigAnimDone); //removes the animation after its done.
    if (up){
        seperatorBig.classList.add("js-navbar-vertical-seperator-anim-up"); //adds the animation class.
    }
    else{
        seperatorBig.classList.add("js-navbar-vertical-seperator-anim-down"); //adds the animation class.
    };
    up = !up;
};
function seperatorBigAnimDone(){
    seperatorBig.removeEventListener("animationend", seperatorBigAnimDone);
    seperatorBig.classList.remove("js-navbar-vertical-seperator-anim-up");
    seperatorBig.classList.remove("js-navbar-vertical-seperator-anim-down");
}
//Desktop:
function ItemsAnim(){
    // Either on mobile touch or Desktop Hover.
    if (seperatorBig.classList.contains("js-navbar-vertical-seperator-trans-up")){
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-up");
        seperatorBig.classList.add("js-navbar-vertical-seperator-trans-down");
    }
    else{
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-down");
        seperatorBig.classList.add("js-navbar-vertical-seperator-trans-up");
    };
};

//3.============================Mobile Link Styles on Tocuh============================================
if (window.matchMedia( "(hover: none)" ).matches) {
    // on mobile, set up mouse click listners.
    itchLogo.addEventListener("touchstart", LinkStyle);
    githubLogo.addEventListener("touchstart", LinkStyle);
    contact.addEventListener("touchstart", LinkStyle);
    resume.addEventListener("touchstart", LinkStyle);

    itchLogoBig.addEventListener("touchstart", LinkStyle);
    githubLogoBig.addEventListener("touchstart", LinkStyle);
    contactBig.addEventListener("touchstart", LinkStyle);
    resumeBig.addEventListener("touchstart", LinkStyle);

    nameBig.addEventListener("touchstart", LinkStyle);
    /////////
    itchLogo.addEventListener("touchend", LinkStyleRemove);
    githubLogo.addEventListener("touchend", LinkStyleRemove);
    contact.addEventListener("touchend", LinkStyleRemove);
    resume.addEventListener("touchend", LinkStyleRemove);

    itchLogoBig.addEventListener("touchend", LinkStyleRemove);
    githubLogoBig.addEventListener("touchend", LinkStyleRemove);
    contactBig.addEventListener("touchend", LinkStyleRemove);
    resumeBig.addEventListener("touchend", LinkStyleRemove);

    nameBig.addEventListener("touchend", LinkStyleRemove);
}

function LinkStyle(e){
    // console.log(e);
    if (e.target.className === "ln" || e.target.className === "fn"){ //if children of name clicked, simply add to the name.
        nameBig.classList.add("js-navbar-links-touch");
    }
    else{
        e.target.classList.add("js-navbar-links-touch");
    }
};
function LinkStyleRemove(e){
    if (e.target.className === "ln" || e.target.className === "fn"){ //if children of name clicked, simply add to the name.
        nameBig.classList.remove("js-navbar-links-touch");
    }
    else{
        e.target.classList.remove("js-navbar-links-touch");
    }
};

