// Game variables
let box = 32;
let score = 0;
let snake = [];
snake[0] = {x: 9 * box, y: 10 * box};
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};
let direction;

// Game canvas
let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

// Event listener for arrow keys
document.addEventListener("keydown", directionChange);

function directionChange(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Draw everything to the canvas
function draw() {
    context.fillStyle = "white"; 
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // Draw the food
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    // Get the current head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the head position based on the current direction
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "right") snakeX += box;
    if(direction == "down") snakeY += box;

    // Check if the snake has hit the border
    if(snakeX < 0) snakeX = canvas.width - box;
    if(snakeY < 0) snakeY = canvas.height - box;
    if(snakeX >= canvas.width) snakeX = 0;
    if(snakeY >= canvas.height) snakeY = 0;

    // Check if the snake has eaten the food
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        // Add a new head to the snake
        let newHead = {
            x: snakeX,
            y: snakeY
        };
        snake.unshift(newHead);
        } else {
        // Remove the tail of the snake
            snake.pop();
            
        };
        snake.unshift(newHead);
    }
// Check for collision
function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Call draw function every 100 ms
let game = setInterval(draw, 100);