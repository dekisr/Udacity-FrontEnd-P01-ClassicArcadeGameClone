class Player {
  constructor(x = 0, y = blockHeight*3) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    if (this.x >= blockWidth*7) {
      this.reset();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Set the player movement
  handleInput(key) {
    (key === 'up' && this.y != blockHeight*0)?
    this.y -= blockHeight : this.y = this.y;
    (key === 'right' && this.x != blockWidth*7)?
    this.x += blockWidth : this.x = this.x;
    (key === 'down' && this.y != blockHeight*5)?
    this.y += blockHeight : this.y = this.y;
    (key === 'left' && this.x != blockWidth*0)?
    this.x -= blockWidth : this.x = this.x;
  }
  // Reset the player position to start point
  reset() {
    setTimeout(() => {
      this.x = 0;
      this.y = blockHeight*3;
    }, 100);
  }
}

class Enemy {
  constructor() {
    this.start = -100;
    this.x = this.randStart();
    this.y = this.start;
    this.speed = this.randSpeed();
    this.sprite = this.randSprite();
  }
  update(dt) {
    this.y = this.y + this.speed * dt;
    if (this.y > 470) {
      this.x = this.randStart();
      this.y = this.start;
      this.speed = this.randSpeed();
      this.sprite = this.randSprite();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Randomize the enemies start position and speed
  randStart() {
    const random = (blockWidth*Math.floor(Math.random()*6+1));
    return random;
  }
  randSpeed() {
    const random = Math.random() * 400 + 50;
    return random;
  }
  // Select a random sprite for each enemy
  randSprite() {
    const charSprites = [
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'
    ];
    const enemySprite = charSprites[Math.floor(Math.random()*charSprites.length)];
    return enemySprite;
  }
}

class Star {
  constructor() {
    this.x = this.starX();
    this.y = this.starY();
    this.sprite = 'images/star.png';
    this.count = 0;
    this.starElement = document.querySelector('h4');
  }
  update(dt) {
    this.starElement.innerHTML = this.count;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Set random position for the star
  starX() {
    const random = (blockWidth*Math.floor(Math.random()*6+1));
    return random;
  }
  starY() {
    const random = (blockHeight*Math.floor(Math.random()*6));
    return random;
  }
}

// Now instantiate your objects.
const allEnemies = [];
let enAmount = 8;
const enemies = () => {
  for (let i = 0; i < enAmount; i++) {
    let enemy = new Enemy();
    allEnemies.push(enemy);
  }
};
const player = new Player();
const star = new Star();
enemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    65: 'left',
    87: 'up',
    68: 'right',
    83: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
