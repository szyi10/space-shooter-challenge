const enemyTypes = [
  {
    textureSrc: "assets/images/enemy1.png",
    width: 70,
    height: 70,
    speed: 5,
    initialHealth: 300,
  },
  {
    textureSrc: "assets/images/enemy2.png",
    width: 80,
    height: 80,
    speed: 4,
    initialHealth: 500,
  },
  {
    textureSrc: "assets/images/enemy3.png",
    width: 60,
    height: 60,
    speed: 6,
    initialHealth: 200,
  },
]

let enemies = []

for (let enemy of enemies) {
  enemy.health = enemyTypes[enemy.type].initialHealth
}

function chooseRandomEnemyType() {
  return enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
}

function drawHealthBar(enemy) {
  const healthBarWidth = 30
  const healthBarHeight = 5

  const healthBarFill =
    (enemy.health / enemyTypes[enemy.type].initialHealth) * healthBarWidth

  ctx.fillStyle = "red"
  ctx.fillRect(enemy.x, enemy.y - 10, healthBarFill, healthBarHeight)
}

function drawEnemies() {
  for (let enemy of enemies) {
    ctx.drawImage(enemy.texture, enemy.x, enemy.y, enemy.width, enemy.height)
    drawHealthBar(enemy)
  }
}

function createEnemies() {
  const enemyType = chooseRandomEnemyType()

  enemies.push({
    x: Math.random() * (canvas.width - enemyType.width),
    y: 0,
    texture: new Image(),
    width: enemyType.width,
    height: enemyType.height,
    speed: enemyType.speed,
    type: enemyTypes.indexOf(enemyType),
    health: enemyType.initialHealth,
  })

  enemies[enemies.length - 1].texture.src = enemyType.textureSrc
}

function updateEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i]
    enemy.y += enemy.speed

    if (checkPlayerCollision(enemy)) {
      lives--
      resetEnemyPosition(enemy)
      if (lives === 0) {
        gameRunning = false
      }
    }

    for (let bullet of bullets) {
      if (checkBulletCollision(bullet, enemy)) {
        enemy.health -= bulletDamage
        bullets.splice(bullets.indexOf(bullet), 1)

        if (enemy.health <= 0) {
          enemies.splice(i, 1)
          score += 100
          i--
        }

        break
      }
    }

    if (enemy.y > canvas.height) {
      resetEnemyPosition(enemy)
    }
  }
}

function checkPlayerCollision(enemy) {
  return (
    shipX < enemy.x + enemy.width &&
    shipX + shipWidth > enemy.x &&
    shipY < enemy.y + enemy.height &&
    shipY + shipHeight > enemy.y
  )
}

function checkBulletCollision(bullet, enemy) {
  return (
    bullet.x < enemy.x + enemy.width &&
    bullet.x + 5 > enemy.x &&
    bullet.y < enemy.y + enemy.height &&
    bullet.y + 10 > enemy.y
  )
}

function resetEnemyPosition(enemy) {
  enemy.y = 0
  enemy.x = Math.random() * (canvas.width - enemy.width)
  enemy.health = enemyTypes[enemy.type].initialHealth
}
