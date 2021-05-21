window.addEventListener("keydown", arrowmove);
const canvas = document.getElementById("board")
const ctx = canvas.getContext('2d');
let gameLoopInterval = setInterval(gameLoop, 60);
let scorePlayer1 = 0;
let scoreComputer = 0;




//rectangle paddles
function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
}

//draw ugly ball
function drawBall(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
}
//paddles 
const player1 = {
      x: canvas.width -25,
      y: (canvas.height - 100)/2,
      w: 18,
      h: 100,
      color: "white",
      draw: () => {
            ctx.fillStyle = player1.color;
            ctx.fillRect(player1.x, player1.y, player1.w, player1.h); 
      }
}
const computer = {
      x: 5,
      y: (canvas.height -100)/2,
      w: 18,
      h: 100,
      color: "white",
      draw: () => {
            ctx.fillStyle = computer.color;
            ctx.fillRect(computer.x, computer.y, computer.w, computer.h); 
      }
}

// ugly ball
const ball = {
      x: 400,
      y: 300,
      w: 10,
      h: 10,
      velocityX: 7,
      velocityY: 7,
      color: "white",
      draw: () => {
            //update ball x position
            ball.x = ball.x + ball.velocityX;
            //check if ball is out of bounds
            if(ball.x > canvas.width) {
              scorePlayer1 += 1
              reset();
                  // ball.velocityX = -ball.velocityX //if ball is out of bounds invert velocity
            }
            else if(ball.x <= 0) {
              scoreComputer += 1
              reset();
            }
            //update ball y position
            ball.y = ball.y + ball.velocityY;
            //check if ball is out of bounds y
            if(ball.y > canvas.height || ball.y< 0) {
                  ball.velocityY = -ball.velocityY //if ball is out of bounds invert velocity
            }
                  
            ctx.fillStyle = ball.color;
            ctx.fillRect(ball.x, ball.y, ball.w, ball.h); 
            
      }


}
const net = {
      x: (canvas.width -2)/2,
      y: 0,
      h: 600,
      w: 2,
      color: "white",
}

//net
// console.log(net.x);

function gameLoop() {
      //console.log("hello")
// game loop needs to clear canvas
      ctx.clearRect (0, 0, canvas.width, canvas.height)
//move ball and draw (update game data)

//re-draw new locations
      ctx.fillStyle = net.color;
      ctx.fillRect(net.x, net.y, net.w, net.h);
      ball.draw();
      player1.draw();
      computer.draw();
      computerScoreBoard.draw();
      playerScoreBoard.draw();
      collisionDetection();
      //reset ball
     
        
} 
//computerScoreboard
const computerScoreBoard = {
      x: 200,
      y: 40,
      w: 30,
      h: 30,
      color: "white",
      draw: () => {
      ctx.font = "30px Arial";
      ctx.fillText(+scoreComputer, 200, 40);
      // ctx.textAlign = "center";
      }
}
//playerScoreboard
const playerScoreBoard = {
      x: 600,
      y: 40,
      w: 30,
      h: 30,
      color: "white",
      draw: () => {
      ctx.font = "30px Arial";
      ctx.fillText(+scorePlayer1, 600, 40);
      // ctx.textAlign = "center";
      }

}

//collision detection from: 
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

function collisionDetection() {
      if (player1.x < ball.x + ball.w &&
            player1.x + player1.w > ball.x &&
            player1.y < ball.y + ball.h &&
            player1.y + player1.h > ball.y) {
              ball.velocityX = -ball.velocityX
              ball.velocityY = -ball.velocityY
                  
                  // console.log("collision player")
            } 
            if (computer.x < ball.x + ball.w &&
                  computer.x + computer.w > ball.x &&
                  computer.y < ball.y + ball.h &&
                  computer.y + computer.h > ball.y) {
                    ball.velocityX = -ball.velocityX
                    ball.velocityY = -ball.velocityY
                        
                        // console.log("collision computer")
                  } 
     // if ball hit on right wall
   if (ball.x + ball.radius >= canvas.width) {
    // play scoreSound

    // then user scored 1 point
    player1.scorePlayer1 += 1;
    reset();
  }

  // if ball hit on left wall
  if (ball.x - ball.radius <= 0) {
    // play scoreSound

    // then ai scored 1 point
    computer.scoreComputer += 1;
    reset();
  }
}
       
//update fuction
                
            
// animate paddles with keyboard
//arrowmove
function arrowmove (event) {
      // console.log(event.keyCode)
      if(event.keyCode == 40) {
            if(player1.y >= 510) {
              player1.y = player1.y
            } else {
            player1.y = player1.y +20
      } 
    }
      if(event.keyCode == 38) {
        if(player1.y <= 0) {
          player1.y = player1.y
            } else { 
            player1.y = player1.y -20
      }
    }

      if(event.keyCode == 83) {
            if(computer.y >= 510) {
            computer.y = computer.y
            } else {
            computer.y = computer.y +20
      }
      }
      if(event.keyCode == 87) {
           if(computer.y <= 0) {
            computer.y = computer.y
           } else {
                 computer.y = computer.y -20
           }
      }
      
      
}

// reset the ball
function reset() {
  // reset ball's value to older values
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;

  // changes the direction of ball
  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;
}