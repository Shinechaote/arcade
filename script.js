game = -1
lastGame = -1
gamePaused = true;
/**
 * game 0: Snake
 * game 1: Pong
 * 
 */

//Snake Variables
var snakeX, snakeY, velX, velY, appleX, appleY, score,length,gameOver,started,gamePaused;
var keypressed;
var frameCount, velTime;
var snakePositions;
var notyetStopped;

//Pong Variables
var p1X,p1Y,p2X,p2Y,vel1,vel2,ballVelX,ballVelY,ballX,ballY;
var paddleHeight,paddleWidth,paddleVel, ballHeight, ballWidth;
var p1Count,p2Count;
var ballCounter;
var originalVelocity;
var gameStarted, roundStarted;


function setup(){
    var canv = createCanvas(500,500)
    if(game === 0){


        canv.parent("snakeDiv")
        background(120)
        noStroke()
        var options = {
            preventDefault: true
          };
        
          // document.body registers gestures anywhere on the page
          var hammer = new Hammer(document.body, options);
          hammer.get('swipe').set({
            direction: Hammer.DIRECTION_ALL
          });
        
          hammer.on("swipe", swiped);
        
          snakePositions = [[240,180],[240,200],[240,220]]
          notyetStopped = true
        keypressed = false;
        snakeX = 240;
        snakeY = 220;
        velX = 0;
        velY = 1;
        velTime = 12;
        frameCount = 0;
        do{
            appleX = Math.floor(Math.random() * 25) * 20;
            appleY = Math.floor(Math.random() * 25) * 20;
        }while(isInArray([appleX,appleY],snakePositions))
    
        score = 0
        snakeLength = 3;
        gameOver = false;
        gameStarted = false;
        roundStarted = false;
        console.log(appleX)
        console.log(appleY)
        frameRate(240)
    }
    else if(game === 1){
        
    canv.parent("pongDiv")
    frameRate(60)
    background(120)

        
    ballHeight = 15;
    ballWidth = 15
    paddleHeight = 80;
    paddleWidth = 10
    ballX = 250;
    ballY = 250;
    ballVelX = getRandomInt(2,4);
    ballVelY = getRandomInt(2,3);
    p1X = 40;
    p1Y = 250-paddleHeight/2;
    p2X = 500-paddleWidth -p1X;
    p2Y = 250-paddleHeight/2;
    vel1 = 0;
    vel2 = 0;
    ballCounter = 0
    paddleVel = 4
    p1Count = 0;
    p2Count = 0;
    gameStarted = false;
    roundStarted = false;

    }
}

//Snake Functions
function isInArray(firstArray,secondArray){
    for (var i = 0; i<secondArray.length;i++){
        var stillSame = true;
        for(var j = 0; j<firstArray.length;j++){
            if(firstArray[j] !== secondArray[i][j]){
                stillSame = false;
            }
        }
        if(stillSame === true){
            return true
        }
    }
    return false;
}

function hasSameArray(arr){
    for(var i= 0; i<arr.length-1;i++){
        for(var j = i+1; j<arr.length;j++){
            if(arr[i][0] === arr[j][0] && arr[i][1] === arr[j][1]){
                return true;
            }
        }
    }
    return false;
}

function swiped(event){
    if(gamePaused === false){
        if(event.direction == 4){
            if(velX === 0){
                velX = 1
                velY = 0 
                started = true
            }
    
        }
        if(event.direction == 8){
            if(velY === 0){
                velX = 0
                velY = -1  
                started = true
            }
        }
        if(event.direction == 16){
            if(velY === 0){
                velX = 0
                velY = 1
    
            }
            started = true
        }
        if(event.direction == 2){
            if(velX === 0){
                velX = -1
                velY = 0
                started = true
            }
        }
    }
    
}

function snakeVisible(){
    document.getElementById("snakeOverlay").style.display = "block"
    gamePaused = false
    game = 0
    if(lastGame !== 0){
        setup()
    }

}

function snakeInvisible(){
    document.getElementById("snakeOverlay").style.display = "none"
    gamePaused = true
    game = -1
    lastGame = 0
}


//Pong Functions

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pongVisible(){
    document.getElementById("pongOverlay").style.display = "block"
    gamePaused = false;
    game = 1
    if(lastGame !== 1){
        setup()
    }


}
function pongInvisble(){
    document.getElementById("pongOverlay").style.display = "none"
    gamePaused = true;
    game = -1
    lastGame = 1
}


function draw(){
    if(gamePaused===false){
        //If Snake is played
        if(game === 0){
            background(120)
            frameCount %= velTime;
        
            if (frameCount === 0 && gameOver === false && started === true){
                keypressed = false;
                snakeX += velX *20
                snakeY += velY * 20
                if(velX !== 0 || velY !== 0){
                    snakePositions.push([snakeX,snakeY])
                }
                
        
                if(snakePositions.length > snakeLength){
                    snakePositions.splice(0,1)
                }
                
                if (appleX === snakeX && appleY === snakeY){
                    while(isInArray([appleX,appleY],snakePositions)){
                        appleX = Math.floor(Math.random() * 25) * 20;
                        appleY = Math.floor(Math.random() * 25) * 20;
                    }
            
                    score += 1;
                    snakeLength += 1;
                    if (velTime >= 8){
                        velTime -= 1;
                    }
                }
                if(snakeY < 0 || snakeY > 480 || snakeX < 0 || snakeX > 480){
                    gameOver = true
                }
            
            }
        
        
            if (hasSameArray(snakePositions)){
                gameOver = true
            }
        
            rect(appleX,appleY,20,20)
            fill(255)
            for (var i = 0;i<snakePositions.length;i++){
                rect(snakePositions[i][0],snakePositions[i][1],20,20)
            }
            textSize(32)
            text(score,460,40)
            fill(255,0,0)
            if(gameOver === true){
                textSize(50)
                textAlign(CENTER)
                text("Game Over",250,250)
                textSize(20)
                text("Press Space to Restart",250,280)
            }
            if(started === false){
                textSize(50)
                textAlign(CENTER)
                text("Snake",250,250)
                textSize(20)
                text("Press Space to Start",250,280)
            }
        }
        

        //If Pong is played
        else if(game === 1){
            background(120)
            if(roundStarted === true ){
                if((p1Y < 500-paddleHeight || vel1 === -paddleVel) && (p1Y > 0 || vel1 === paddleVel) && !(collideRectRect(p1X,p1Y,paddleWidth,paddleHeight,ballX,ballY,ballWidth,ballHeight))){
                    p1Y += vel1;
                }
                if((p2Y < 500-paddleHeight || vel2 === -paddleVel) && (p2Y > 0 || vel2 === paddleVel) && !(collideRectRect(p2X,p2Y,paddleWidth,paddleHeight,ballX,ballY,ballWidth,ballHeight))){
                    p2Y += vel2;
                }
        
                if(ballY+ballHeight >= 500 || ballY <= 0){
                    ballVelY *= -1
                }
                ballX += ballVelX;
                ballY += ballVelY;
        
                if(ballX+ballWidth >= 500){
                    ballX = 250;
                    ballY = 250;
                    ballVelX = getRandomInt(2,4);
                    ballVelY = getRandomInt(2,3);
                    p1X = 40;
                    p1Y = 250-paddleHeight/2;
                    p2X = 500-paddleWidth -p1X;
                    p2Y = 250-paddleHeight/2;
                    vel1 = 0;
                    vel2 = 0;
                    ballCounter = 0;
                    p1Count += 1;
                    paddleVel = 3
                    roundStarted = false;
                }
        
                else if(ballX <= 0){
                    ballX = 250;
                    ballY = 250;
                    ballVelX = getRandomInt(2,4);
                    ballVelY = getRandomInt(2,3)
                    p1X = 40;
                    p1Y = 250-paddleHeight/2;
                    p2X = 500-paddleWidth -p1X;
                    p2Y = 250-paddleHeight/2;
                    vel1 = 0;
                    vel2 = 0;
                    ballCounter = 0;
                    p2Count += 1;
                    paddleVel = 3;
                    roundStarted = false
                }
        
        
        
            }
            if(collideRectRect(p1X,p1Y,paddleWidth,paddleHeight,ballX,ballY,ballWidth,ballHeight) || collideRectRect(p2X,p2Y,paddleWidth,paddleHeight,ballX,ballY,ballWidth,ballHeight)){
                paddleVel += 0.2;
                ballVelX *= -1
                ballVelX += 0.2*ballVelX/Math.abs(ballVelX)
                ballCounter += 1;
                if(collideRectRect(p1X,p1Y,paddleWidth,paddleHeight,ballX,ballY,ballWidth,ballHeight)){
                    ballX = p1X+ballWidth;
                }
                if(collideRectRect(p2X,p2Y,paddleWidth,paddleHeight,ballX,ballY,ballWidth,ballHeight)){
                    ballX = p2X-ballWidth;
                }
            }
            fill(255);
            rect(p1X,p1Y,paddleWidth,paddleHeight)
            rect(p2X,p2Y,paddleWidth,paddleHeight);
            rect(ballX,ballY,ballWidth,ballHeight)
            textSize(20)
            text(p2Count,470,30)
            text(p1Count,30,30)
            if(gameStarted === false){
                textSize(40)
                textAlign(CENTER)
                text("Press Space to Start",250,210)
            }
        }

    }
    
}

function keyPressed(){
    if(gamePaused === false){
        if(game === 0){
            if(keypressed === false){
                if (keyCode === LEFT_ARROW || keyCode === 65){
                    if(velX === 0){
                        velX = -1
                        velY = 0
                        started = true
                    }
                    
                }
                else if (keyCode === RIGHT_ARROW || keyCode === 68){
                    if(velX === 0){
                        velX = 1
                        velY = 0 
                        started = true
                    }
                    
                }
                else if (keyCode === UP_ARROW || keyCode === 87){
                    if(velY === 0){
                        velX = 0
                        velY = -1  
                        started = true
                    }
                    
                }
                else if (keyCode === DOWN_ARROW || keyCode === 83){
                    if(velY === 0){
                        velX = 0
                        velY = 1
        
                    }
                    started = true
                }
                else if((started === false || gameOver === true) && keyCode===32){
                    if (started === false){
                        started = true
                    }
                    else{
                        snakeX = 240;
                        snakeY = 220;
                        velX = 0;
                        velY = 1;
                        velTime = 12;
                        frameCount = 0;
                        do{
                            appleX = Math.floor(Math.random() * 25) * 20;
                            appleY = Math.floor(Math.random() * 25) * 20;
                        }while(isInArray([appleX,appleY],snakePositions));
                
                        score = 0
                        snakeLength = 3
                        snakePositions = [[240,180],[240,200],[240,220]]
                        gameOver = false
                    }
        
                }
            }
            keypressed = true
        }

        //Pong
        else if(game === 1){
            if (keyCode === UP_ARROW){
                vel2 = -paddleVel
                roundStarted = true
                gameStarted = true
        }
        else if (keyCode === DOWN_ARROW){
            vel2 = paddleVel
            roundStarted = true
            gameStarted = true
        }

        if(keyCode === 87){
            vel1 = -paddleVel
            gameStarted = true;
            roundStarted = true;
        }
        else if(keyCode === 83){
            vel1 = paddleVel
            roundStarted = true
            gameStarted = true;
        }

        if((roundStarted === false) && keyCode===32){
            roundStarted = true;
            gameStarted = true;
        }
        }

    }
    

}


function keyReleased(){
    if(game ===1){
        if(keyCode === UP_ARROW || keyCode === DOWN_ARROW ){
            vel2 = 0;
        }
        if(keyCode === 87 || keyCode === 83){
            vel1 = 0;
        }
    }

}