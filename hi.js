
function init() {
    A = document.getElementById("mycanvas");
    A.height = 600
    A.width = 600
    pen = A.getContext("2d")
    pen.fillStyle = "red"
    game_over = false;
    cs = 30;
    foodimg= new Image();
    foodimg.src="./apple.png"
    home=new Image();
    home.src="./garage.png";
    score=0;
    food=getRandomFood();
    rect = {
        h: 60,
        w: 60,
        X: 10,
        Y: 10,
        speed: 10

    }
    snake = {
        init_length: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.init_length; i >= 0; i--) {
                this.cells.push({ X: i, Y: 0 })
            }
        },

        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle=snake.color
                pen.fillRect(this.cells[i].X * cs, this.cells[i].Y * cs, cs - 1, cs - 1)

            }
        },


        updateSnake:function(){

            var headX=this.cells[0].X
            var headY=this.cells[0].Y

            if(headX==food.x && headY==food.y){
                //console.log("food eaten")
                food=getRandomFood();
                score++
            }
            else{
                this.cells.pop();
            }
            rect.X += rect.speed
            if (rect.X > A.width - rect.w || rect.X < 0) {
                rect.speed *= -1;
        
            }
            
            

            var nextX,nextY;
    if(this.direction=="right"){
        nextX=headX+1;
        nextY=headY;
    }
   else if(this.direction=="left"){
        nextX=headX-1;
        nextY=headY;
    }
    else if(this.direction=="down"){
        nextX=headX;
        nextY=headY+1;
    }
    
    else{
        nextX=headX;
        nextY=headY-1;
    }
 

   this.cells.unshift({X:nextX,Y:nextY})
    var lastX=Math.round(A.width/cs);
    var lastY=Math.round(A.height/cs);
    if(this.cells[0].X<0 || this.cells[0].Y<0 || this.cells[0].X>lastX || this.cells[0].Y>lastY){
        game_over=true
    }     

        }
    }
    snake.createSnake();
    function keypresed(e){
       
        if(e.key=="ArrowRight"){
            snake.direction="right"
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left"
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up"
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down"
        }
        else if(e.key==" "){
            if(game_over==false){
                game_over=true;
            }
            else{
                gameloop=false;
            }
            
        }
    }
    document.addEventListener("keydown",keypresed)


}
function draw() {
    pen.clearRect(0, 0, A.height, A.width)
    snake.drawSnake();
    pen.fillStyle=food.color
    pen.fillStyle="red"
    pen.font="20px Roboto"
    pen.fillText(score,50,50)
    pen.drawImage(foodimg,food.x*cs,food.y*cs,cs,cs)
    pen.drawImage(home,-0,-0,40,40)


}

function getRandomFood(){
    var foodX= Math.round(Math.random()*(A.width-cs)/cs)
    var foodY= Math.round(Math.random()*(A.height-cs)/cs)
    var food ={
        x:foodX,
        y:foodY,
        color:"red"
    }
    return food;
}

function update() {
   snake.updateSnake()
   
}


function gameloop() {
    if (game_over == true) {
        clearInterval(f)
        alert("Game Over")
    }
    //console.log("Game Loop called")
    draw()
    update()
}
init();
var f = setInterval(gameloop, 100)

