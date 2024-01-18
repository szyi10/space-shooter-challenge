class Sprite {
  constructor({ position, imageSrc, scale = 1 }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()
  }
}

class Ship extends Sprite {
  constructor({ position, velocity, color = "red", imageSrc, scale = 1 }) {
    super({
      position,
      imageSrc,
      scale,
    })

    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.color = color
    this.isAttacking
    this.health = 100
    this.dead = false
  }

  update() {
    this.draw()

    // Draw ship hitboxes
    // ctx.fillStyle = "green"
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height >= canvas.height) {
      this.velocity.y = 0
      this.position.y = canvas.height - this.height
    }

    if (this.position.y <= 200) {
      this.velocity.y = 0
      this.position.y = 200
    }

    if (this.position.x + this.width >= canvas.width) {
      this.velocity.x = 0
      this.position.x = canvas.width - 50
    }

    if (this.position.x + this.width <= 50) {
      this.velocity.x = 0
      this.position.x = 0
    }
  }

  attack() {
    this.isAttacking = true
  }

  takeHit() {
    this.health -= 20
  }
}
