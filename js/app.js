// Define variables that I will need to use later

// ***TODO*** Figure out how to calculate these at run time
var gameWidth = 505;
var gameHeight = 606;
var gameCol = 5;
var gameRow = 6;
var active = true;
//Redundent with tile demensions, but keeping seperate incase one or the other changes
var enemyRows = [60, 143, 226, 309];
var playerRows = [-13, 70, 153, 236, 319, 402];

// CONSTANTS
var GEM_X = [0, 101, 202, 303, 404];
var GEM_Y = [73, 156, 239, 322];

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
    }

    // Check if hit player and reset if needed
    if (this.row == player.row) {
        if (this.x + 70 >= player.x && this.x <= player.x + 70) {
            player.life -=1;
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
    this.gameOver = 'images/GameOver.png';
    this.x = 202;
    this.y = 405;
    this.life = 5;
    this.row = 5;
    active = true;
    this.score = 0;
}

// Update the player's position, required for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    if (this.y <= 60) {
        this.score += 1;
        this.reset();
    }

    if (this.life === 0) {
        active = false;
        ctx.drawImage(Resources.get(this.gameOver), 10, 10);
    }
}

Player.prototype.handleInput = function(key) {
    if (key == 'up' && this.y >= 60) {
        this.y = this.y - 83;
        this.row += -1;
    }
    if (key == 'down' && this.y <= 399) {
        this.y = this.y + 83;
        this.row += 1;
    }
    if (key == 'right' && this.x <= 402) {
        this.x = this.x + 101;
    }
    if (key == 'left' && this.x >= 1) {
        this.x = this.x - 101;
    }
    if (key == 'reset') {
        this.newGame();
    }
    if (key == 'pause') {
        if (active) {
            active = false;
        } else {
            active = true;
        }
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '36px Fantasy';
    ctx.fillText('SCORE: ' + this.score, 345, 90);
}

// Reset player back to starting position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
    this.row = 5;
}

Player.prototype.newGame = function() {
     player = new Player();    
}

var Life = function() {
    this.sprite = 'images/Heart_Small.png';
}

Life.prototype.render = function() {
    var x = 10;
    for (var i = 0; i < player.life; i++) {
        ctx.drawImage(Resources.get(this.sprite), x, 60);
        x += 35;   
    }
}

var Score = function() {
     
}

Score.prototype.render = function() {
    
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
var life = new Life();
var score = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        // Add wasd keys to be kind to our left handers 
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down',
        // Future keys to be implemented for pause and rest
        82: 'reset',
        80: 'pause'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This listens for key presses and disables default scroll actions.
document.addEventListener('keydown', function(e) {
  if ([37, 38, 39, 40, 65, 68, 80, 82, 83].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }  
}, false);

// Global functions not tied to a class or object

// Generate a random number between two integers.  Taken from StackOverFlow
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}