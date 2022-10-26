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
const burgerMenu = document.querySelector('.navbar__collapsible-container');

const itchLogo = document.querySelector('.itch');
const githubLogo = document.querySelector('.github');

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
};
function raiseBurgerMenu(){
    burgerMenuBtn.classList.add("js-navbar__burger-button");

    burgerMenu.classList.remove("js-navbar__collapsible-container");

    itchLogo.classList.remove("js-navbab__itch-github-raise");
    githubLogo.classList.remove("js-navbab__itch-github-raise");

    itchLogo.classList.add("js-navbab__itch-github-collapse");
    githubLogo.classList.add("js-navbab__itch-github-collapse");
};

let small = null;
resizeIsDone()
//If window size changes past threshold WHILE Mobile/Small-screen classes are added.
document.body.onresize =()=>{
    resizeIsDone();
};

function resizeIsDone(){
    //Window is smaller than 600px.
    if (window.matchMedia("(min-width: 600px)").matches && small !== true){
        small = true;

        // console.log("Big");

        //On big: must show navLinks no matter what. 

        burgerMenu.classList.remove("js-navbar__collapsible-container-expansion");

        burgerMenu.classList.remove("js-navbar__collapsible-container");
        itchLogo.classList.remove("js-navbab__itch-github-raise");
        githubLogo.classList.remove("js-navbab__itch-github-raise");


        //Button must be unflipped when it turns small.
        if (burgerMenuFlipped === true){
            burgerMenuFlipped = false;

            burgerMenuBtn.classList.remove("js-navbar__burger-button");            

            itchLogo.classList.add("js-navbab__itch-github-collapse");
            githubLogo.classList.add("js-navbab__itch-github-collapse");
        }

    }
     //Window is bigger than 600px.
    else if (window.matchMedia("(max-width: 600px)").matches && small !== false){
        small = false;

        // console.log("Small");

        //On small: must show ONLY if button is flipped. If not flipped, then hide (default is show at if this point in the code is reached so no need to check for show condition).
        if (burgerMenuFlipped === false){

            burgerMenu.classList.add("js-navbar__collapsible-container-expansion"); //Makes transistions duration take 0 time.

            burgerMenu.classList.add("js-navbar__collapsible-container");
            itchLogo.classList.add("js-navbab__itch-github-raise");
            githubLogo.classList.add("js-navbab__itch-github-raise");
        }
    }
};
