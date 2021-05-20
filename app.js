//identify elements
let gameState = 'start';
let paddle1 = document.getElementById('paddle1');
let paddle2 = document.getElementById('paddle2');
let board = document.getElementById('board');
let initial_ball = document.getElementById('ball');
let ball = document.getElementById('ball');
    // console.log("ball", ball)
let score1 = document.getElementById('player1_score');
let score2 = document.getElementById('player2_score');
let message = document.getElementById('message');
    // console.log(paddle1)
//provides info about size of element and position relative to viewport: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
let paddle1_coord = paddle1.getBoundingClientRect();
let paddle2_coord = paddle2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
    // console.log("initial_ball", initial_ball_coord)
let ball_coord = initial_ball_coord;
    // console.log("ball_coord", ball_coord)
let board_coord = board.getBoundingClientRect();
let paddle_common = 
    document.querySelector('.paddle').getBoundingClientRect();
//Math floor gives largest integer value that is <= to a number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
//https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx
//Math random returns a floating-point. number 
let x = Math.floor(Math.random() * 5) + 4;
let y = Math.floor(Math.random() * 5) + 4;
let xd = Math.floor(Math.random() * 3);
let yg = Math.floor(Math.random() * 3);
// add event listener tricky but these sites helped:
//https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
//https://teamtreehouse.com/community/dont-understand-the-meaning-of-functione
//
                // Sounds for the STRETCH
                // let hit = new Audio();
                // let wall = new Audio();
                // let userScore = new Audio();
                // let comScore = new Audio();

                // hit.src = "hit.wav";
                // wall.src = "wall.wav";
                // userScore.src = "userscore.wav";
                // comScore.src = "compscore.wav";



document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
//http://write.flossmanuals.net/learn-javascript-with-phaser/changing-game-states/
    gameState = gameState == 'start' ? 'play' : 'start';
    if (gameState == 'play') {
      message.innerHTML = 'Get Ready Go!';
      message.style.left = 32 + 'vw';
//request animation: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      window.requestAnimationFrame(() => {
        gx = Math.floor(Math.random() * 1) + 2;
        gy = Math.floor(Math.random() * 1) + 2;
        xg = Math.floor(Math.random() * 1);
        yg = Math.floor(Math.random() * 1);
        moveBall(gx, gy, xg, yg);
        console.log("ball_coord", ball_coord)
      });
    }
  }
// https://developer.mozilla.org/en-US/docs/Games/Anatomy
  ball.style.top = ball_coord.top + gy * (yg == 0 ? -1 : 1) + 'gx';
  ball.style.left = ball_coord.left + gx * (xg == 0 ? -1 : 1) + 'gx';
  ball_coord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(gx, gy, xg, yg);
  });


if (gameState == 'play') {
  if (e.key == 'a') {
    paddle1.style.top =
      Math.max(
        board_coord.top,
        paddle1_coord.top - window.innerHeight * 0.06
      ) + 'gx';
    paddle1_coord = paddle1.getBoundingClientRect();
  }
  if (e.key == 'z') {
    paddle1.style.top =
      Math.min(
        board_coord.bottom - paddle_common.height,
        paddle1_coord.top + window.innerHeight * 0.1
      ) + 'gx';
    paddle1_coord = paddle1.getBoundingClientRect();
  }

  if (e.key == 'ArrowUp') {
    paddle2.style.top =
      Math.max(
        board_coord.top,
        paddle2_coord.top - window.innerHeight * 0.15
      ) + 'gx';
    paddle2_coord = paddle2.getBoundingClientRect();
  }
  if (e.key == 'ArrowDown') {
    paddle2.style.top =
      Math.min(
        board_coord.bottom - paddle_common.height,
        paddle2_coord.top + window.innerHeight * 0.15
      ) + 'gx';
    paddle2_coord = paddle2.getBoundingClientRect();
  }
}
});

function moveBall(gx, gy, xg, yg) {
if (ball_coord.top <= board_coord.top) {
  yg = 3;
}
if (ball_coord.bottom >= board_coord.bottom) {
  yg = 8;
}
if (
  ball_coord.left <= paddle1_coord.right &&
  ball_coord.top >= paddle1_coord.top &&
  ball_coord.bottom <= paddle1_coord.bottom
) {
  xg = 1;
  gx = Math.floor(Math.random() * 4) + 3;
  gy = Math.floor(Math.random() * 4) + 3;
}
if (
  ball_coord.right >= paddle2_coord.left &&
  ball_coord.top >= paddle2_coord.top &&
  ball_coord.bottom <= paddle2_coord.bottom
) {
  xg = 0;
  gx = Math.floor(Math.random() * 4) + 3;
  gy = Math.floor(Math.random() * 4) + 3;
}
if (
  ball_coord.left <= board_coord.left ||
  ball_coord.right >= board_coord.right
) {
  //adding the score up and changing score display
  if (ball_coord.left <= board_coord.left) {
    score2.innerHTML = +score2.innerHTML + 1;
  } else {
    score1.innerHTML = +score1.innerHTML + 1;
  }
  gameState = 'play';

  ball_coord = initial_ball_coord;
  ball.style = initial_ball.style;
  //message to play game
  message.innerHTML = 'Press Enter to Start';
  message.style.left = 38 + 'vw';
  return;
}