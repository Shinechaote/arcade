var snakeX, snakeY, velX, velY, appleX, appleY, score,length,gameOver,started,gamePaused;
var keypressed;
var frameCount, velTime;
var snakePositions = [[240,180],[240,200],[240,220]]
gamePaused = true;
function setup(){

    var canv = createCanvas(500,500)
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
    started = false;

    console.log(appleX)
    console.log(appleY)
    frameRate(240)
}

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
var notyetStopped = true
function draw(){
    if(gamePaused===false){
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
    
}

function keyPressed(){
    if(gamePaused === false){
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
    document.getElementById("snakeHide").hidden = true;
    gamePaused = false
}

function snakeInvisible(){
    document.getElementById("snakeOverlay").style.display = "none"
    document.getElementById("snakeHide").hidden = false;
    gamePaused = true
}