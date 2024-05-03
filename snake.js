// Get the canvas element with the id 'game'
let canvas = document.getElementById('game');

// Get the 2D rendering context for the drawing surface of the canvas
let context = canvas.getContext('2d');

// Define the size of each square (box) on the canvas
let box = 28;

// Initialize the snake as an array of objects
let snake = [];

// Set the initial position of the snake in the middle of the canvas
snake[0] = { x: 8 * box, y: 8 * box };

// Set the initial direction of the snake to the right
let direction = "right";

// Create the food object with a random position on the canvas
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
// Initialize the score
let score = 0;

// Function to create the background of the game
function createBG() {
    // Set the color of the fill
    context.fillStyle = "lightgreen";
    // Draw a rectangle covering the entire canvas
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//create the Snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = "#61dafb"; // snake border color
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}
//Draw the food in a random place on the canvas
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
// Create an array of obstacles
let obstacles = [];
for(let i = 0; i < 3; i++) { // 3 is the number of obstacles
    obstacles[i] = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };
}

// Function to draw the obstacles
function drawObstacles() {
    for(let i = 0; i < obstacles.length; i++) {
        context.fillStyle = "black"; // color of the obstacles
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

document.addEventListener('keydown', update);
//record key functions
function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}
//start the game
function startGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    createBG();
    createSnake();
    drawFood();
    // Draw the obstacles
    drawObstacles();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
//check if the snake has eaten the food
    if (snakeX != food.x || snakeY != food.y) {
        //remove the last square of the snake
        snake.pop();
    } else {
        score++;
        //create a new food object at a random position        
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        // Update the score display
        document.getElementById('score').innerHTML = "Score: " + score;
    }
    // Draw the score
    //context.fillStyle = "black";
    //context.font = "20px Arial";
    //context.fillText("Score: " + score, box, box);

// create the new head of the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    // Check if the snake hits an obstacle
    for(let i = 0; i < obstacles.length; i++) {
        if(snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }
}

let game = setInterval(startGame, 150);