// Define variables that I will need to use later

// ***TODO*** Figure out how to calculate these at run time
var gameWidth = 505;
var gameHeight = 606;
var tileWidth = 101;
var tileHeight = 171;
var gameCol = 5;
var gameRow = 6;
//Redundent with tile demensions, but keeping seperate incase one or the other changes
var playerWidth = 101;
var playerHeight = 171;
var enemyRow1 = 60;
var enemyRow2 = 143;
var enemyRow3 = 226;
var enemyRow4 = 309;
var enemyRows = [enemyRow1, enemyRow2, enemyRow3, enemyRow4];
var playerRow1 = -13;
var playerRow2 = 70;
var playerRow3 = 153;
var playerRow4 = 236;
var playerRow5 = 319;
var playerRow6 = 402;
var playerRows = [playerRow1, playerRow2, playerRow3, playerRow4, playerRow5, playerRow6]

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    var randRow = randomIntFromInterval(0, enemyRows.length -1); 
    this.row = randRow + 1;
    this.x = randomIntFromInterval(-50, -500);
    this.y = enemyRows[randRow];
    this.speed = randomIntFromInterval(100, 300);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt); 
    if (this.x > gameWidth) {
        this.x = -100;
        this.speed = randomIntFromInterval(100, 300);
        var randRow = randomIntFromInterval(0, enemyRows.length -1);
        this.row = randRow + 1;
        this.y = enemyRows[randRow];
        console.log('Bug Row: ' + this.row);
    }

    // Check if hit player and reset if needed
    if (this.row == player.row) {
        if (this.x + 70 >= player.x && this.x <= player.x + 70) {
            player.reset();
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = (gameCol * tileWidth) / 2 - (playerWidth / 2);
    this.y = 405;
    this.row = 5;
}

// Update the player's position, required for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    if (this.y <= 60) {
        this.reset();
    }
}

Player.prototype.handleInput = function(key) {
    if (key == 'up' && this.y >= 60) {
        this.y = this.y - 83;
        this.row += -1;
        console.log(this.row);
    }
    if (key == 'down' && this.y <= 399) {
        this.y = this.y + 83;
        this.row += 1;
        console.log(this.row);
    }
    if (key == 'right' && this.x <= 402) {
        this.x = this.x + 101;
    }
    if (key == 'left' && this.x >= 1) {
        this.x = this.x - 101;
    }
    // Remove - Added to check player position during testing
    console.log('x: ' + this.x);
    console.log('y: ' + this.y);
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reset player back to starting position
Player.prototype.reset = function() {
    this.x = (gameCol * tileWidth) / 2 - (playerWidth / 2);
    this.y = 405;
    this.row = 5; 
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Creating 3 enemies and them putting them in an array
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player

//Creating a player object using class to create player above
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Global functions not tied to a class or object

// Generate a random number between two integers.  Taken from StackOverFlow
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Check collision between player and enemy-bug
function checkBugCollision () {
    allEnemies.foreach(function() {

    })
}