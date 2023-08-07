//0.3=========================== PDF Inline Replacer Checker ========================================
//If browser does not support in-line PDF vieweing, will link to a page with google's PDF viewer instead.

const PDFLinks = document.querySelectorAll(".PDF_link");

// console.log("navigator.pdfViewerEnabled: ", window.navigator.pdfViewerEnabled);
// const debugText = document.querySelector('.debug-text');

PDFLinks.forEach((PDFLink) => {
    if (!(window.navigator.pdfViewerEnabled) || (window.navigator.pdfViewerEnabled === "false")){ //if does not support PDF preview
        // debugText.innerHTML = "no PDF support";
        
        PDFLinks.forEach((PDFLink) => {
            PDFLink.setAttribute("href", PDFLink.dataset.pdf_alt);  //replace link to PDF with HTML which holds Google's PDF viewer.
        });
    }
    else{
        // debugText.innerHTML = "PDF support";
    };
    //For debugging: all PDF_links should have a data attribute that links to its corresponding HTML page.
    if (! ("pdf_alt" in PDFLink.dataset)){
        if (PDFLink.classList.contains("noPDF")){
            // console.log("no error");
        }
        else{
            console.error("ERROR: PDF does not have PDF ALT: ", PDFLink);
        }
    };
    //If more PDF's are added: May be better to open a modal with the PDF preview instead of having multiple HTML pages. 
        //Modal's PDF link can be replaced on click. 
});

//2.============================Burger Menu============================================
//Animation of BurgerMenu (on click) + Appearance of its menu.===========================
const burgerMenuBtn = document.querySelector('.navbar__burger-button');
const burgerMenuBtnLogo = document.querySelector('.burger');
const burgerMenu = document.querySelector('.navbar__mob-collapsible-container');
const burgerMenuChild = document.querySelector('.navbar__mob-items-container');
const resume = document.querySelector('.mob-resume');
// const itchLogo = document.querySelector('.mob-itch');
const githubLogo = document.querySelector('.mob-github');
const linkedinLogo = document.querySelector('.mob-linkedin');
// const youtubeLogo = document.querySelector('.mob-youtube');

const contact = document.querySelector('.mob-contact');

//want to make burger menu items unselectable in the beginning (since these will not be displayed on page load).
// itchLogo.tabIndex = -1;
githubLogo.tabIndex = -1;
linkedinLogo.tabIndex = -1;
// youtubeLogo.tabIndex = -1;

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

    // itchLogo.classList.add("js-navbab__itch-github-raise");
    githubLogo.classList.add("js-navbab__itch-github-raise");
    linkedinLogo.classList.add("js-navbab__itch-github-raise");
    // youtubeLogo.classList.add("js-navbab__itch-github-raise");

    // itchLogo.classList.remove("js-navbab__itch-github-collapse");
    githubLogo.classList.remove("js-navbab__itch-github-collapse");
    linkedinLogo.classList.remove("js-navbab__itch-github-collapse");
    // youtubeLogo.classList.remove("js-navbab__itch-github-collapse");

     // Dont want these to be focusable/tabbable.
    // itchLogo.classList.add("js-navbar__disable-links");
    githubLogo.classList.add("js-navbar__disable-links");
    linkedinLogo.classList.add("js-navbar__disable-links");
    // youtubeLogo.classList.add("js-navbar__disable-links");

    resume.classList.add("js-navbar__disable-links");
    contact.classList.add("js-navbar__disable-links");

    // itchLogo.tabIndex = -1;
    githubLogo.tabIndex = -1;
    linkedinLogo.tabIndex = -1;
    // youtubeLogo.tabIndex = -1;

    resume.tabIndex = -1;
    contact.tabIndex = -1;

    document.removeEventListener("click", DocumentClickListener);
};
function raiseBurgerMenu(){
    // Want these to be selectable again.
    // itchLogo.classList.remove("js-navbar__disable-links");
    githubLogo.classList.remove("js-navbar__disable-links");
    linkedinLogo.classList.remove("js-navbar__disable-links");
    // youtubeLogo.classList.remove("js-navbar__disable-links");

    resume.classList.remove("js-navbar__disable-links");
    contact.classList.remove("js-navbar__disable-links");

    // itchLogo.tabIndex = 0;
    githubLogo.tabIndex = 0;
    linkedinLogo.tabIndex = 0;
    // youtubeLogo.tabIndex = 0;

    resume.tabIndex = 0;
    contact.tabIndex = 0;


    burgerMenuBtn.classList.add("js-navbar__burger-button");
    burgerMenuBtnLogo.classList.add("js-navbar__burger-button-logo");
    burgerMenu.classList.remove("js-navbar__collapsible-container");

    // itchLogo.classList.remove("js-navbab__itch-github-raise");
    githubLogo.classList.remove("js-navbab__itch-github-raise");
    linkedinLogo.classList.remove("js-navbab__itch-github-raise");
    // youtubeLogo.classList.remove("js-navbab__itch-github-raise");


    if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
        // itchLogo.style.transitionDelay = "0.3s";
        githubLogo.style.transitionDelay = "0.3s";
        linkedinLogo.style.transitionDelay = "0.3s";
        // youtubeLogo.style.transitionDelay = "0.3s";

        // itchLogo.classList.add("js-navbab__itch-github-collapse");
        githubLogo.classList.add("js-navbab__itch-github-collapse");
        linkedinLogo.classList.add("js-navbab__itch-github-collapse");
        // youtubeLogo.classList.add("js-navbab__itch-github-collapse");

        // let delayTimer = setTimeout(() => { //require a brief timeout before scaling up.
            githubLogo.style.transitionDelay = "";
            linkedinLogo.style.transitionDelay = "";

        //     itchLogo.style.transitionDelay = "";
        //     youtubeLogo.style.transitionDelay = "";
        // }, 900);
    }

    // itchLogo.addEventListener('transitionend', mobLogosOpened); //DO NOT PLACE ON MULTIPLE LOGOS
    //When navbar is open, want to be able to close it if user clicks anywhere on the document except for within the navbar.
    document.addEventListener("click", DocumentClickListener);
};

// DO NOT PLACE ON MULTIPLE LOGOS
linkedinLogo.addEventListener('transitionend', mobLogosOpened); //no need to put on both logos, since all have the same animations.
function mobLogosOpened(){ // after logos have been transitioned, gets rid of any transition delay
    linkedinLogo.removeEventListener('transitionend', mobLogosOpened);
}


const burgerMenuChildren = document.querySelectorAll(".navbar__mob-collapsible-container *");
const burgerButtonChildren = document.querySelectorAll(".navbar__burger-button *");

//
let mobNavElements = Array.from(burgerMenuChildren);
mobNavElements = mobNavElements.concat(Array.from(burgerButtonChildren));
mobNavElements.push(burgerMenuBtn);
mobNavElements.push(burgerMenu);


function DocumentClickListener(e){
    // console.log("Clicked element!")
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
const resumeBig = document.querySelector('.resume');
// NavBar items seperator:
// const itchLogoBig = document.querySelector('.itch');
const githubLogoBig = document.querySelector('.github');
const linkedinLogoBig = document.querySelector('.linkedin');
// const youtubeLogoBig = document.querySelector('.youtube');
const contactBig = document.querySelector('.contact');
const linktreeBig = document.querySelector('.linktree');
const seperatorBig = document.querySelector('.navbar__vertical-seperator');
const parentHolderBig = document.querySelector('.navbar__collapsible-container');
// const colorModeToggle = document.querySelector('.navbar__color-mode-button');

//////////////////////////////////////////////links seperator///////////////////////////////////////////////////////////

if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
    // on mobile, set up mouse click listeners.

    // itchLogoBig.addEventListener("touchstart", ItemsAnimMob);
    githubLogoBig.addEventListener("touchstart", ItemsAnimMob);
    linkedinLogoBig.addEventListener("touchstart", ItemsAnimMob);
    // youtubeLogoBig.addEventListener("touchstart", ItemsAnimMob);
    contactBig.addEventListener("touchstart", ItemsAnimMob);
    linktreeBig.addEventListener("touchstart", ItemsAnimMob);
    resumeBig.addEventListener("touchstart", ItemsAnimMob);

}
else{
    // on desktop, set up hover listeners.
    // itchLogoBig.addEventListener("mouseenter", ItemsAnim);
    githubLogoBig.addEventListener("mouseenter", ItemsAnim);
    linkedinLogoBig.addEventListener("mouseenter", ItemsAnim);
    // youtubeLogoBig.addEventListener("mouseenter", ItemsAnim);
    contactBig.addEventListener("mouseenter", ItemsAnim);
    linktreeBig.addEventListener("mouseenter", ItemsAnim);
    resumeBig.addEventListener("mouseenter", ItemsAnim);

    // itchLogoBig.addEventListener("focusout", () => {
    //     itchLogoBigJustClicked = false;
    //     ItemsAnimMobOut()});
    // youtubeLogoBig.addEventListener("focusout", () => {
    //     githubLogoBigJustClicked = false;
    //     ItemsAnimMobOut()});

    githubLogoBig.addEventListener("focusout", () => {
        githubLogoBigJustClicked = false;
        ItemsAnimMobOut()});
    linkedinLogoBig.addEventListener("focusout", () => {
        githubLogoBigJustClicked = false;
        ItemsAnimMobOut()});
    linktreeBig.addEventListener("focusout", () => {
        githubLogoBigJustClicked = false;
        ItemsAnimMobOut()});


    contactBig.addEventListener("focusout", () => {
        contactBigJustClicked = false;
        ItemsAnimMobOut()});
    resumeBig.addEventListener("focusout", () => {
        resumeBigJustClicked = false;
        ItemsAnimMobOut()});

    ////////////////////////
    //let itchLogoBigJustClicked = false;
    let githubLogoBigJustClicked = false;
    let resumeBigJustClicked = false;
    let contactBigJustClicked = false;

    // itchLogoBig.addEventListener("mousedown", () => {
    //     itchLogoBigJustClicked = true;
    //     ItemsAnim();
    // });
    // itchLogoBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
    //     if (itchLogoBigJustClicked){itchLogoBigJustClicked = false;}
    //     else{ItemsAnim();}
    // }); 
    githubLogoBig.addEventListener("mousedown", () => {
        githubLogoBigJustClicked = true;
        ItemsAnim();
    });
    githubLogoBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (githubLogoBigJustClicked){githubLogoBigJustClicked = false;}
        else{ItemsAnim();}
    }); 
    linkedinLogoBig.addEventListener("mousedown", () => {
        githubLogoBigJustClicked = true;
        ItemsAnim();
    });
    linkedinLogoBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (githubLogoBigJustClicked){githubLogoBigJustClicked = false;}
        else{ItemsAnim();}
    });
    linktreeBig.addEventListener("mousedown", () => {
        githubLogoBigJustClicked = true;
        ItemsAnim();
    });
    linktreeBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
        if (githubLogoBigJustClicked){githubLogoBigJustClicked = false;}
        else{ItemsAnim();}
    });

    // youtubeLogoBig.addEventListener("mousedown", () => {
    //     githubLogoBigJustClicked = true;
    //     ItemsAnim();
    // });
    // youtubeLogoBig.addEventListener("focusin", () => { //runs right AFTER the mousedown function.
    //     if (githubLogoBigJustClicked){githubLogoBigJustClicked = false;}
    //     else{ItemsAnim();}
    // }); 


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
    if (! onSamsungChrome()){
        //Do not apply if in samsung chrome mobile (which sees hover: hover as true even on mobile).
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
    }
    


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

//4.============================Footer============================================
const footerEmail = document.querySelector('.footer__email-link');
const footerCurveMiddleGround = document.querySelector('.middleground');
const footerCurveBackGround = document.querySelector('.background');

if (window.matchMedia( "(hover: hover)" ).matches) { //desktop - apply waves styles.
    if (! onSamsungChrome()){
        //Do not apply if in samsung chrome mobile (which sees hover: hover as true even on mobile).
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

}

if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) { // mobile
    footerEmail.addEventListener("touchstart", () => {
        FooterEmailInteract();
        footerEmail.classList.add("js-footer__email-touch-start");
    });

    footerEmail.addEventListener("touchend", () => {
        FooterEmailInteractEnd();
        footerEmail.classList.remove("js-footer__email-touch-start");
    });

    footerEmail.addEventListener("touchcancel", () => {
        FooterEmailInteractEnd();
        footerEmail.classList.remove("js-footer__email-touch-start");
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

// touch styles
if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
    //color mode elements:
    const colorModeButton = document.querySelector('.navbar__color-mode-button');
    const Sun_outer = document.querySelector('.sun-outerCircle');
    const Sun_inner = document.querySelector('.sun-innerCircle');
    const Color_moon = document.querySelector('.moon');

    colorModeButton.addEventListener("touchstart", () => {
        colorModeButton.classList.add("js-TOUCH-navbar__color-mode-button-rotate");

        Sun_outer.classList.add("js-TOUCH-navbar__color-mode-button");
        Sun_inner.classList.add("js-TOUCH-navbar__color-mode-button");
        Color_moon.classList.add("js-TOUCH-navbar__color-mode-button");
        Color_moon.classList.add("js-TOUCH-navbar__color-mode-button-moon");
    });
    colorModeButton.addEventListener("touchend", () => {
        colorModeButton.classList.remove("js-TOUCH-navbar__color-mode-button-rotate");

        Sun_outer.classList.remove("js-TOUCH-navbar__color-mode-button");
        Sun_inner.classList.remove("js-TOUCH-navbar__color-mode-button");
        Color_moon.classList.remove("js-TOUCH-navbar__color-mode-button");
        Color_moon.classList.remove("js-TOUCH-navbar__color-mode-button-moon");
    });
    colorModeButton.addEventListener("touchcancel", () => {
        colorModeButton.classList.remove("js-TOUCH-navbar__color-mode-button-rotate");

        Sun_outer.classList.remove("js-TOUCH-navbar__color-mode-button");
        Sun_inner.classList.remove("js-TOUCH-navbar__color-mode-button");
        Color_moon.classList.remove("js-TOUCH-navbar__color-mode-button");
        Color_moon.classList.remove("js-TOUCH-navbar__color-mode-button-moon");
    });

    //burger element
    burgerMenuBtn.addEventListener("touchstart", () => {
        burgerMenuBtnLogo.classList.add("js-TOUCH-navbar__burger-button-logo");
    });
    burgerMenuBtn.addEventListener("touchend", () => {
        burgerMenuBtnLogo.classList.remove("js-TOUCH-navbar__burger-button-logo");
    });
    burgerMenuBtn.addEventListener("touchcancel", () => {
        burgerMenuBtnLogo.classList.remove("js-TOUCH-navbar__burger-button-logo");
    });
    
    //Footer circle
    const footerCircle = document.querySelector('.footer-circle');
    footerCircle.addEventListener("touchstart", () => {
        footerCircle.classList.add("js-TOUCH-footer-circle");
        // console.log("footer style!");
    });
    footerCircle.addEventListener("touchend", () => {
        footerCircle.classList.remove("js-TOUCH-footer-circle");
    });
    footerCircle.addEventListener("touchcancel", () => {
        footerCircle.classList.remove("js-TOUCH-footer-circle");
    });
}


function AddTouchForMultipleEl(el_class, style){
    document.querySelectorAll(el_class).forEach((el)=>{
        AddTouchStyle(el, style);
    });
}
function AddTouchStyle(touchElement, Touch_Style_CSS){

    touchElement.addEventListener("touchstart", () => {
        touchElement.classList.add(Touch_Style_CSS);
    });
    touchElement.addEventListener("touchend", () => {
        touchElement.classList.remove(Touch_Style_CSS);
    });
    touchElement.addEventListener("touchcancel", () => {
        touchElement.classList.remove(Touch_Style_CSS);
    });
}
//adds clickable style only for mobile: 
function addClickStyle(el_class, style){
    //only applies on touch and un-applies on re-touch.
        el_class.onclick = () =>{
            el_class.classList.toggle(style);
    }
}

//1.99: Touch styles for Project Link Buttons [downloads and itch].
if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
    /// ALL Link buttons for ALL project box 
    const ProjectLinkButtons = document.querySelectorAll(".project-link-container");
    
    ProjectLinkButtons.forEach((ProjectButton) => {
        const LinkLogo = ProjectButton.firstElementChild.firstElementChild;
        // console.log("link logo: ", LinkLogo);

        ProjectButton.addEventListener("touchstart", ()=>{
            LinkLogo.classList.add("js-project-link-svg");

            ProjectButton.classList.add("js-project-link-container");
        });
        ProjectButton.addEventListener("touchend", ()=>{
            LinkLogo.classList.remove("js-project-link-svg");

            ProjectButton.classList.remove("js-project-link-container");
        });
        ProjectButton.addEventListener("touchcancel", ()=>{
            LinkLogo.classList.remove("js-project-link-svg");

            ProjectButton.classList.remove("js-project-link-container");
        });
    });
}



// General Touch Style adder:
if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
    AddTouchForMultipleEl(".footer__link", "js-footer__link");
    AddTouchForMultipleEl(".external-link", "js-external-link");

    // AddTouchStyle(itchLogoBig, "js-navbar-links-touch");
    AddTouchStyle(githubLogoBig, "js-navbar-links-touch");
    AddTouchStyle(linkedinLogoBig, "js-navbar-links-touch");
    AddTouchStyle(linktreeBig, "js-navbar-links-touch");
    // AddTouchStyle(youtubeLogoBig, "js-navbar-links-touch");
    AddTouchStyle(contactBig, "js-navbar-links-touch");
    AddTouchStyle(resumeBig, "js-navbar-links-touch");
    AddTouchStyle(nameBig, "js-navbar-links-touch");



    AddTouchStyle(linkedinLogo, "js-navbar-links-touch");
    AddTouchStyle(githubLogo, "js-navbar-links-touch");

    // AddTouchStyle(itchLogo, "js-navbar-links-touch");
    // AddTouchStyle(youtubeLogo, "js-navbar-links-touch");
    AddTouchStyle(contact, "js-navbar-links-touch");
    AddTouchStyle(resume, "js-navbar-links-touch");
}

//Handles samsung Chrome touch styles due to a browser bug.
if (navigator.userAgentData){
    //EXPERIMENTAL FEATURE. WORKS ON CHROME.
    //CHROME ON SAMSUNG DEVICES SEEMS TO RETURN (hover: hover) AS TRUE... AND (HOVER: NONE) AS FALSE
    //This makes touch styles not apply on mobile devices, so this is a workaround for that...

    //For now: simply apply important touch styles only

    //In the future may want to be moore thorough: 
        //changes CSS to link to a CSS path which has NO hover/focus styles.
        //adds all touch above styles here:  

    if (navigator.userAgentData.mobile){

        if (! (window.matchMedia( "(hover: none)" ).matches)) {

            //Remove hover/focus styles: -> replaces the CSS with a Stylehsheet with no (hover: hover) media queries in the CSS.
            

            //fings hover.css and removes it.
            let allLinks = document.getElementsByTagNameNS('*', "link");
            allLinks = Array.from(allLinks);
            allLinks.forEach((Link => {
                const hrefAtt = Link.getAttribute('href');
                if (hrefAtt){
                    if(hrefAtt.includes("hover.css")){
                        // console.log(Link)
                        Link.remove();   
                        // alert("removing: " + hrefAtt);
                    }
                }
            }));





            // console.log("StyleSheet: ", CSSStyleSheet);

            //IMPORTANT: hover styles defined JS using (hover: hover) have also applied.
                //These are NOT removed by simply removing all (hover: hober) media queries in the CSS.
                //Instead, must get rid of them here... added a checker on all the above to ensure that they are NOT on samsung chrome (e.g., on mobile, but does not see hover: none as true).
                    //if (navigator.userAgentData){if (navigator.userAgentData.mobile){if (! (window.matchMedia( "(hover: none)" ).matches)) {return;}}}
                        //Do not apply if in samsung chrome mobile (which sees hover: hover as true even on mobile).

            //Touch styles: for all touch styles added in JS, ensure to add the touch style with the following:
                //Want to apply the touch style on samsung chrome event if hover: hover if false...
                //So check if on mobile first.
                //if (navigator.userAgentData){if (navigator.userAgentData.mobile){if (! (window.matchMedia( "(hover: none)" ).matches)) {return;}}}
        }
        else{
            // console.log("Touch styles have been applied correctly for mobile");
        }
    }
}
function onSamsungChrome(){
    if (navigator.userAgentData){if (navigator.userAgentData.mobile){if (! (window.matchMedia( "(hover: none)" ).matches)) {
        //on samsung chrome mobile:
        return true;
    }}}
    else{
        return false;
    }
}