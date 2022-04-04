const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "x", "/"];

let num = "";
var inputValue = "";
var endRes = "";
let arr = [];

function sum(num1 = 0, num2, s) {
  let res = 0;
  let n = (i) => Number(i).toFixed(5) * 1000;
  let a = n(num1);
  let b = n(num2);
  switch (s) {
    case "+":
      res = (a + b) / 1000;
      break;
    case "-":
      res = (a - b) / 1000;
      break;
    case "x":
      res = (a * b) / 1000000;
      break;
    case "/":
      res = a / b;
      break;
    default:
      res;
  }
  return +res.toFixed(4);
}

function result(s) {
  endRes = eval(s);
  num = "";
  inputValue = 0;
  arr = [];
  return endRes;
}

function result(a) {
  let res;
  let sign = a.join``.match(/[x|\/]/g);
  if (sign) {
    for (let i = 0; i < sign.length; i++) {
      let orderSign = a.findIndex((i) => i == "/" || i == "x");

      res = sum(a[orderSign - 1], a[orderSign + 1], a[orderSign]);
      a[orderSign] = res;
      a[orderSign - 1] = "";
      a[orderSign + 1] = "";

      a = a.filter((i) => i !== "");
    }
  }

  sign = a.filter((i) => i == "-" || i == "+");
  if (sign) {
    for (let i = 0; i < sign.length; i++) {
      let orderSign = a.findIndex((i) => i == "+" || i == "-");
      res = sum(a[orderSign - 1], a[orderSign + 1], a[orderSign]);
      a[orderSign] = res;
      a[orderSign - 1] = "";
      a[orderSign + 1] = "";
      a = a.filter((i) => i !== "");
    }
  }
  num = "";
  inputValue = 0;
  arr = [];
  endRes = res;
  return endRes;
}

// AC
$("#clear").click(function () {
  num = "";
  endRes = "";
  inputValue = 0;
  arr = [];
  $("#display").text(inputValue);
});

// - + * /
$(".sign").click(function () {
  var text = $(this).text();
  if (arr[arr.length - 1] == "0.") {
    arr[arr.length - 1] = "0";
  }
  
  if (endRes) {
    arr.push(endRes + "");
    endRes = "";
  }
  if (num) {
    arr.push(num);
    num = "";
  }
  arr.push(text);
  
  if (
    action.includes(arr.slice(-2, -1)[0]) &&
    action.includes(arr.slice(-3, -2)[0])
  ) {
    arr = arr.slice(0, -3);
    arr.push(text);
  } else if (action.includes(arr.slice(-2, -1)[0]) && text != "-") {
    arr = arr.slice(0, -2);
    arr.push(text);
  }
  inputValue = arr.join("");
  $("#display").text(inputValue);
});

$(".number").click(function () {
  var text = $(this).text();
  //и endRes есть
  if (endRes) {
    //обнуляем
    endRes = "";
    arr = [];
  }
  if (
    !num &&
    arr[arr.length - 1] == "-" &&
    action.includes(arr[arr.length - 2])
  ) {
    arr = arr.slice(0, -1);
    num = "-";
  }
  if (arr.length > 0) {
    if (arr[arr.length - 1].slice(-1) == ".") {
      num = arr[arr.length - 1];
      arr = arr.slice(0, -1);
    }
    inputValue = arr.join("");
  }
  if (num == "0" && text == "0") {
    num = "0";
  } else if (num == "0" && text !== "0") {
    num = "";
    num += text;
    inputValue = arr.join("") + num;
  } else {
    //делаем цифру
    num += text;
    inputValue = arr.join("") + num;
  }

  $("#display").text(inputValue);
});

//click .
$("#decimal").click(function () {
  var text = $(this).text();
  if (endRes) {
    endRes = "";
    arr = [];
  }
  //second point check
  if (
    (arr.length > 0 && arr[arr.length - 1].includes(".")) ||
    (num && num.includes("."))
  ) {
    text = "";
  }

  if (num) {
    num = num + text;
    inputValue = arr.join`` + num;
  }
  if (arr.length == 0 && !num) {
    num = "0" + text;
    inputValue = arr.join`` + num;
  }
  if (arr) {
    if (action.includes(arr[arr.length - 1]) && !num) {
      num = "0" + text;
      inputValue = arr.join`` + num;
    }
  }
  $("#display").text(inputValue);
});

//click =
$("#equals").click(function () {
  if (endRes) {
    inputValue = endRes;
    $("input").val(inputValue);
  } else if (!endRes) {
    if (num) {
      arr.push(num);
      num = "";
    }
    if (arr.length > 2) {
      inputValue = result([...arr]);
      $("#display").text(inputValue);
    }
  }
}); 
 
function starsColor() {
  let count = 50;
  let scene = document.querySelector(".scene");
  let j = 0;
  while (j < count) {
    let star = document.createElement("j");
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let duration = Math.random() * 7;
    let size = Math.random() * 3;

    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = 1 + size + "px";
    star.style.height = 1 + size + "px";

    star.style.animationDuration = 2 + duration + "s";
    star.style.animationDelay = duration + "s";

    scene.appendChild(star);
    j++;
  }
}
starsColor();
