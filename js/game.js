// Game initialization
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let lives = 3
let score = 0
let gameRunning = true
let gamePaused = false
let enemiesInterval, enemiesUpdateInterval, bulletsUpdateInterval

const backgroundImage = new Image()
backgroundImage.src = "assets/images/space_bk.png"

const shootSound = new Audio("assets/sounds/laser3.wav")

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
}

// Draw simple elements of background (stars, asteroids)
// function drawEnviroment() {
//   ctx.fillStyle = "black"
//   ctx.fillRect(0, 0, canvas.width, canvas.height)

//   drawStars()
// }

function drawUI() {
  ctx.fillStyle = "white"
  ctx.font = "42px VT323"
  ctx.fillText("Lives: " + lives, canvas.width - 160, 50)
  ctx.fillText("Score: " + score, 20, 50)
}

function resetGame() {
  lives = 3
  score = 0
  gameRunning = true
  gamePaused = false
  bulletSpeed = 12
  bullets = []
  enemySpeed = 5
  enemies = []
  shipX = canvas.width / 2 - shipWidth / 2
  shipY = canvas.height - shipHeight - 20
  shipSpeed += 0

  clearInterval(enemiesInterval)
  clearInterval(enemiesUpdateInterval)
  clearInterval(bulletsUpdateInterval)
}

// Main game function
function main() {
  resetGame()

  // Movement event listeners
  listenMovement()

  // Creating new enemies each 2 seconds
  enemiesInterval = setInterval(createEnemies, 2000)
  // Updating position of enemies each 30 miliseconds
  enemiesUpdateInterval = setInterval(updateEnemies, 30)
  // Updating position of bullets each 30 miliseconds
  bulletsUpdateInterval = setInterval(updateBullets, 30)

  // Shooting event listeners
  listenShooting()

  function update() {
    if (moveLeft) moveShipLeft()
    if (moveRight) moveShipRight()
    if (moveUp) moveShipUp()
    if (moveDown) moveShipDown()

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground()
    drawEnemies()
    drawShip()
    drawBullets()
    drawUI()

    if (gameRunning) {
      requestAnimationFrame(update)
    } else {
      cancelAnimationFrame(update)
      if (currentScreen != "start") {
        gameOverScreen.style.display = "block"
        scoreElement.innerText = score
      }
    }
  }

  update()
}
