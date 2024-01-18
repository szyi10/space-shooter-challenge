function showResetScreen({ player }) {
  document.getElementById("resetScreen").style.display = "block"
  gsap.to("#resetScreen", { top: "50%" })

  if (player.health === 0) player.dead = true
}

function keyDowns(e) {
  if (!player.dead) {
    switch (e.key) {
      case "d":
        keys.d.pressed = true
        player.lastKey = "d"
        break
      case "a":
        keys.a.pressed = true
        player.lastKey = "a"
        break
      case "w":
        player.velocity.y = -10
        break
      case "s":
        player.velocity.y = 10
        break
      case " ":
        player.attack()
        break
    }
  }
}

function keyUps(e) {
  switch (e.key) {
    case "d":
      keys.d.pressed = false
      break
    case "a":
      keys.a.pressed = false
      break
    case "w":
      keys.w.pressed = false
      break
    case "s":
      keys.s.pressed = false
      break
  }
}
