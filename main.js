//1. =========================ColorMode Switcher===============================================
//If colorMode is stored in local storage, will get it.
let colorMode = localStorage.getItem('colorMode'); 
const scoreElement = document.querySelector('.score');


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

function toggleDarkMode () { //The Default... for now.
    //Removes lightmode style from HTML.
    localStorage.setItem('colorMode', null);
    document.querySelector('html').classList.remove('lightmode')
    
    //Hides moon logo and shows sun logo.
    document.querySelector('.sun').style.display = "flex";
    document.querySelector('.moon').style.display = "none";

    scoreElement.style.animation = "";

};
function toggleLightMode() {
    //Adds lightmode style to HTML.
    localStorage.setItem('colorMode', 'light');
    document.querySelector('html').classList.add('lightmode')

    //Hides sun logo and shows moon logo.
    document.querySelector('.moon').style.display = "flex";
    document.querySelector('.sun').style.display = "none";

    scoreElement.style.animation = "2s ease-in-out 0s infinite alternate none running glowDarkModeJS";
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

//want to make burger menu items unselectable in the beginning (since these will not be displayed on page load).
itchLogo.tabIndex = -1;
githubLogo.tabIndex = -1;
resume.tabIndex = -1;
contact.tabIndex = -1;
//

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







if (window.matchMedia( "(hover: hover)" ).matches) { //desktop - apply waves styles.
    footerEmail.addEventListener("focusin", () => {        
        FooterEmailInteract();

        footerEmail.addEventListener("focusout", function MouseEmailInteractEnd() {
            FooterEmailInteractEnd();

            footerEmail.removeEventListener("focusout", MouseEmailInteractEnd);
            footerEmail.removeEventListener("mouseleave", MouseEmailInteractEnd);
        });
    });     

    footerEmail.addEventListener("mouseenter", () => {
        if (footerEmail === document.activeElement){
            return; // do not want to add/remove elements on mouse leave IF element has focus.
        }
        FooterEmailInteract();
        footerEmail.addEventListener("mouseleave", function MouseEmailInteractEnd() {
            if (footerEmail === document.activeElement){
                return; // do not want to add/remove elements on mouse leave IF element has focus.
            }
            FooterEmailInteractEnd();
            footerEmail.removeEventListener("mouseleave", MouseEmailInteractEnd);
        });
    });
}

if (window.matchMedia( "(hover: none)" ).matches) { // mobile
    // footerEmail.addEventListener("touchend", () => {
    //     FooterEmailInteractEnd();
    //     footerEmail.classList.remove("js-footer__email-touch-start");
    // });

    // footerEmail.addEventListener("touchcancel", () => {
    //     FooterEmailInteractEnd();
    //     footerEmail.classList.remove("js-footer__email-touch-start");
    // });

    footerEmail.addEventListener("touchstart", () => {

        FooterEmailInteract();
        footerEmail.classList.add("js-footer__email-touch-start");

        let bruh = setTimeout(() => {
            footerEmail.classList.remove("js-footer__email-touch-start");

            FooterEmailInteractEnd();
        }, 400); //after 0.4 seconds
    });
}

function FooterEmailInteract() {
    // footerEmail.classList.add("js-footer__email-touch-start");

    footerCurveMiddleGround.classList.add("js-footer-middleground-hover-color");
    footerCurveBackGround.classList.add("js-footer-backgroundground-hover-color");
};
function FooterEmailInteractEnd(){
    // footerEmail.classList.remove("js-footer__email-touch-start");

    footerCurveMiddleGround.classList.remove("js-footer-middleground-hover-color");
    footerCurveBackGround.classList.remove("js-footer-backgroundground-hover-color");
} ;

//4.============================GAME============================================
const gameBoxWrapper = document.querySelector('.game-wrapper'); //Width

const gameSection = document.querySelector('.game-section'); //Height 

const gameBox = document.querySelector('.game-area');




const gameCircle = document.querySelector('.game-button');
const confettiElement = document.querySelector('.confetti-wrapper'); 


//Difficulty setter:
const difficultyCheckbox = document.querySelector('#difficulty-checkbox');

//Difficulty checkbox (want to be able to check it with the enter key)
difficultyCheckbox.onkeypress = (e) => {
    if(e.key === "Enter"){ //CHECKBOX set by defauly if space is hit so no need to check for space.
        // console.log("enter pressed?");
        difficultyCheckbox.checked = !difficultyCheckbox.checked;
    }
};

//Game set-up stuff
let gameBoxSize = [gameBox.clientWidth , gameBox.clientHeight];
let gameCircleSize = [gameCircle.offsetWidth, gameCircle.offsetHeight];
let coordArea = [gameBoxSize[0] - gameCircleSize[0], gameBoxSize[1] - gameCircleSize[1]];

//want to get size of gameArea and gameCircle agains if window resizes.
let resizeTimeOutID; //ensures that resize function does not run on EACH resize, but whenever the user stops resizing (for at least for a few ms).

window.onresize = () => {
    clearTimeout(resizeTimeOutID);
    resizeTimeOutID = setTimeout(() => {
        coordArea = calculateGameBoxArea()
        // console.log("resized new coords: ", coordArea);
        // console.log("Game Circle Size: ", gameCircleSize);
    }, 200);
};

// const debugSizeText = document.querySelector('.debug-size');

function calculateGameBoxArea(){ //whenever window size changes (and hence when gameArea changes).
    // debugSizeText.innerHTML = window.innerWidth;
    // debugSizeText.innerHTML += "  x  ";
    // debugSizeText.innerHTML += window.innerHeight;

    // console.log("window resized: ", window.outerWidth , " x ", window.outerHeight);
    // console.log("Screen height: ", screen.availHeight );


    
    document.documentElement.style.setProperty('--ScreenWidth', screen.availWidth + "px");


    if (window.matchMedia( "(hover: hover)" ).matches) {
        //desktop uses window height.
        // footerEmail.append(window.outerWidth, "x", window.innerHeight);


        document.documentElement.style.setProperty('--GameHeightJS', 75 * window.innerHeight / 100 + "px");
    }
    else{
        //mobile uses screen height.


        //check orientation first...

        // if (screen.orientation.type === "landscape-primary") //not supported in safari right now...

        document.documentElement.style.setProperty('--GameHeightJS', 75 * window.innerHeight / 100 + "px");


        if (window.matchMedia("(orientation: portrait)").matches) { //if on portrait mode
            document.documentElement.style.setProperty('--GameHeightJS', 75 * screen.availHeight  / 100 + "px");
        }
        else{
            //if in landscape mode: use width instead...
            document.documentElement.style.setProperty('--GameHeightJS', 75 * screen.availWidth  / 100 + "px");
        }

    }


    gameBoxSize = [gameBox.clientWidth , gameBox.clientHeight]; //client size = content + padding.
    gameCircleSize = [gameCircle.offsetWidth, gameCircle.offsetHeight]; //offset size = content + padding + border + margin

    //Area used to generate random coord point:
        //Since top right of the circle is the anchor point, want to ensure
            //its width and height don't go outside the game area. 
            //Simply subtracted circle's width and height from area's width and height.)
            //Coord area ensures a point is generated that DOES NOT let the circle go outside of the game area.
    return [gameBoxSize[0] - gameCircleSize[0], gameBoxSize[1] - gameCircleSize[1]];
}


//Gameplay stuff.
let score; //increment on game button click, reset to 0 on play game button click

let easyMode = false;
difficultyCheckbox.checked = true;

gameCircle.style.transitionDuration = "0s";

let lives; //set on playgame button click.
const livesElement = document.querySelector('.lives-wrapper');



let extraCircles = [];

function CreateNewCircle(Glide = false, TimerMS = null, Small = false, ToggleScale = false){
    if (TimerMS === null){TimerMS = gameCircle.getAttribute("CircleTimerMS")};

    const gameCircleDuplicate = gameCircle.cloneNode(true);
    gameCircleDuplicate.classList.remove("js-game-button-touch"); //incase it duplicated while main circle has this style...

    if (Glide){gameCircleDuplicate.style.transitionDuration = "0.5s";}
    else {gameCircleDuplicate.style.transitionDuration = "0s";}


    if (window.matchMedia( "(hover: none)" ).matches) {
        gameCircleDuplicate.ontouchstart = () => {generateRandomCoordsAndSet(null, false, gameCircleDuplicate)};
        // console.log("Mobile: touch");
    } else{
        gameCircleDuplicate.onclick = ()  => {generateRandomCoordsAndSet(null, false, gameCircleDuplicate)};
        // console.log("Desktop: click");
    }


    gameBox.appendChild(gameCircleDuplicate);

    extraCircles.push(gameCircleDuplicate);

    gameCircleDuplicate.setAttribute("CircleTimerMS", TimerMS);

    //addditional attributes
    if (Small){
        gameCircleDuplicate.style.scale = "0.75";
    }
    if (ToggleScale){
        gameCircleDuplicate.setAttribute("ToggleScale", null); //Scale will toggle on and off depending on if it has this attribute
    }

    amountOfCircles+=1; 
    gameCircleDuplicate.classList.add ("CircleNum-"+amountOfCircles);

    console.log("Created a circle!");

    startMissedTimer(gameCircleDuplicate);

    giveCircleTouchStyles(gameCircleDuplicate);
    return gameCircleDuplicate; //optional return
}

function startCircleTimer(currentCircle, CircleTimer){ //on circle appear.

    currentCircle.setAttribute("TimeoutID", setTimeout(() => {
        missedCircle(currentCircle);
    }, CircleTimer)); //timer is cleared if circle is clicked before it runs out.

    // console.log("Missed timer on Circle: ", currentCircle.className, " = ", currentCircle.getAttribute("TimeoutID"));
};
let CurrentLife = 1;
let gameLost = true;
function missedCircle(circleMissed){    //on circle timeout.
    if (CurrentLife <= 3){
        const CurrentLifeVisual = document.querySelector('.life-' + CurrentLife);
        CurrentLifeVisual.classList.add("js-Life-Off");
        CurrentLife+=1;
    }
    clearTimeout(circleMissed.getAttribute("TimeoutID"));

    if (gameLost === false){
        lives -= 1;
        console.log("missed circle: ", circleMissed.className);

        if (lives > 0){
            playAudio(Audio_HEALTH_DOWN, false, true);
        }
        else{
            if (score >= 200){
                //confetti explosion if survived until 200...
                for (count = 0; count <= 25; count++){ //repeat 10 times.
                    let randomDelay = Math.floor(Math.random() * 500 + 1);
                    let delay = setTimeout(() => {
                        confettiAtRandomPoint();
                    }, randomDelay);
                }
                playAudio(Audio_GAME_WIN, false, true, 0.5);
            }
            else{
                playAudio(Audio_GAME_LOSS, false, false, 0.1, 1.3); //aligned with game options pop-up
            }
        }
    }
    if (lives <= 0 && gameLost === false){ // game lost condition.
        console.log("game lost");
        gameLost = true;
        toggleGameBackgroundInputs(gameLost);

        //remove circle interact. Restarted on game restart (ensures circle cant be clicked if game is not started.)
        gameCircle.removeEventListener("touchstart", CircleInteract); 
        gameCircle.removeEventListener("click", CircleInteract); 

        let restartDelay = setTimeout(() => {
            startingDisplay.style.display = "flex"; //re-enable mini-game options after half a second after losing.
        }, 1577); //timed with game_loss sound.


        gameCircle.style.display = "initial";
        gameCircle.style.opacity = "0";

        //delete all extra circles here. 
        extraCircles.forEach(circle => {
            console.log("removed circle: ", circle.className);
            // console.log("removed circle: ", circle);
            gameBox.removeChild(circle);
        });
        extraCircles = [];
    }

    if (gameLost === false){
        //if not lost, generate the next circle.
        generateRandomCoordsAndSet(null, true, circleMissed);
    }
}
let currentCircleElement = gameCircle;
let currentGameCircleTimerVisual = currentCircleElement.firstElementChild;
let chanceOfGreen; //starts at 10% or 0.1f.

let increasePercentage; //resets to 0 after a certain number (5). Increases the speed at which circle's dissapear.

let oneoff = true;

let amountOfCircles = 1;
let addCircleTarget = 100;

let nextCircleGlide = false;

let alwaysGreenCircleOneOff = true;



function preventDefault(e){
    e.preventDefault();
}


const inputEater = document.querySelector('.game-input-eater');


let TouchEvents = []; //if 2 then gesture is active.
let previousPointerDiff = -1;

function toggleGameBackgroundInputs(gamelost){
    if (window.matchMedia( "(hover: none)" ).matches) {

        if (gamelost){ //on game end.
            inputEater.style.touchAction = "";

            inputEater.removeEventListener('touchend', preventDefault);
        } 

        else{ //on game start. 
            inputEater.style.touchAction = "pinch-zoom"; //only allow punch zoom... all others prevented.
            inputEater.addEventListener('touchend', preventDefault); //should stop double-tap zooming.
        }
    }
}




function CircleInteract(e) {
    generateRandomCoordsAndSet(null, false, gameCircle);
    e.preventDefault();
};
function EatInputs(e){ //called for ALL child circle elements/confettiy, etc.
    
    // console.log("ate input of: ", e);

    e.preventDefault();
}



async function getAudioBuffer(filePath){
    const AudioFile = await fetch(filePath);
    const arrayBuffer = await AudioFile.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    
    return audioBuffer;
}

let ButtonSoundIncrement = 0;
function playAudio(audioBuffer, alternate, randomPitchShift, volume = 0.1, specificPitch = null){
    //Circle sounds alternate.
    //randomPitchShift: Audio Health Down... Health Up. 100.

    const audioSource = audioCtx.createBufferSource();
    audioSource.buffer = audioBuffer;
 
    //pitch shifting...
    if (alternate){
        switch (ButtonSoundIncrement){
            case 0:
                ButtonSoundIncrement++;
                audioSource.playbackRate.value = 1 + (Math.random() * 0.1);
                break;
            case 1: 
                ButtonSoundIncrement++;
                audioSource.playbackRate.value = 1.5;
                break;
            case 2: 
                ButtonSoundIncrement++;
                audioSource.playbackRate.value = 2;
                break;
            case 3: 
                ButtonSoundIncrement++;
                audioSource.playbackRate.value = 2.5;
                break;
            case 4: 
                ButtonSoundIncrement++;
                audioSource.playbackRate.value = 2;
                break;
            case 5: 
                ButtonSoundIncrement = 0;
                audioSource.playbackRate.value = 1.5;
                break;
        }
    }
    else if (randomPitchShift){ //small pitch shift.
        audioSource.playbackRate.value = Math.random() * (1.5 - 1) + 1;
    }
    else if (specificPitch != null){
        audioSource.playbackRate.value = specificPitch;
    }

    const Audio_GainNode = new GainNode(audioCtx, {gain: volume}); // volume.
    //Audio_GainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, .01); //smoother volume change (not really needed since volume is not changing in the middle of playing the sound).

    audioSource.connect(Audio_GainNode);

    Audio_GainNode.connect(audioCtx.destination);


    audioSource.start(0); //starts at '0' by default.
}

let Audio_Circle = 0; 
let Audio_Circle_Right = 0;
let Audio_Circle_Left = 0;
let Audio_Circle_RightExtra = 0;
let Audio_Circle_LeftExtra = 0;

let Audio_100_Increment = 0;
let Audio_HEALTH_DOWN = 0;
let Audio_HEALTH_UP = 0;
let Audio_GAME_LOSS = 0;
let Audio_GAME_WIN = 0;
function setupSFX(){
    getAudioBuffer("/audio/Circle_Pop_6.mp3").then((response) => {Audio_Circle = response;});
    getAudioBuffer("/audio/Circle_Pop_6_Right.mp3").then((response) => {Audio_Circle_Right = response;});
    getAudioBuffer("/audio/Circle_Pop_6_Left.mp3").then((response) => {Audio_Circle_Left = response;});
    getAudioBuffer("/audio/Circle_Pop_6_Right_Extra.mp3").then((response) => {Audio_Circle_RightExtra = response;});
    getAudioBuffer("/audio/Circle_Pop_6_Left_Extra.mp3").then((response) => {Audio_Circle_LeftExtra = response;});

    getAudioBuffer("/audio/100_Slow_Down.mp3").then((response) => {Audio_100_Increment = response;});
    
    getAudioBuffer("/audio/Health_Down.mp3").then((response) => {Audio_HEALTH_DOWN = response;});
    getAudioBuffer("/audio/Health_Up.mp3").then((response) => {Audio_HEALTH_UP = response;});

    getAudioBuffer("/audio/Game_Over.mp3").then((response) => {Audio_GAME_LOSS = response;});
    getAudioBuffer("/audio/200_Win_2.mp3").then((response) => {Audio_GAME_WIN = response;});
}

function generateRandomCoordsAndSet(event, missed = false, ClickedCircleElement){  //on circle click + on circle missed.

    if (missed === false){
        const random3 = Math.floor(Math.random() * 4 + 1);
        switch (random3){
            case 0:
                playAudio(Audio_Circle, true, false);
                break;
            case 1:
                playAudio(Audio_Circle_Right, true, false);
                break;
            case 2:
                playAudio(Audio_Circle_Left, true, false);
                break;
            case 3:
                playAudio(Audio_Circle_RightExtra, true, false);
                break;
            case 4:
                playAudio(Audio_Circle_LeftExtra, true, false);
                break;
        }
    }

    if (score === 0){  //removes the "hit me!" text on the first hit.
        gameCircle.removeChild(gameCircle.lastChild);
    }
    else{
        //want to clear out the TimeOutID of the clicked circle. 
        clearTimeout(ClickedCircleElement.getAttribute("TimeoutID")); //ensure it is "current" and not "clicked" here.
        // console.log("Unset missed timer on: ", ClickedCircleElement.className);

    }
    currentCircleElement = ClickedCircleElement;

    let newCirclePosition = [Math.floor(Math.random() * coordArea[0] + 1), Math.floor(Math.random() * coordArea[1] + 1)];

    if (missed === false){ //update score.
        score +=1;

        if (score === 100){ //when score reaches triple digits.
            scoreElement.style.fontSize = "9ch";

            playAudio(Audio_100_Increment, false, false);
        }
        else if (score === 1000){ //when score reaches 4 digits.
            scoreElement.style.fontSize = "7ch";
        };

        scoreElement.textContent = score;
    };

    //Difficulty increases
    switch (score){
        case 15: //enable toggle scaling on first circle.
            gameCircle.setAttribute("ToggleScale", null); //toggles scaling.
            break;
        
        case 25:
            gameCircle.style.transitionDuration = "0.5s"; //makes circle glide.
            break;

        case 30:
            gameCircle.style.transitionDuration = "0s"; //Stops gliding.
            break;

        case 35:
            if (oneoff){ //since score does not increase on miss, ensure this does not run twice if missed.
                oneoff = false;
                                 //Glide = false, TimerMS = null, Small = false, ToggleScale = false
                const newCircle = CreateNewCircle(true, 4000, true, true); //glides, a lot of time before click, starts small, toggle scale.
                setCircleToRandomPoint(newCircle, [Math.floor(Math.random() * coordArea[0] + 1), Math.floor(Math.random() * coordArea[1] + 1)]);
            }
            break;

        case 100:
            if (scoreElement.style.animation === ""){
                scoreElement.style.animation = "2s ease-in-out 0s infinite alternate none running glowRainBowJS";
            }
            else{
                scoreElement.style.animation = "";
            }

            // console.log("=> SCORE ANIMATION: ", scoreElement.style.animation);

            //Want to reset Circle Timer of ALL circles.
                //loop through all circles and reset their timers.
            
            gameCircle.setAttribute("CircleTimerMS", 5000);

            extraCircles.forEach(element => {
                element.setAttribute("CircleTimerMS", 5000);
            });

            console.log("Slowed down all Circles...");
            break;
    };

    //ADD EXTRA CIRCLES...
    if (score >= 100 && extraCircles.length < 3 && score === addCircleTarget){ //initally 100. only 3 extra circles are allowed.

        let newCircle;

        if (nextCircleGlide){   //Glide = false, TimerMS = null, Small = false, ToggleScale = false           
            newCircle = CreateNewCircle(true, null, false, true);}
        else{newCircle = CreateNewCircle(false, null, false, true);}

        setCircleToRandomPoint(newCircle, [Math.floor(Math.random() * coordArea[0] + 1), Math.floor(Math.random() * coordArea[1] + 1)]);
        //
        addCircleTarget += 25; //want to add circle after each 25 score AFTER 100 is reached.
        nextCircleGlide = !nextCircleGlide;
        //
    }
    else if (extraCircles.length >= 3){
        console.log("Max Extra circles reached: ", extraCircles.length);
    }
    
    // console.log("Coords before: ", ClickedCircleElement.style.transform);

    //SHOULD BE: 100
    if (score >= 100 && ClickedCircleElement.style.transitionDuration === "0.5s"){ //for circles that do not have the glide attribute, make confetti BEFORE new position is set.
        // console.log("HAS GLIDE.");
        confettiOnSpecificCircle(ClickedCircleElement); 
    };
    setCircleToRandomPoint(ClickedCircleElement, newCirclePosition);

    // console.log("Coords after: ", ClickedCircleElement.style.transform);

    if (score >= 100 && ClickedCircleElement.style.transitionDuration === "0s"){ //for circles that do not have the glide attribute, make confetti AFTER new position is set.
        // console.log("DOESN'T HAVE GLIDE.")
        confettiOnSpecificCircle(ClickedCircleElement);
    };

    //Scaling toggle for clicked circle
    if (ClickedCircleElement.hasAttribute("ToggleScale")){
        if (ClickedCircleElement.style.scale === ""){
            ClickedCircleElement.style.scale = "0.75";
        }
        else{
            ClickedCircleElement.style.scale = "";
        }
    };

        //Green Button Check
    ClickedCircleElement.style.backgroundColor = ""; //if was green, then resets to default.
    if (ClickedCircleElement.getAttribute("isGreen") === "true" && (missed === false)){ //if is green and just hit it.
        ClickedCircleElement.setAttribute("isGreen", "false");

        if (lives < 3){ //multiple green circles can appear at once, clicking one may set it to 3, clicking the other should do nothing.
            lives += 1;
            //also need to increase lives visually
            CurrentLife-=1;
            document.querySelector('.life-' + CurrentLife).classList.remove("js-Life-Off");
            playAudio(Audio_HEALTH_UP, false, true);
        }
    }

    //difficulty decrease (to account for faster and faster circle timers)
    if (score <= 75){
        switch (score){
            case 25:
                chanceOfGreen = 0.15; //increases chance of green to 15%.
                console.log("Chance of green increased to 15%");
                break;
            case 50:
                chanceOfGreen = 0.2; //increases chance of green to 20%.
                console.log("Chance of green increased to 20%");
                break;
            case 75:
                chanceOfGreen = 0.4; //increases chance of green to 40%.
                console.log("Chance of green increased to 40%");
                break;
        };
    };

    //color change on circles after score 75.
    if (score >= 75){randomColorOnSpecificCircle(ClickedCircleElement);}

    if (lives < 3){ //can only turn green IF have less than max lives.
        const RandomFloat = Math.random(); //generates 0 - 1 float.
        if (RandomFloat <= chanceOfGreen){ // Chance of Green starts at 10% (0.1) but can change mid-game.
            console.log("Green chance met");
            ClickedCircleElement.style.backgroundColor = "#14ff00";

            ClickedCircleElement.setAttribute("isGreen", "true");

        }
    };
    //Increase speed of circle Timer.
    let circleTimerMiliSeconds = currentCircleElement.getAttribute("CircleTimerMS");

    if (easyMode){
        //east mode
        if (score >= 100){increasePercentage +=2;}
        else{increasePercentage +=1;}; //increase time faster after 100.
        
        let minimumTimer = 1500; //when under 200 score.
        if (score >= 200){
            minimumTimer = 1200;
        }
        if (circleTimerMiliSeconds >= minimumTimer && increasePercentage >= 3){
    
            increasePercentage = 0;
    
            var percent = (5 / 100) * circleTimerMiliSeconds; //gets 5% of Circle timer.
            circleTimerMiliSeconds -= percent; //subtracts 5% from circle timer.
    
            currentCircleElement.setAttribute("CircleTimerMS", circleTimerMiliSeconds);
        }
    }
    else{
        //hard mode
        if (score >= 100){increasePercentage +=4;}
        else{increasePercentage +=2;}; //increase time faster after 100.
    
        let minimumTimer = 1200; //when under 200 score.
        if (score >= 200){
            minimumTimer = 1000;
        }

        if (circleTimerMiliSeconds >= minimumTimer && increasePercentage >= 3){ //Does not allow circle timer to go below ~700 milliseconds.
    
            increasePercentage = 0;
    
            var percent = (5 / 100) * circleTimerMiliSeconds; //gets 5% of Circle timer.
            circleTimerMiliSeconds -= percent; //subtracts 5% from circle timer.
    
            currentCircleElement.setAttribute("CircleTimerMS", circleTimerMiliSeconds);
        }
    }
    //
    startMissedTimer(ClickedCircleElement);
};

function startMissedTimer(Circle){
    let circleTimerMiliSeconds = Circle.getAttribute("CircleTimerMS");

    //Start Circle Timer.
    let TimerIndicator = Circle.firstElementChild;

    // console.log(Circle.className, " timer visualizer: ", TimerIndicator);

    TimerIndicator.style.transition = "scale " + 0 + "ms";
    TimerIndicator.style.scale = "0";

    let TimerVisualDelay = setTimeout(() => { //require a brief timeout before showing timer visualizer.
        //increase visualizer
        TimerIndicator.style.transition = "scale " + circleTimerMiliSeconds + "ms linear";
        TimerIndicator.style.scale = "1";
        startCircleTimer(Circle, circleTimerMiliSeconds);
    }, 50);
};




function setCircleToRandomPoint(circleElement, Coords){
    circleElement.style.transform = "translate(" + (Coords[0]) + "px, " + (Coords[1]) + "px)";
};

function confettiAtRandomPoint(){ // for confetti on game finish after reachiong 200 score.
    let randomPoint = [Math.floor(Math.random() * coordArea[0] + 1), Math.floor(Math.random() * coordArea[1] + 1)];
    let randomScale = Math.floor(Math.random() * (2 - 1) + 1); //max = 3. Min = 1.

    const confettiElementClone = confettiElement.cloneNode(true);

    confettiElementClone.style.scale = randomScale;
    confettiElementClone.style.transform = "translate(" + (randomPoint[0]) + "px, " + (randomPoint[1]) + "px)";
    gameBox.appendChild(confettiElementClone);
    beginConfettiAnimation(confettiElementClone);
}

function randomColorOnSpecificCircle(SpecificCircle){
    let r = Math.floor(Math.random() * 255 + 1);
    let g = Math.floor(Math.random() * 255 + 1);
    let b = Math.floor(Math.random() * 255 + 1);

    SpecificCircle.style.backgroundColor = "rgb(" + r + "," + g +"," + b +")";
}

function confettiOnSpecificCircle(SpecificCircle){
    const confettiElementClone = confettiElement.cloneNode(true);

    confettiElementClone.style.transform = SpecificCircle.style.transform;
    // console.log("confetti set to: ", confettiElementClone.style.transform);

    confettiElementClone.style.scale = SpecificCircle.style.scale;

    if (SpecificCircle.hasAttribute("ToggleScale") && SpecificCircle.style.transitionDuration === "0s"){
        if (SpecificCircle.style.scale === "0.75"){
            confettiElementClone.style.scale = "1";
        }
        else{
            confettiElementClone.style.scale = "0.75";
        };
    };

    gameBox.appendChild(confettiElementClone);
    beginConfettiAnimation(confettiElementClone);
}

function beginConfettiAnimation (confettiElementClone){
    //Begin confetti Element Animation.
    confettiElementClone.children[0].style.display = "unset";

    for (let i = 0; i < confettiElementClone.children[0].children.length; i++) {
        const confetti = confettiElementClone.children[0].children[i];

        const confettiRotation = Math.floor(Math.random() * 360 + 1); //0 - 360//

        confetti.style.rotate = confettiRotation + "deg";
        const hold = setTimeout(() => {
            confetti.style.transform = "translateY(4ch)"; //starts a transition. 
            confetti.style.opacity = "0"; //starts a transtion

            //want to give each a randomized color.

            let r = Math.floor(Math.random() * 255 + 1);
            let g = Math.floor(Math.random() * 255 + 1);
            let b = Math.floor(Math.random() * 255 + 1);
            confetti.style.backgroundColor = "rgb(" + r + "," + g +"," + b +")";
        
        }, 100); //need to hold for a moment to let animation play.
    }
    const deleteTimer = setTimeout(() => {
        confettiElementClone.remove();
        
    } ,550); //0.5s is when animation ends.
};

//Game display button
const gameStart = document.querySelector('.game__start');
const startingDisplay = document.querySelector('.starting__options');

gameStart.onclick = () => {
    score = 0;
    scoreElement.textContent = score;
    document.querySelector('.score').style.fontSize = "14ch"
    
    startingDisplay.style.display = "none";
    gameBox.style.display = "flex";

    coordArea = calculateGameBoxArea();
    console.log("resized game area: ", coordArea);
    console.log("Game Circle Size: ", gameCircleSize)

    lives = 3;

    gameCircle.style.opacity = "1";
    scoreElement.style.opacity = "1";
    livesElement.style.opacity = "1";

    CurrentLife = 1;
    document.querySelector('.life-1').classList.remove("js-Life-Off");
    document.querySelector('.life-2').classList.remove("js-Life-Off");
    document.querySelector('.life-3').classList.remove("js-Life-Off");

    currentCircleElement = gameCircle;
    currentGameCircleTimerVisual = currentCircleElement.firstElementChild;

    currentGameCircleTimerVisual.style.transition = "scale " + 0 + "ms";
    currentGameCircleTimerVisual.style.scale = "0";

        //Delete all new circles. Reset circle timer on first circles.
    gameCircle.setAttribute("CircleTimerMS", 2000);
    gameCircle.style.transitionDuration = "0s"; //Ensures first circle does not glide in the beginning.
    gameCircle.style.transform = "translate(3.7em, 9em)"; //re-centers circle.

    increasePercentage = 0;
    amountOfCircles = 1;
    addCircleTarget = 100;
    nextCircleGlide = false;

    gameLost = false;
    //scroll up...

    // window.scrollTo(0, 0);
    window.scrollTo({top: 0, behavior: "smooth"});


    toggleGameBackgroundInputs(gameLost);



    oneoff = true;
    alwaysGreenCircleOneOff = true;
    ButtonSoundIncrement = 0;

    currentCircleElement.style.backgroundColor = "";
    chanceOfGreen = 0.1;
    gameCircle.removeAttribute("isGreen");

    gameCircle.style.scale = "";

    gameCircle.append("HIT ME!"); //adds hit me as text on the game button to notify the user. is removed on the first hit.




    //Make circle interactable...
    if (window.matchMedia( "(hover: none)" ).matches) {
        // gameCircle.ontouchstart = () => {generateRandomCoordsAndSet(null, false, gameCircle)};
        gameCircle.addEventListener("touchstart", CircleInteract); 
        // console.log("Mobile: touch");
    } else{
        // gameCircle.onclick = () => {generateRandomCoordsAndSet(null, false, gameCircle)};
        gameCircle.addEventListener("click", CircleInteract); 
        // console.log("Desktop: click");
    };
    
    console.log("Running slow mode:", easyMode);
};
///
const hi_message = document.querySelector('.starting__options-hi-message');
const hi_messageButton = document.querySelector('.hi__message-game');
const hi_messageArrow = document.querySelector('.hi__message-arrow-game');
const starting_options = document.querySelector('.starting__options-selections');

gameStart.tabIndex = -1;
difficultyCheckbox.tabIndex = -1;
const scrollDown = document.querySelector('.scroll__down');
scrollDown.tabIndex = -1;
///
let audioCtx = null;
hi_messageButton.onclick = () =>{
    if (audioCtx === null){
        // console.log("AudioContect started...");
        audioCtx = new AudioContext();

        setupSFX();
    }
    //
    if (hi_message.style.transform === "translateY(0ch)"){ //turn off
        hi_message.style.transform = "translateY(5ch)";
        starting_options.style.scale = "0";

        //ensure scaled down buttons CANNOT be tabbed into!
        gameStart.tabIndex = -1;
        difficultyCheckbox.tabIndex = -1;
        scrollDown.tabIndex = -1;

        hi_message.style.color = "";
        hi_messageArrow.style.color = "";
        hi_messageButton.style.color = "";
    }
    else{ //turn on 
        hi_message.style.transform = "translateY(0ch)";
        starting_options.style.scale = "1";

        //ensure scaled up buttons CAN be tabbed into!
        gameStart.tabIndex = 0;
        difficultyCheckbox.tabIndex = 0;
        scrollDown.tabIndex = 0;
    }
};
//hard mode or easy mode selected.
difficultyCheckbox.onchange = () => { 
    if (difficultyCheckbox.checked === true){ //hard mode selected
        easyMode = false;
        gameCircle.style.transitionDuration = "0s";
    }
    else{                           //easy mode selected
        easyMode = true;
        gameCircle.style.transitionDuration = "0.5s";
    }
};

//Game-Touch Event Styles
giveCircleTouchStyles(gameCircle);

function giveCircleTouchStyles(circleElement){ //also called on each new circle addition.
    if (window.matchMedia( "(hover: none)" ).matches) {
        circleElement.addEventListener("touchstart", ()=> {
            circleElement.classList.add("js-game-button-touch");
            const TouchYellowDelay = setTimeout(() => { //require a brief timeout before showing timer visualizer.
                circleElement.classList.remove("js-game-button-touch");

            }, 200);
        });
    }
}