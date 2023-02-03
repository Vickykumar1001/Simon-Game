var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
//Detecting keyboard press
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      $("button").text("Start");
      $("button").fadeOut(300);
      nextSequence();
      started = true;
    }
  });

  $("button").on("click",function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      $("button").text("Start");
      animatePress("start");
      $("button").fadeOut(500);
      nextSequence();
      started = true;
    }
  });

//Creating next Sequence Color
function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // Animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //Audio
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
}

//Detecting Button Press
var buttons = document.querySelectorAll(".btn"); 
for(var i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click",handler);
}

function handler(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);
        $("h1").text("Game Over, Press Re-start button to Restart!");
        $("button").fadeIn(300);
        $("button").text("Re-start");
        startOver();
        console.log("wrong");
      }
}
function playSound(name){
    var audio = new Audio( name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
      }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}
