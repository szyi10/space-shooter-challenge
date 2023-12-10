// Size and placement of ship
const shipWidth = 50
const shipHeight = 50
let shipX = canvas.width / 2 - shipWidth / 2
let shipY = canvas.height - shipHeight - 20
let shipSpeed = 3
let moveLeft = false
let moveRight = false
let moveUp = false
let moveDown = false

let bulletSpeed = 12
let bullets = []
let canShoot = true // Flag that prevent holding space and shooting

const shipTexture = new Image()
shipTexture.src = "assets/images/spaceship_small_red.png"

const bulletTexture = new Image()
bulletTexture.src = "assets/images/blue-bullet.png"

function drawShip() {
  ctx.drawImage(shipTexture, shipX, shipY, shipWidth, shipHeight)
}

function moveShipLeft() {
  if (!gamePaused) {
    ctx.clearRect(shipX, shipY, shipWidth, shipHeight)

    shipX -= shipSpeed
    if (shipX < 5) {
      shipX = 5
    }

    drawShip()
  }
}

function moveShipRight() {
  if (!gamePaused) {
    ctx.clearRect(shipX, shipY, shipWidth, shipHeight)

    shipX += shipSpeed
    if (shipX + shipWidth > canvas.width - 5) {
      shipX = canvas.width - shipWidth - 5
    }

    drawShip()
  }
}

function moveShipUp() {
  if (!gamePaused) {
    ctx.clearRect(shipX, shipY, shipWidth, shipHeight)

    shipY -= shipSpeed
    if (shipY < canvas.height / 2) {
      shipY = canvas.height / 2
    }

    drawShip()
  }
}

function moveShipDown() {
  if (!gamePaused) {
    ctx.clearRect(shipX, shipY, shipWidth, shipHeight)

    shipY += shipSpeed
    if (shipY > canvas.height - shipHeight - 5) {
      shipY = canvas.height - shipHeight - 5
    }

    drawShip()
  }
}

function listenMovement() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveLeft = true
    if (event.key === "ArrowRight") moveRight = true
    if (event.key === "ArrowUp") moveUp = true
    if (event.key === "ArrowDown") moveDown = true
  })

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") moveLeft = false
    if (event.key === "ArrowRight") moveRight = false
    if (event.key === "ArrowUp") moveUp = false
    if (event.key === "ArrowDown") moveDown = false
  })
}

function updateBullets() {
  for (let bullet of bullets) {
    bullet.y -= bulletSpeed

    // Detection of a bullet hitting an enemy
    for (let i = 0; i < enemies.length; i++) {
      if (
        bullet.x < enemies[i].x + enemyWidth &&
        bullet.x + 5 > enemies[i].x &&
        bullet.y < enemies[i].y + enemyHeight &&
        bullet.y + 10 > enemies[i].y
      ) {
        bullets.splice(bullets.indexOf(bullet), 1)
        enemies.splice(i, 1)

        score += 100
        break
      }
    }

    // Removing the bullet if it flies off the screen
    if (bullet.y < 0) {
      bullets.splice(bullets.indexOf(bullet), 1)
    }
  }
}

function drawBullets() {
  for (let bullet of bullets) {
    ctx.drawImage(bulletTexture, bullet.x, bullet.y, 10, 15)
  }
}

function listenShooting() {
  document.addEventListener("keydown", (event) => {
    if (!gamePaused) {
      if (event.key === " " && canShoot) {
        bullets.push({
          x: shipX + shipWidth / 2 - 2.5,
          y: shipY,
        })
        shootSound.currentTime = 0
        shootSound.volume = 0.25
        shootSound.play()
        canShoot = false
      }
    }
  })
  document.addEventListener("keyup", (event) => {
    if (event.key === " ") {
      canShoot = true
    }
  })
}
