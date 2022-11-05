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
const burgerMenuBtnLogo = document.querySelector('.burger');
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
    burgerMenuBtnLogo.classList.remove("js-navbar__burger-button-logo");
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
    burgerMenuBtnLogo.classList.add("js-navbar__burger-button-logo");
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
        // console.log("NavBar not clicked... Must close.");
        collapseBurgerMenu();
        burgerMenuFlipped = !burgerMenuFlipped;
    }
};
//3.============================NavBar dots anim on on desktop and mobile============================================

// NAME seperator (small screens only):
const nameBig = document.querySelector('.navbar__home');
const nameSeperator = document.querySelector('.navbar__vertical-name-seperator');

// NavBar items seperator:
const itchLogoBig = document.querySelector('.itch');
const githubLogoBig = document.querySelector('.github');
const contactBig = document.querySelector('.contact');
const resumeBig = document.querySelector('.resume');
const seperatorBig = document.querySelector('.navbar__vertical-seperator');
const parentHolderBig = document.querySelector('.navbar__collapsible-container');
// const colorModeToggle = document.querySelector('.navbar__color-mode-button');

//////////////////////////////////////////////links seperator///////////////////////////////////////////////////////////
if (window.matchMedia( "(hover: none)" ).matches) {
    // on mobile, set up mouse click listeners.

    itchLogoBig.addEventListener("touchstart", ItemsAnimMob);
    githubLogoBig.addEventListener("touchstart", ItemsAnimMob);
    contactBig.addEventListener("touchstart", ItemsAnimMob);
    resumeBig.addEventListener("touchstart", ItemsAnimMob);

}
else{
    // on desktop, set up hover listeners.
    itchLogoBig.addEventListener("mouseenter", ItemsAnim);
    githubLogoBig.addEventListener("mouseenter", ItemsAnim);
    contactBig.addEventListener("mouseenter", ItemsAnim);
    resumeBig.addEventListener("mouseenter", ItemsAnim);

    itchLogoBig.addEventListener("focusout", () => {
        itchLogoBigJustClicked = false;
        ItemsAnimMobOut()});
    githubLogoBig.addEventListener("focusout", () => {
        githubLogoBigJustClicked = false;
        ItemsAnimMobOut()});
    contactBig.addEventListener("focusout", () => {
        contactBigJustClicked = false;
        ItemsAnimMobOut()});
    resumeBig.addEventListener("focusout", () => {
        resumeBigJustClicked = false;
        ItemsAnimMobOut()});

    ////////////////////////
    let itchLogoBigJustClicked = false;
    let githubLogoBigJustClicked = false;
    let resumeBigJustClicked = false;
    let contactBigJustClicked = false;

    itchLogoBig.addEventListener("mousedown", () => {
        itchLogoBigJustClicked = true;
        ItemsAnim();
    });
    itchLogoBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (itchLogoBigJustClicked){itchLogoBigJustClicked = false;}
        else{ItemsAnim();}
    }); 
    githubLogoBig.addEventListener("mousedown", () => {
        githubLogoBigJustClicked = true;
        ItemsAnim();
    });
    githubLogoBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (githubLogoBigJustClicked){githubLogoBigJustClicked = false;}
        else{ItemsAnim();}
    }); 
    resumeBig.addEventListener("mousedown", () => {
        resumeBigJustClicked = true;
        ItemsAnim();
    });
    resumeBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (resumeBigJustClicked){resumeBigJustClicked = false;}
        else{ItemsAnim();}
    }); 
    contactBig.addEventListener("mousedown", () => {
        contactBigJustClicked = true;
        ItemsAnim();
    });
    contactBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (contactBigJustClicked){contactBigJustClicked = false;}
        else{ItemsAnim();}
    }); 
    parentHolderBig.addEventListener("mouseleave", ItemsAnimMobOut);

    function ItemsAnimMobOut(){
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-up");
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-down");
    }
    //Desktop:
    let deskUp = true;
    function ItemsAnim(){
        if (deskUp){
            seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-down");
            seperatorBig.classList.add("js-navbar-vertical-seperator-trans-up");
        }
        else{
            seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-up");
            seperatorBig.classList.add("js-navbar-vertical-seperator-trans-down");
        }
        deskUp = !deskUp;
    };
};

//Touch only:
let up = true;
let timeoutIDNav;
function ItemsAnimMob(){ //when a link is touched, plays either of these animations.
    clearTimeout(timeoutIDNav);
    if (up){
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-down");
        seperatorBig.classList.add("js-navbar-vertical-seperator-trans-up");
        
        
        timeoutIDNav = setTimeout(() => {
            seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-up");
        }, 400); //after 0.x seconds
        up = false;

    }
    else{
        seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-up");
        seperatorBig.classList.add("js-navbar-vertical-seperator-trans-down");

        timeoutIDNav = setTimeout(() => {
            seperatorBig.classList.remove("js-navbar-vertical-seperator-trans-down");
        }, 400); //after 0.x seconds
        up = true;
    }
};
//////////////////////////////////////////////name seperator///////////////////////////////////////////////////////////
//For big dots next to name:
let left = true;
let timeoutIDName = null;
//touchout not needed since its on a timer.

nameBig.addEventListener("touchstart", nameSeperatorAnimationTouch); 

//For touching:
function nameSeperatorAnimationTouch() {
    //must check if seperator is even visible first (on larger screens, it may not be).
    //Element that enables animations is always visible so must ensure the seperator is visible along with it before anims can run.
    //UInlike for the links seperator, whose enabler is alwaysd visible ALONG WITH the seperator.
    if (window.getComputedStyle(nameSeperator).display === "none"){
        return;
    }
    clearTimeout(timeoutIDName);
    if (left){
        nameSeperator.classList.remove("js-navbar-name-seperator-trans-left");
        nameSeperator.classList.add("js-navbar-name-seperator-trans-right");
        left = false;
        
        timeoutIDName = setTimeout(() => {
            nameSeperator.classList.remove("js-navbar-name-seperator-trans-right");
        }, 400); //after 0.4 seconds
    }
    else{
        nameSeperator.classList.remove("js-navbar-name-seperator-trans-right");
        nameSeperator.classList.add("js-navbar-name-seperator-trans-left");

        timeoutIDName = setTimeout(() => {
            nameSeperator.classList.remove("js-navbar-name-seperator-trans-left");
        }, 400); //after 0.4 seconds
        left = true;
    }
}





//for tabbing + clicking + hovering:
if (window.matchMedia("(hover: hover)").matches) { //Device has hover (i.e., not mobile).
        //hover effects
    nameBig.addEventListener("mouseenter", nameSeperatorAnimationHoverIn);
    nameBig.addEventListener("mouseleave", nameSeperatorAnimationHoverOut);

    let nameJustClicked = false;

    nameBig.addEventListener("focusout", () => {
        nameJustClicked = false;
        nameSeperatorAnimationHoverOut();
    });
    nameBig.addEventListener("mousedown", () => {
        nameJustClicked = true;
        nameSeperatorAnimationHoverIn();
    });
    nameBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (nameJustClicked === true){
            nameJustClicked = false;
        }
        else{
            nameSeperatorAnimationHoverIn();
        }
    }); 

    function nameSeperatorAnimationHoverIn(){
        if (window.getComputedStyle(nameSeperator).display === "none"){
            return;
        }
        //on hover or on focus visible:
        if (left){
            left = false;
            nameSeperator.classList.remove("js-navbar-name-seperator-trans-left");
            nameSeperator.classList.add("js-navbar-name-seperator-trans-right");
        }
        else{
            left = true;    
            nameSeperator.classList.remove("js-navbar-name-seperator-trans-right");
            nameSeperator.classList.add("js-navbar-name-seperator-trans-left");
        }
    }
    function nameSeperatorAnimationHoverOut(){  
        if (window.getComputedStyle(nameSeperator).display === "none"){
            return;
        }
        nameSeperator.classList.remove("js-navbar-name-seperator-trans-left");
        nameSeperator.classList.remove("js-navbar-name-seperator-trans-right");
    }
}


//3.============================Mobile Link Styles on Touch (navbar)============================================
///////////hover color on touch - no animations included here.//
if (window.matchMedia( "(hover: none)" ).matches) {  // on mobile, set up mouse click listners.
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
    //
    itchLogo.addEventListener("touchcancel", LinkStyleRemove);
    githubLogo.addEventListener("touchcancel", LinkStyleRemove);
    contact.addEventListener("touchcancel", LinkStyleRemove);
    resume.addEventListener("touchcancel", LinkStyleRemove);

    itchLogoBig.addEventListener("touchcancel", LinkStyleRemove);
    githubLogoBig.addEventListener("touchcancel", LinkStyleRemove);
    contactBig.addEventListener("touchcancel", LinkStyleRemove);
    resumeBig.addEventListener("touchcancel", LinkStyleRemove);

    nameBig.addEventListener("touchcancel", LinkStyleRemove);
}
let StyledElement = null;

function LinkStyle(e){
    // console.log(e);
    if (e.target.className === "ln" || e.target.className === "fn"){ //if children of name clicked, simply add to the name.
        nameBig.classList.add("js-navbar-links-touch");
        StyledElement = nameBig;
    }
    else{
        e.target.classList.add("js-navbar-links-touch");
        StyledElement = e.target; 
    }
};
function LinkStyleRemove(){
    if (StyledElement != null){
        StyledElement.classList.remove("js-navbar-links-touch");
        StyledElement = null;
    }
};


//4.============================Footer============================================
const footerEmail = document.querySelector('.footer__email-link');
const footerCurveMiddleGround = document.querySelector('.middleground');
const footerCurveBackGround = document.querySelector('.background');


footerEmail.addEventListener("mouseenter", () => {
    footerCurveMiddleGround.classList.add("js-footer-middleground-hover-color");
    footerCurveBackGround.classList.add("js-footer-backgroundground-hover-color");
    
    footerEmail.addEventListener("mouseleave", function footerMouseExitFunction() {
        footerEmail.removeEventListener("mouseleave", footerMouseExitFunction);

        footerCurveMiddleGround.classList.remove("js-footer-middleground-hover-color");
        footerCurveBackGround.classList.remove("js-footer-backgroundground-hover-color");
    })
})

