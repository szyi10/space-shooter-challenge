// Starting Screen
const startButton = document.getElementById("startButton")
const startScreen = document.querySelector(".start-screen")
let currentScreen = "start"

startButton.addEventListener("click", () => {
  startScreen.style.display = "none"
  canvas.style.display = "block"
  currentScreen = ""
  main()
})

// Pause Menu
const pauseMenu = document.querySelector(".pause-menu")
const resumeButton = document.getElementById("resumeButton")
const quitButton = document.getElementById("quitButton")

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && currentScreen != "start") {
    if (!gamePaused) {
      pauseGame()
    } else {
      resumeGame()
    }
  }
})

function pauseGame() {
  gamePaused = true
  pauseMenu.style.display = "block"

  clearInterval(enemiesInterval)
  clearInterval(enemiesUpdateInterval)
  clearInterval(bulletsUpdateInterval)
}

function resumeGame() {
  gamePaused = false
  pauseMenu.style.display = "none"

  enemiesInterval = setInterval(createEnemies, 2000)
  enemiesUpdateInterval = setInterval(updateEnemies, 30)
  bulletsUpdateInterval = setInterval(updateBullets, 30)
}

resumeButton.addEventListener("click", resumeGame)
quitButton.addEventListener("click", () => {
  gamePaused = false
  gameRunning = false
  gameOverScreen.style.display = "none"
  pauseMenu.style.display = "none"
  startScreen.style.display = "flex"
  canvas.style.display = "none"
  currentScreen = "start"
})

// Game over
const gameOverScreen = document.querySelector(".game-over")
const scoreElement = document.querySelector(".score-element")
const closeButton = document.getElementById("closeButton")

closeButton.addEventListener("click", () => {
  gameOverScreen.style.display = "none"
  startScreen.style.display = "flex"
  canvas.style.display = "none"
  currentScreen = "start"
})
