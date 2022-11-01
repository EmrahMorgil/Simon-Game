
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//started'in değilini aldık true oldu ve if in içine girdi. Level i 1 yaptık. nextSequence'yi çağırdık ve oyun başladı.
//started'i true yaptık if döngüsü durdu bu şekilde klavyeye tekrar tuşa basınca oyun çalışmayacak.
$(document).keypress(function() {
  if (!started) {

    nextSequence();
    started = true;
  }
});

//kullanıcı
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");      //this komple adresi verir. attr("id") dedigimiz zaman adresin içindeki idyi verir yani sadece rengi.
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


//kullanıcı ile botun değerleri aynı mı diye kontrol edilir. Değilse gameover fonksiyonu çalıştırılır.
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function (){ nextSequence(); }, 1000);
    }
  }
  else{
    gameOver();
  }
}

//bot
//gamePattern'in içine random bir renk yolladık. ardından randomChosenColour'a tıklanınca yani tıklanılan butona efekt verdik.
//playSound fonksiyonunu ses çalması için çağırdık.
function nextSequence() {
  userClickedPattern = [];
  level = level+1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


// oyun kaybedilirse yapılacaklar ..
function gameOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}



















//Tıklanınca Çıkan Animasyon
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function (){  $("."+currentColour).removeClass("pressed"); }, 100);
}

//Tıklanınca Çıkarılacak Ses.
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
