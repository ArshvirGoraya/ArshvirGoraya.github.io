//1. =========================ColorMode Switcher===============================================
//If colorMode is stored in local storage, will get it.
let colorMode = localStorage.getItem('colorMode'); 
let removedLightModeStyle = false;

if (colorMode === 'light'){ //Default is dark mode, so if light was saved in local storage, must change to light.
    toggleLightMode();
    // console.log("light mode toggled");
    SetColorLogo();
}
else{
    toggleDarkMode();
    SetColorLogo();
    // console.log("dark mode toggled");
}

function toggleColorMode(){ //called by in-line html.
    if (colorMode === "light"){ 
        toggleDarkMode();
        SetColorLogo();
    }
    else{ //runs first time button is clicked. Default is dark. Will turn to light. 
        toggleLightMode();
        SetColorLogo();
    }
    colorMode = localStorage.getItem('colorMode'); 
    // console.log(colorMode);
};

function toggleDarkMode () { //The Default... for now.
    //Removes lightmode style from HTML.

    removedLightModeStyle = true;

    localStorage.setItem('colorMode', null);
    document.querySelector('html').classList.remove('lightmode')
};

function toggleLightMode() {
    removedLightModeStyle = false;

    //Adds lightmode style to HTML.
    localStorage.setItem('colorMode', 'light');
    document.querySelector('html').classList.add('lightmode')
};

function SetColorLogo(){ //defered potion of color mode which switches : 
    const scoreElement = document.querySelector('.score');

    if (removedLightModeStyle){
        //Hides moon logo and shows sun logo.
        if (window.matchMedia( "(prefers-color-scheme: dark)" ).matches) {


            if (scoreElement){
                scoreElement.style.animation = "2s ease-in-out 0s infinite alternate none running glowDarkModeJS";
            }
        }
        else{


            if (scoreElement){
                scoreElement.style.animation = "";
            }
        }
    }
    else{
        //Hides sun logo and shows moon logo.
        if (window.matchMedia( "(prefers-color-scheme: dark)" ).matches) {

            if (scoreElement){
                scoreElement.style.animation = "";
            }        
        }
        else{

            if (scoreElement){
                scoreElement.style.animation = "2s ease-in-out 0s infinite alternate none running glowDarkModeJS";
            }
        }
    }
}


