//0.5.========================== Main Wrapper ========================================
const scrollDown = document.querySelector('.scroll__down');
const gameStart = document.querySelector('.game__start'); 


// let mainClicked = localStorage.getItem('mainClicked'); 

// const mainWrapper = document.querySelector('.main-content');
// //main content shows by default. Want to disable it IF a certain variable is NOT in localStorage.
// if (!mainClicked){
//     //variable is NOT in local storage... Disable.
//     mainWrapper.style.display = "none";
// }
// // else{
// //     //for testing only
// //     mainWrapper.style.display = "none";
// // }

// scrollDown.onclick = () => { /*show main wrapper and remember to show on next visit*/
//     RevealSiteAndRemember()
// }
// document.querySelector('.game-alt-wrapper').onclick = () => {RevealSiteAndRemember()};

// function RevealSiteAndRemember(){
//     localStorage.setItem('mainClicked', 'true');
//     mainWrapper.style.display = "grid";
// }


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

// const debugText = document.querySelector('.debug-text');
calculateGameBoxArea();
function calculateGameBoxArea(){ //whenever window size changes (and hence when gameArea changes).
    // debugText.innerHTML = window.outerHeight;
    // debugText.innerHTML += "  x  ";
    // debugText.innerHTML += window.outerHeight;

    document.documentElement.style.setProperty('--GameHeightJS', 60 * window.outerHeight / 100 + "px");


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

    if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
        gameCircleDuplicate.ontouchstart = e => {generateRandomCoordsAndSet(e, false, gameCircleDuplicate)};
        // console.log("Mobile: touch");
    } else{
        gameCircleDuplicate.onclick = e  => {generateRandomCoordsAndSet(e, false, gameCircleDuplicate)};
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
    if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {

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
    generateRandomCoordsAndSet(e, false, gameCircle);
    // e.preventDefault();
};
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
const scoreElement = document.querySelector('.score');

function generateRandomCoordsAndSet(event, missed = false, ClickedCircleElement){  //on circle click + on circle missed.
    // if (event){
    //     event.preventDefault();
    // }
    // document.activeElement.blur();
    // debugText.innerHTML += "+touch ";

    
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
const startingDisplay = document.querySelector('.starting__options');

gameStart.onclick = () => {
    // localStorage.setItem('mainClicked', 'false');
    // mainWrapper.style.display = "";

    score = 0;
    scoreElement.textContent = score;
    scoreElement.style.fontSize = "14ch"
    
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
    if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
        gameCircle.addEventListener("touchstart", CircleInteract); 
        // console.log("Mobile: touch");
    } else{
        gameCircle.addEventListener("click", CircleInteract); 
        // console.log("Desktop: click");
    };
    
    console.log("Running slow mode:", easyMode);
};
///
const hi_message = document.querySelector('.starting__options-hi-message');
const hi_messageButton = document.querySelector('.hi__message-game');
const hi_messageCircle = document.querySelector('.hi__message-circle-game');
const starting_options = document.querySelector('.starting__options-selections');

gameStart.tabIndex = -1;
difficultyCheckbox.tabIndex = -1;
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

        hi_messageCircle.style.background = "";

        document.documentElement.style.setProperty('--Hi_message-Scale', "1");
        document.documentElement.style.setProperty('--Hi_message-hoverScale', "1.2");

        if (score > 0){
            scoreElement.style.opacity = "";
            livesElement.style.opacity = "";
        }

    }
    else{ //turn on 
        hi_message.style.transform = "translateY(0ch)";
        starting_options.style.scale = "1";

        document.documentElement.style.setProperty('--Hi_message-Scale', "1.2");
        document.documentElement.style.setProperty('--Hi_message-hoverScale', "1.4");

        //ensure scaled up buttons CAN be tabbed into!
        gameStart.tabIndex = 0;
        difficultyCheckbox.tabIndex = 0;
        scrollDown.tabIndex = 0;

        if (score > 0){
            scoreElement.style.opacity = "1";
            livesElement.style.opacity = "1";
        }
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
    if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
        circleElement.addEventListener("touchstart", ()=> {

            circleElement.classList.add("js-game-button-touch");

            const TouchYellowDelay = setTimeout(() => { //require a brief timeout before showing timer visualizer.
                circleElement.classList.remove("js-game-button-touch");
                // alert("removed yellow class!"); 
            }, 200);

        });
    }
};


// touch styles
if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
    //Hi circle
    const hi_messageAlt = document.querySelector('.hi__message-alt');
    const hi_messageAltCircle = document.querySelector('.hi__message-circle-alt');
    hi_messageAlt.addEventListener("touchstart", () => {
        hi_messageAltCircle.classList.add("js-TOUCH-hi__message-circle");
    })
    hi_messageAlt.addEventListener("touchend", () => {
        hi_messageAltCircle.classList.remove("js-TOUCH-hi__message-circle");
    });
    hi_messageAlt.addEventListener("touchcancel", () => {
        hi_messageAltCircle.classList.remove("js-TOUCH-hi__message-circle");
    });
    // hi_messageButton
    // hi_messageCircle
    hi_messageButton.addEventListener("touchstart", () => {
        hi_messageCircle.classList.add("js-TOUCH-hi__message-circle");
    })
    hi_messageButton.addEventListener("touchend", () => {
        hi_messageCircle.classList.remove("js-TOUCH-hi__message-circle");
    });
    hi_messageButton.addEventListener("touchcancel", () => {
        hi_messageCircle.classList.remove("js-TOUCH-hi__message-circle");
    });

    //game options
    const knobLabel = document.querySelector('.difficulty-switch-label');
    knobLabel.addEventListener("touchstart", () => {
        knobLabel.classList.add("js-TOUCH-gameKnob");
    })
    knobLabel.addEventListener("touchend", () => {
        knobLabel.classList.remove("js-TOUCH-gameKnob");
    });
    knobLabel.addEventListener("touchcancel", () => {
        knobLabel.classList.remove("js-TOUCH-gameKnob");
    });
    //
    gameStart.addEventListener("touchstart", () => {
        gameStart.classList.add("js-TOUCH-gameButtons");
    })
    gameStart.addEventListener("touchend", () => {
        gameStart.classList.remove("js-TOUCH-gameButtons");
    });
    gameStart.addEventListener("touchcancel", () => {
        gameStart.classList.remove("js-TOUCH-gameButtons");
    });
    //
    scrollDown.addEventListener("touchstart", () => {
        scrollDown.classList.add("js-TOUCH-gameButtons");
    })
    scrollDown.addEventListener("touchend", () => {
        scrollDown.classList.remove("js-TOUCH-gameButtons");
    });
    scrollDown.addEventListener("touchcancel", () => {
        scrollDown.classList.remove("js-TOUCH-gameButtons");
    });
}
/////////// Project Box Video manipulations on hover
const FallingIslands_Box = document.querySelector('.project-box-fallingislands');
const FallingIslands_CoverImage = document.querySelector('.fallingislands-image');
const FallingIslands_Video = document.querySelector('.fallingislands-video');
FallingIslands_Video.pause();

const PlatinumDriver_Box = document.querySelector('.project-box-PlatinumDriver');
const PlatinumDriver_CoverImage = document.querySelector('.PlatinumDriver-image');
const PlatinumDriver_Video = document.querySelector('.PlatinumDriver-video');
PlatinumDriver_Video.pause();

const SuperBlueBall_Box = document.querySelector('.project-box-SuperBlueBall');
const SuperBlueBall_CoverImage = document.querySelector('.SuperBlueBall-image');
const SuperBlueBall_Video = document.querySelector('.SuperBlueBall-video');
SuperBlueBall_Video.pause();

const Sorting_Box = document.querySelector('.project-box-Sorting'); 
const Sorting_CoverImage = document.querySelector('.sorting-image');
const Sorting_Video = document.querySelector('.Sorting-video');
Sorting_Video.pause();

// const VN_Box = document.querySelector('.project-box-visualnovel'); 
// const VN_CoverImage = document.querySelector('.visualnovel-image');
// const VN_Video = document.querySelector('.VisualNovel-video');
// VN_Video.pause();

const playImages = document.querySelectorAll(".play-image_button");
playImages.forEach((playImage) => {
    playImage.style.pointerEvents="initial";
    // console.log("changed pointer events!");
});

function addClickToPlay(){
    playImages.forEach((playImage) => {
        playImage.addEventListener("click", playImageClick);
        playImage.addEventListener("mouseup", blurElement); 
        playImage.addEventListener("touchend", blurElement); //for mobile
    });
}

let pauseImagesCleared = false;
function clearPauseImages(){ //for when autoplay is not disabled.
    playImages.forEach((playImage) => {
        playImage.firstElementChild.style.display = "none";
        playImage.style.zIndex = "1";

        playImage.removeEventListener("click", playImageClick);
    });

    // console.log("cleared pause images");
    pauseImagesCleared = true;
}

function playImageClick(){ 
    playImages.forEach((playImage) => {
        //make all invisible since all will be playing now.
        // playImage.style.border = "none";

        playImage.firstElementChild.style.display = "none";

        playImage.style.zIndex = "1";


        const videoElement = playImage.nextElementSibling;
        
        //
        videoElement.play();
        previousVideo = videoElement;
        //

        playImage.removeEventListener("click", playImageClick);
    });
}
function blurElement(){ //only on mouse down and touch end (not on, for instance, enter or space).
    // console.log("Active element: ", document.activeElement);
    document.activeElement.blur();
    // console.log("Active element: ", document.activeElement);

    playImages.forEach((playImage) => {
        playImage.removeEventListener("mouseup", blurElement);
        playImage.addEventListener("touchend", blurElement);
    });
}




if (window.matchMedia( "(hover: hover)" ).matches) {
    if (! onSamsungChrome()){
        //Do not apply if in samsung chrome mobile (which sees hover: hover as true even on mobile).
        addCover_VideoManipulation(FallingIslands_Box, FallingIslands_Video);
        addCover_VideoManipulation(PlatinumDriver_Box, PlatinumDriver_Video);
        addCover_VideoManipulation(SuperBlueBall_Box, SuperBlueBall_Video);
        addCover_VideoManipulation(Sorting_Box, Sorting_Video);
        // addCover_VideoManipulation(VN_Box, VN_Video);
    }

}


const fireClickElement = document.querySelector('.navbar');

// const d_lay = setTimeout(() => { //want to add some time before it stops playing.
//     fireClickElement.click();
//     console.log("Click");
// }, 1500);


if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {
//For some reason, videos do not play on touch on some devices UNLESS something is touched BEFOREhand...
//simulate a click here on the background (which does nothing).

    addCover_VideoManipulation_Touch(FallingIslands_Box, FallingIslands_Video, FallingIslands_CoverImage);
    addCover_VideoManipulation_Touch(PlatinumDriver_Box, PlatinumDriver_Video, PlatinumDriver_CoverImage);
    addCover_VideoManipulation_Touch(SuperBlueBall_Box, SuperBlueBall_Video, SuperBlueBall_CoverImage);
    addCover_VideoManipulation_Touch(Sorting_Box, Sorting_Video, Sorting_CoverImage);
//     addCover_VideoManipulation_Touch(VN_Box, VN_Video, VN_CoverImage);
}



function addCover_VideoManipulation(ProjectBox, videoElement){
    let previousVideo = null;      //current video playing (timeout function is attached to).
    let previousVideoTimeOut = null; //current video timeout funciton.
    let hoveredVideo = null;

    ProjectBox.addEventListener("mouseenter", ()=>{
        hoveredVideo = videoElement;

        if (! ProjectBox.contains(document.activeElement)){
        //if previous video is the current video... stop its pause timeOut.
            // in fact, regardless of video it is, stop the timeout and pause it.
                //can also check if previous video is the current we want to play, in which case there would be no point in pausing it because it will play right after.
            clearTimeout(previousVideoTimeOut);
            // console.log("cleared timeout [mouse]");


            if (previousVideo !== null){
                previousVideo.pause();
                console.log("stopped video [mouse]: ", previousVideo.classList);
    
            };
    
            //after previous video is paused, simply play the current one.
            // videoElement.play();
            // previousVideo = videoElement;

            playVideo();
            async function playVideo() {
                try {
                await videoElement.play();
                previousVideo = videoElement;
                 console.log("started video [mouse]: ", videoElement.classList);
                
                 if (!pauseImagesCleared){
                    clearPauseImages();
                 }

                } 
                catch (err) {
                    //Find this project box's play-image..
                    const playImage = videoElement.previousElementSibling.firstElementChild;
                    //enable it
                    playImage.style.display = "initial";
                    addClickToPlay();
                    console.log("autoplay disabled: ", playImage);
                }
            };


            
        }
    });

    ProjectBox.addEventListener("mouseleave", ()=>{
        //disabled playImage if user did not click play:

        hoveredVideo = null;

        if (!(ProjectBox.contains(document.activeElement))){ //doesn't have focus.
            videoElement.previousElementSibling.firstElementChild.style.display = "none";


            const VideoPauseDelay = setTimeout(() => { //want to add some time before it stops playing.
                videoElement.pause();
                console.log("stopped video [mouse]: ", videoElement.classList);

            }, 600);
            previousVideoTimeOut = VideoPauseDelay;
        }

    });

    ProjectBox.addEventListener("focusin", ()=> {
    clearTimeout(previousVideoTimeOut); 
    // console.log("cleared timeout [focus]");

        if (previousVideo !== null){
            previousVideo.pause();
            console.log("stopped video [mouse]: ", previousVideo.classList);
        };


        // videoElement.play();
        // previousVideo = videoElement;
        playVideo();
        async function playVideo() {
            try {
            await videoElement.play();
            previousVideo = videoElement;
            console.log("started video [focus]: ", videoElement.classList);
            if (!pauseImagesCleared){
                clearPauseImages();
             }
             
            } 
            catch (err) {
                //Find this project box's play-image..
                const playImage = videoElement.previousElementSibling.firstElementChild;
                //enable it
                playImage.style.display = "initial";
                addClickToPlay();
            }
        };




    });
    ProjectBox.addEventListener("focusout", ()=> {
        const VideoPauseDelay = setTimeout(() => { //want to add some time before it stops playing.
            if (hoveredVideo != videoElement){
                videoElement.pause();
                console.log("stopped video [focus]: ", videoElement.classList);
            }
        }, 600);
        previousVideoTimeOut = VideoPauseDelay;
    });
}

async function playProjectVideo(videoElement){
    //For mobile, want to check if autoplay is disabled. 
    
}


////project box touch styles....    
let CurrentRunningVideo = "";
let videoPauseTimer = null;
function addCover_VideoManipulation_Touch(ProjectBox, videoElement, imageElement){
    ProjectBox.addEventListener("touchstart", ()=>{
            if (CurrentRunningVideo !== videoElement){
                
                if (videoPauseTimer !== null){clearTimeout(videoPauseTimer);};


                // CurrentRunningVideo = videoElement;
                // videoElement.play();

                imageElement.style.opacity = "0";
                document.addEventListener("touchstart", e => {listenStopVideo(e, ProjectBox, videoElement, imageElement)});


                playVideo();
                async function playVideo() {
                    try {
                    await videoElement.play();
                    CurrentRunningVideo = videoElement;
                    
                    console.log("started video");
                    if (!pauseImagesCleared){
                        clearPauseImages();
                     }
                    } 
                    catch (err) {
                        //Find this project box's play-image..
                        const playImage = videoElement.previousElementSibling.firstElementChild;
                        //enable it
                        playImage.style.display = "initial";
                        addClickToPlay();
                    }
                };
            };

    });
};
function listenStopVideo(e, ProjectBox, videoElement, imageElement){
    if (e.target === ProjectBox || ProjectBox.contains(e.target)){
        // console.log("Project box contains clicked element!");
        // return;
    }
    else{
        document.removeEventListener("touchstart", listenStopVideo);
        imageElement.style.opacity = "1";
        CurrentRunningVideo = "";

        clearTimeout(videoPauseTimer);
        videoPauseTimer = setTimeout(() => { //want to add some time before it stops playing.
            videoElement.pause();
            console.log("stopped video");
        }, 600);
    }
};

// General Touch Style adder:
    // Can use: 
        // AddTouchForMultipleEl(document.querySelectorAll(".class_name"), "JS-Touch")
        // AddTouchStyle(document.querySelector(".class_name"), "JS-Touch")
        // addClickStyle(document.querySelector(".class_name"), "JS-Touch") //toggles style
if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {

    //index only:
    addClickStyle(document.querySelector(".about__me-Box1"), "JS-about__me-Box1");
    // AddTouchStyle(document.querySelector(".about__me-Box1"), "JS-about__me-Box1");
}