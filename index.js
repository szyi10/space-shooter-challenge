let initialVelocity = 3
let gameStarted = false
const startingScreen = document.getElementById("startingScreen")

if (!gameStarted) {
  startingScreen.style.display = "flex"
} else {
  startingScreen.style.display = "none"
}

document.querySelector("#startButton").addEventListener("click", () => {
  localStorage.setItem("gameStarted", "true")
  gsap.to("#startingScreen", {
    top: "-100%",
    display: "none",
  })
})

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 520

ctx.fillRect(0, 0, canvas.width, canvas.height)

const player = new Ship({
  position: { x: 60, y: 0 },
  velocity: { x: 0, y: 0 },
  imageSrc: "./assets/images/spaceship_small_red.png",
  scale: 2.5,
})

const keys = {
  w: { pressed: false },
  s: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
}

function animate() {
  window.requestAnimationFrame(animate)

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // background.update()

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player.update()

  player.velocity.x = 0
  player.velocity.y = 0

  // player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -3
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 3
  }

  if (keys.w.pressed) {
    player.velocity.y = 3
  } else if (keys.s.pressed) {
    player.velocity.y = -3
  }
}

animate()

window.addEventListener("keydown", keyDowns)
window.addEventListener("keyup", keyUps)
