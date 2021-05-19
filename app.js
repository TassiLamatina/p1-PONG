let gameState = 'start';
let paddle1 = document.getElementById('paddle1');
let paddle2 = document.getElementById('paddle2');
let board = document.getElementById('board');
let initial_ball = document.getElementById('ball');
let ball = document.getElementById('ball');
console.log("ball", ball)
let score1 = document.getElementById('player1_score');
let score2 = document.getElementById('player2_score');
let message = document.getElementById('message');
// console.log(paddle1)
let paddle1_coord = paddle1.getBoundingClientRect();
let paddle2_coord = paddle2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
console.log("initial_ball", initial_ball_coord)
let ball_coord = initial_ball_coord;
console.log("ball_coord", ball_coord)
let board_coord = board.getBoundingClientRect();
let paddle_common = 
    document.querySelector('.paddle').getBoundingClientRect();
  
let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);
  
document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    gameState = gameState == 'start' ? 'play' : 'start';
    if (gameState == 'play') {
      message.innerHTML = 'Get Ready Go!';
      message.style.left = 42 + 'vw';
      requestAnimationFrame(() => {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        dxd = Math.floor(Math.random() * 2);
        dyd = Math.floor(Math.random() * 2);
        moveBall(dx, dy, dxd, dyd);
        console.log("ball_coord", ball_coord)
      });
    }
  }
  if (gameState == 'play') {
    if (e.key == 'a') {
      paddle1.style.top =
        Math.max(
          board_coord.top,
          paddle1_coord.top - window.innerHeight * 0.06
        ) + 'px';
      paddle1_coord = paddle1.getBoundingClientRect();
    }
    if (e.key == 'z') {
      paddle1.style.top =
        Math.min(
          board_coord.bottom - paddle_common.height,
          paddle1_coord.top + window.innerHeight * 0.06
        ) + 'px';
      paddle1_coord = paddle1.getBoundingClientRect();
    }
  
    if (e.key == 'ArrowUp') {
      paddle2.style.top =
        Math.max(
          board_coord.top,
          paddle2_coord.top - window.innerHeight * 0.1
        ) + 'px';
      paddle2_coord = paddle2.getBoundingClientRect();
    }
    if (e.key == 'ArrowDown') {
      paddle2.style.top =
        Math.min(
          board_coord.bottom - paddle_common.height,
          paddle2_coord.top + window.innerHeight * 0.1
        ) + 'px';
      paddle2_coord = paddle2.getBoundingClientRect();
    }
  }
});
  
function moveBall(dx, dy, dxd, dyd) {
  if (ball_coord.top <= board_coord.top) {
    dyd = 1;
  }
  if (ball_coord.bottom >= board_coord.bottom) {
    dyd = 0;
  }
  if (
    ball_coord.left <= paddle1_coord.right &&
    ball_coord.top >= paddle1_coord.top &&
    ball_coord.bottom <= paddle1_coord.bottom
  ) {
    dxd = 1;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.right >= paddle2_coord.left &&
    ball_coord.top >= paddle2_coord.top &&
    ball_coord.bottom <= paddle2_coord.bottom
  ) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.left <= board_coord.left ||
    ball_coord.right >= board_coord.right
  ) {
    if (ball_coord.left <= board_coord.left) {
      score2.innerHTML = +score2.innerHTML + 1;
    } else {
      score1.innerHTML = +score1.innerHTML + 1;
    }
    gameState = 'play';
  
    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;
    message.innerHTML = 'Press Enter to Start';
    message.style.left = 38 + 'vw';
    return;
  }
  ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
  ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
  ball_coord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
  });
}