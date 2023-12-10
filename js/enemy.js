const enemyWidth = 70
const enemyHeight = 70
let enemies = []
let enemySpeed = 5

const enemyTexture = new Image()
enemyTexture.src = "assets/images/enemy1.png"

function drawEnemies() {
  for (let enemy of enemies) {
    ctx.drawImage(enemyTexture, enemy.x, enemy.y, enemyWidth, enemyHeight)
  }
}

function createEnemies() {
  enemies.push({
    x: Math.random() * (canvas.width - enemyWidth),
    y: 0,
  })
}

function updateEnemies() {
  for (let enemy of enemies) {
    enemy.y += enemySpeed
    if (enemy.y > canvas.height) {
      enemy.y = 0
      enemy.x = Math.random() * (canvas.width - enemyWidth)
    }

    // Checking collisions with player
    if (
      shipX < enemy.x + enemyWidth &&
      shipX + shipWidth > enemy.x &&
      shipY < enemy.y + enemyHeight &&
      shipY + shipHeight > enemy.y
    ) {
      lives--
      enemy.y = 0
      enemy.x = Math.random() * (canvas.width - enemyWidth)

      if (lives === 0) {
        gameRunning = false
      }
    }
  }
}
