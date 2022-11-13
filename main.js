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
let coordArea;

//want to get size of gameArea and gameCircle agains if window resizes.
let resizeTimeOutID; //ensures that resize function does not run on EACH resize, but whenever the user stops resizing (for at least for a few ms).
gameBox.addEventListener("resize", () => {
    clearTimeout(resizeTimeOutID);

    resizeTimeOutID = setTimeout(() => {
        gameBoxSize = [gameBox.clientWidth , gameBox.clientHeight]; //client size = content + padding.
        gameCircleSize = [gameCircle.offsetWidth, gameCircle.offsetHeight]; //offset size = content + padding + border + margin

        //Area used to generate random coord point:
            //Since top right of the circle is the anchor point, want to ensure
                //its width and height don't go outside the game area. 
                //Simply subtracted circle's width and height from area's width and height.)
                //Coord area ensures a point is generated that DOES NOT let the circle go outside of the game area.
        coordArea = [gameBoxSize[0] - gameCircleSize[0], gameBoxSize[1] - gameCircleSize[1]];

        console.log("resized new coords: ", coordArea);

    }, 150);
});

//Gameplay stuff.
let easyMode = false;
let score; //increment on game button click, reset to 0 on play game button click
let lives; //set on playgame button click.
const scoreElement = document.querySelector('.score');
const livesElement = document.querySelector('.lives-wrapper');

const gameCircleDuplicate = gameCircle.cloneNode(true); //can have multiple game circles



gameBox.appendChild(gameCircleDuplicate);
gameCircleDuplicate.style.display = "none";
gameCircleDuplicate.style.opacity = "1"; //duplication also copies inital opacity value so must reset it to 1.

gameCircle.onclick = generateRandomCoordsAndSet;
gameCircleDuplicate.onclick = generateRandomCoordsAndSet;

let currentCircleTimer = null;
let circleTimerMiliSeconds;
function startCircleTimer(){ //on circle appear.
    if (easyMode === true){
        //want to wait until the transition of the circle moving to its new location is over.
        //This is set to take 0.5s in CSS.

        let EasyModeWaitTime = setTimeout(()=>{console.log("easy mode wait")}, 500); //500ms = 0.5s. //does nothing and then excudtes code below this if statemwent.
    };

    currentCircleTimer = setTimeout(() => {
        missedCircle();

    }, circleTimerMiliSeconds); //timer is cleared if circle is clicked before it runs out.
};

let CurrentLife = 1;
function missedCircle(){    //on circle timeout.
    if (CurrentLife <= 3){
        const CurrentLifeVisual = document.querySelector('.life-' + CurrentLife);
        CurrentLifeVisual.classList.add("js-Life-Off");
        CurrentLife+=1;
    }

    lives -= 1;
    console.log("missed circle");
    clearTimeout(currentCircleTimer);
    currentCircleIsGreen = false; 

    if (lives <= 0){
        console.log("game lost");
        startingDisplay.style.display = "flex";

        gameCircle.style.display = "initial";
        gameCircle.style.opacity = "0";
        gameCircleDuplicate.style.display = "none";
    }
    else{
        //if not lost, generate the next circle.
        generateRandomCoordsAndSet(null, true);
    }
}
let currentCircleElement = gameCircle;
let currentGameCircleTimerVisual = currentCircleElement.firstElementChild;
let chanceOfGreen; //starts at 10% or 0.1f.
let currentCircleIsGreen; // is false

let increasePercentage; //resets to 0 after a certain number (5). Increases the speed at which circle's dissapear.
function generateRandomCoordsAndSet(event, missed = false){  //on circle click + on circle missed.
    if (score === 0){  //removes the "hit me!" text on the first hit.
        gameCircle.removeChild(gameCircle.lastChild);
    }

    clearTimeout(currentCircleTimer);

    let newCirclePosition = [Math.floor(Math.random() * coordArea[0] + 1), Math.floor(Math.random() * coordArea[1] + 1)];

    // console.log("circle position: ", newCirclePosition);

    if (missed === false){
        console.log("not missed");
        score +=1;
        scoreElement.textContent  = score;
    }


    if (easyMode){
        setCircleToRandomPoint(gameCircle, newCirclePosition);
    }
    else{
        if (gameCircle.style.display === "none"){ //display gameCircle 1. Hide 2.
            gameCircleDuplicate.style.display = "none";
            //set game Circle 1 to random point before displaying.
            setCircleToRandomPoint(gameCircle, newCirclePosition);
            gameCircle.style.display = "initial"; //set to inital to display.

            currentCircleElement = gameCircle;
        }
        else{                                     //display gameCircle 2. Hide 1.
            gameCircle.style.display = "none";
            setCircleToRandomPoint(gameCircleDuplicate, newCirclePosition);
            gameCircleDuplicate.style.display = "initial";

            currentCircleElement = gameCircleDuplicate;
        }
    }

    if (score === 100){ //when score reaches triple digits.
        scoreElement.style.fontSize = "9ch";
    }
    else if (score === 1000){ //when score reaches 4 digits.
        scoreElement.style.fontSize = "7ch";
    };


    //Green Button Check
    currentCircleElement.style.backgroundColor = ""; //if was green, then resets to default.

    if (currentCircleIsGreen){ //if is green and just hit it.
        currentCircleIsGreen = false;
        lives += 1;
        console.log("Hit green circle");
        //also need to increase lives visually
        CurrentLife-=1;
        document.querySelector('.life-' + CurrentLife).classList.remove("js-Life-Off");
    };

    if (score < 75){
        if (score === 25){
            chanceOfGreen = 0.15; //increases chance of green to 15%.
            console.log("Chance of green increased to 15%");

            //also want to make second circle SMALL at 50 score.
            gameCircleDuplicate.style.scale = "0.75";
        }
        else if (score === 50){
            chanceOfGreen = 0.2; //increases chance of green to 20%.
            console.log("Chance of green increased to 20%");
        }
        else if (score === 75){
            chanceOfGreen = 0.4; //increases chance of green to 40%.
            console.log("Chance of green increased to 40%");
        };
    };
    if (score >= 0){ //SHOULD BE 100!!!! NOT 0!!! JUST TESTING...
        if (score === 100){ //changes score glow.
            scoreElement.style.animation = "glowRainBowJS 2s ease-in-out infinite alternate";

            //Want to reset Circle Timer.
            circleTimerMiliSeconds = 1000;

            //Want to add a third circle. Which now appears ALONG SIDE the other circles.
        }
        confettiOnCurrentCircle();
    }



    if (lives < 3){ //can only turn green IF have less than max lives.
        const RandomFloat = Math.random(); //generates 0 - 1 float.
        if (RandomFloat <= chanceOfGreen){ // Chance of Green starts at 10% (0.1) but can change mid-game.
            console.log("Green chance met");
            currentCircleElement.style.backgroundColor = "green";

            currentCircleIsGreen = true;
        }
    };


    //Increase speed of circke Timer.
    increasePercentage +=1;

    if (circleTimerMiliSeconds >= 600 && increasePercentage >= 5){ //Does not allow circle timer to go below ~600 milliseconds.
        increasePercentage = 0;

        var percent = (5 / 100) * circleTimerMiliSeconds; //gets 5% of Circle timer.
        circleTimerMiliSeconds -= percent; //subtracts 5% from circle timer.
        console.log("Circle Timer: ", circleTimerMiliSeconds);
    };


    //Circle Timer Visualizer.
    currentGameCircleTimerVisual = currentCircleElement.firstElementChild;

    currentGameCircleTimerVisual.style.transition = "scale " + 0 + "ms";
    currentGameCircleTimerVisual.style.scale = "0";
    currentCircleTimer = setTimeout(() => { //require a breif timeout before showing timer visualizer.
        //increase visualizer
        currentGameCircleTimerVisual.style.transition = "scale " + circleTimerMiliSeconds + "ms linear";
        currentGameCircleTimerVisual.style.scale = "1";
        startCircleTimer();
    }, 50); //delay timer can be anyting above 0.
}



function setCircleToRandomPoint(circleElement, Coords){
    circleElement.style.transform = "translate(" + (Coords[0]) + "px, " + (Coords[1]) + "px)";
};

function confettiOnCurrentCircle(){
    //ALSO want to chance the circle's color
    const r = Math.floor(Math.random() * 255 + 1);
    const g = Math.floor(Math.random() * 255 + 1);
    const b = Math.floor(Math.random() * 255 + 1);

    currentCircleElement.style.backgroundColor = "rgb(" + r + "," + g +"," + b +")";

    const confettiElementClone = confettiElement.cloneNode(true);
    confettiElementClone.style.transform = currentCircleElement.style.transform;


    confettiElementClone.style.scale = currentCircleElement.style.scale;
    // confettiElementClone.style.scale = currentCircleElement.style.scale;

    gameBox.appendChild(confettiElementClone);
    

    confettiElementClone.children[0].style.display = "unset";

    for (let i = 0; i < confettiElementClone.children[0].children.length; i++) {
        const confetti = confettiElementClone.children[0].children[i];

        const confettiRotation = Math.floor(Math.random() * 360 + 1); //0 - 360//

        confetti.style.rotate = confettiRotation + "deg";
        const hold = setTimeout(() => {
            confetti.style.transform = "translateY(4ch)"; //starts a transition. 
            confetti.style.opacity = "0"; //starts a transtion

            //want to give each a randomized color.
            confetti.style.backgroundColor = "rgb(" + r + "," + g +"," + b +")";
            r = Math.floor(Math.random() * 255 + 1);
            g = Math.floor(Math.random() * 255 + 1);
            b = Math.floor(Math.random() * 255 + 1);
        
        }, 100); //need to hold for a moment to let animation play.
    }
    
    


    const deleteTimer = setTimeout(() => {
        confettiElementClone.remove();
        
    } ,550); //0.5s is when animation ends.
};





//Game UI stuff:
//Game display button
const gameStart = document.querySelector('.game__start');
const startingDisplay = document.querySelector('.starting__options');

gameStart.onclick = () => {
    score = 0;
    scoreElement.textContent  = score;
    document.querySelector('.score').style.fontSize = "14ch"
    
    startingDisplay.style.display = "none";
    gameBox.style.display = "flex";

    coordArea = [gameBoxSize[0] - gameCircleSize[0], gameBoxSize[1] - gameCircleSize[1]];
    console.log("resized new coords: ", coordArea);

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

    circleTimerMiliSeconds = 1000;
    increasePercentage = 0;

    currentCircleElement.style.backgroundColor = "";
    chanceOfGreen = 0.1;
    currentCircleIsGreen = false;
    //
    gameCircleDuplicate.style.scale = "";
    // scoreElement.style.animation = "";

    gameCircle.append("hit me!"); //adds hit me as text on the game button to notify the user. is removed on the first hit.
};


const hi_message = document.querySelector('.starting__options-hi-message');
const starting_options = document.querySelector('.starting__options-selections');

gameStart.tabIndex = -1;
difficultyCheckbox.tabIndex = -1;
const scrollDown = document.querySelector('.scroll__down');
scrollDown.tabIndex = -1;

hi_message.onclick = () =>{
    if (hi_message.style.transform === "translateY(0ch)"){ //turn off
        hi_message.style.transform = "translateY(5ch)";
        starting_options.style.scale = "0";

        //ensure scaled down buttons CANNOT be tabbed into!
        gameStart.tabIndex = -1;
        difficultyCheckbox.tabIndex = -1;
        scrollDown.tabIndex = -1;

        // gameCircle.style.opacity = "0";
        // scoreElement.style.opacity = "0";

    }
    else{ //turn on 
        hi_message.style.transform = "translateY(0ch)";
        starting_options.style.scale = "1";

        //ensure scaled up buttons CAN be tabbed into!
        gameStart.tabIndex = 0;
        difficultyCheckbox.tabIndex = 0;
        scrollDown.tabIndex = 0;

        // gameCircle.style.opacity = "1";
        // scoreElement.style.opacity = "1";
    }
};

//hard mode or easy mode selected.
difficultyCheckbox.onchange = () => { 
    if (difficultyCheckbox.checked === true){ //hard mode selected
        easyMode = false;
    }
    else{                           //easy mode selected
        easyMode = true;
        gameCircleDuplicate.style.display = "none";
        gameCircle.style.display = "initial"
    }
};