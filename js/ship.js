// Size and placement of ship
const shipWidth = 50
const shipHeight = 50
let shipX = canvas.width / 2 - shipWidth / 2
let shipY = canvas.height - shipHeight - 20
let initalShipSpeed = 3
let shipSpeed = initalShipSpeed
let movement = {
  left: false,
  right: false,
  up: false,
  down: false,
}
let lastKeyPressed = null

let bulletSpeed = 12
let bulletDamage = 100
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

function handleKeyPress() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      movement.left = true

      if (!lastKeyPressed) lastKeyPressed = "left"
    }
    if (event.key === "ArrowRight" || event.key === "d") {
      movement.right = true
      if (!lastKeyPressed) lastKeyPressed = "right"
    }

    if (event.key === "ArrowUp" || event.key === "w") {
      movement.up = true

      if (!lastKeyPressed) lastKeyPressed = "up"
    }
    if (event.key === "ArrowDown" || event.key === "s") {
      movement.down = true

      if (!lastKeyPressed) lastKeyPressed = "down"
    }
  })

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      movement.left = false
    }
    if (event.key === "ArrowRight" || event.key === "d") {
      movement.right = false
    }

    if (event.key === "ArrowUp" || event.key === "w") {
      movement.up = false
    }
    if (event.key === "ArrowDown" || event.key === "s") {
      movement.down = false
    }

    if (
      (event.key === "ArrowLeft" ||
        event.key === "a" ||
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "ArrowUp" ||
        event.key === "w" ||
        event.key === "ArrowDown" ||
        event.key === "s") &&
      ((movement.left && lastKeyPressed !== "left") ||
        (movement.right && lastKeyPressed !== "right") ||
        (movement.up && lastKeyPressed !== "up") ||
        (movement.down && lastKeyPressed !== "down"))
    ) {
      lastKeyPressed = null
    }
  })
}

function updateShipMovement() {
  if (movement.left && !movement.right) moveShipLeft()
  if (!movement.left && movement.right) moveShipRight()
  if (movement.up && !movement.down) moveShipUp()
  if (movement.down && !movement.up) moveShipDown()

  let diagonalSpeed = 1

  if (movement.left && movement.up) {
    moveShipLeft()
    moveShipUp()
    shipSpeed = diagonalSpeed
  }
  if (movement.right && movement.up) {
    moveShipRight()
    moveShipUp()
    shipSpeed = diagonalSpeed
  }
  if (movement.left && movement.down) {
    moveShipLeft()
    moveShipDown()
    shipSpeed = diagonalSpeed
  }
  if (movement.right && movement.down) {
    moveShipRight()
    moveShipDown()
    shipSpeed = diagonalSpeed
  }

  if (
    !(movement.left && movement.up) &&
    !(movement.right && movement.up) &&
    !(movement.left && movement.down) &&
    !(movement.right && movement.down)
  ) {
    shipSpeed = initalShipSpeed
  }
}

function updateBullets() {
  for (let bullet of bullets) {
    bullet.y -= bulletSpeed

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
