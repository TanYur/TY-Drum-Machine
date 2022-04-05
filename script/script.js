let ArrVolume = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];
let AudioVolume = ArrVolume[0];
let text = "";
let display = $("#display");

$(".drum-pad, .display, .vol").addClass("hideSwitch");
$(".drum-pad, .display, .vol").disabled = true;

$("#plus").click(function () {
  let PlusVolume;
  let ind = ArrVolume.findIndex(i=>i==AudioVolume)
  if( ArrVolume[ind]<1){
    PlusVolume = ArrVolume[ind+1]
  } else if( ArrVolume[ind] == 1){
    PlusVolume = 1
  }
    AudioVolume = PlusVolume;
    let volText = 'volume ' + AudioVolume;
  $("#volume").text(volText);
 
});

$("#sub").click(function () {
  let SumVolume;
  let ind = ArrVolume.findIndex(i=>i==AudioVolume)
  if( ArrVolume[ind]>0){
    SumVolume = ArrVolume[ind-1]
  } else if( ArrVolume[ind] == 0){
    SumVolume = 0
  }
    AudioVolume = SumVolume;
    let volText = 'volume ' + AudioVolume;
  $("#volume").text(volText);
});

$("#volume").click(function () {
  let volText = $(this).text() + volum;
  $("#volume").text(volText);
});

let getSrc = (i) => {
  if (i.includes("Q")) {
    text = "Q";
  } else if (i.includes("W")) {
    text = "W";
  } else if (i.includes("E")) {
    text = "E";
  } else if (i.includes("A")) {
    text = "A";
  } else if (i.includes("S")) {
    text = "S";
  } else if (i.includes("D")) {
    text = "D";
  } else if (i.includes("Z")) {
    text = "Z";
  } else if (i.includes("X")) {
    text = "X";
  } else if (i.includes("C")) {
    text = "C";
  }

  display.text(text);
  var audio = document.getElementById(text);
  audio.volume = AudioVolume;
  audio.play();
};

$(".drum-pad").click(function () {
  getSrc($(this).text());
});

document.addEventListener("keydown", function (e) {
  getSrc(e.code);
});

$("#on").on("click", function () {
  $(".drum-pad, .display, .vol")
    .removeClass("hideSwitch drum-pad-hover")
    .addClass("show").disabled = false;
  $("#on").addClass("hideSwitch");
  $("#off").removeClass("hideSwitch");
});

$("#off").on("click", function () {
  $(".drum-pad, .display, .vol").removeClass("show").addClass("drum-pad-hover");

  $("#off").addClass("hideSwitch");
  $("#on").removeClass("hideSwitch drum-pad-hover");
});