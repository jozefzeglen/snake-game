 
 //listeners
 document.addEventListener("keydown", keyPush)

 //canvas
 const canvas = document.querySelector("canvas")
 const title = document.querySelector("h2")
 const ctx = canvas.getContext("2d")

 //game settings
 let gameOn = true;

 const tileSize = 40;
 let snakeSpeed = 40;
 let tail = [];
 let snakeLength = 2;

 let velocityX = 1
 let velocityY = 0

 let score = 0;

 let snakePosX = 0;
 let snakePosY = canvas.height /2 -tileSize/2;

  //grid
 const tileCountX = canvas.width / tileSize;
 const tileCountY = canvas.height / tileSize;

 //food
 foodPosX = 200;
 foodPosY = 200

 //Game functions - loop
 function gameLoop() {
     if(gameOn)
        drawStaff()
        moveStuff()
        setTimeout(gameLoop, 1000/5)
 }
 gameLoop()

//MOVE Stuff
 function moveStuff() {
     snakePosX += snakeSpeed * velocityX
     snakePosY += snakeSpeed * velocityY

     if(snakePosX > canvas.width-tileSize) {
         snakePosX = 0
     }
     if(snakePosX < 0 ) {
         snakePosX = canvas.width
     }
     if(snakePosY > canvas.height- tileSize) {
         snakePosY = 0
     }
     if(snakePosY < 0 ) {
         snakePosY = canvas.height
     }
     //TAIL
        //colision with head
    tail.forEach((bodyPart) => {
            if (snakePosX ===bodyPart.x && snakePosY === bodyPart.y) {
                gameOver()
            }
        })
        //add tile of tail
     tail.push({ x: snakePosX, y: snakePosY })
        //keeping tail length
     tail = tail.slice(-1 * snakeLength)
        //after colision with food reset food, add score and tile to tail
     if( snakePosX ===foodPosX && snakePosY === foodPosY) {
         resetFood()
         title.textContent = `Score: ${++score}`
         snakeLength ++
     }
 }

//DRAW Stuff
 function drawStaff() {
    //background of grid
     drawRectangle("black", 0, 0, canvas.width, canvas.height);

    drawGrid()

    //draw Food
    drawRectangle("C84B31", foodPosX, foodPosY, tileSize, tileSize);        

    //snake tail
    tail.forEach((bodyPart) => 
         drawRectangle("#191919", bodyPart.x, bodyPart.y, tileSize, tileSize)
     )
    //Snake head
     drawRectangle("black", snakePosX, snakePosY, tileSize, tileSize);        
 }
     
 //FUNCTIONS
    //draw rectangle
 function drawRectangle(color, x, y, width, height) {
     ctx.fillStyle = color;
     ctx.fillRect(x, y, width, height);
 }
    //Keyboard control - def-reset by any key
 function keyPush(event) {
     switch(event.key) {
         case "ArrowLeft":
             if(velocityX !== 1) {
                 velocityX = -1
                 velocityY = 0  
             }
             break;
         case "ArrowUp":
             if(velocityY !== 1) {
                 velocityX = 0
                 velocityY = -1
             }
             break;
         case "ArrowRight":
             if(velocityX !== -1) {
                 velocityX = 1
                 velocityY = 0
         }
             break;
         case "ArrowDown":
             if (velocityY !== -1) {
                 velocityX = 0
                 velocityY = 1
         }
             break;
             default:
                 if( !gameOn ) location.reload()
                 break;
     }
 }
    //Draw grid
 function drawGrid() {
     for(let i = 0; i < tileCountX; i++) {   
         for(let j = 0; j < tileCountY; j++) {  
             drawRectangle(
                 "white", 
                 tileSize * i, 
                 tileSize * j, 
                 tileSize - 1, 
                 tileSize - 1
             )
         }
     }   
 }
    //Reset food after colision with snake
 function resetFood() {
     
     foodPosX = Math.floor(Math.random() * tileCountX) * tileSize
     foodPosY = Math.floor(Math.random() * tileCountY) * tileSize

     if(snakePosX === foodPosX && snakePosY === foodPosY) {
         resetFood()
     }
     if (tail.some((bodyPart) => bodyPart.x ===foodPosX && bodyPart.y === foodPosY)){
         resetFood()
     }          
     if(snakeLength === (tileCountX * tileCountY) - 4) {
        gameOver()
    }   
 }
    //Game Over
 function gameOver() {
     gameOn = false
     title.innerHTML = `Total score: ${score}`
     
 }
