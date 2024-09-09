class Roller {
  constructor() {
    this.x = 0
    this.y = 300
    this.h = 300
    this.w = 200
    this.velocidad = 4
    this.jumpSpeed = 30
    // al crear el pollito:

    // 1. añadir el pollito al DOM
    this.node = document.createElement('img')
    this.node.src = './image/roller.png'
    pantallaJuego.append(this.node)

    // 2. ajustamos sus dimensiones y posiciones
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = 'absolute' // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  move(direction) {
    if (direction === 'up') {
      this.y += this.velocidad
    } else if (direction === 'down') {
      this.y -= this.velocidad
    } else if (direction === 'recto') {
      this.x += this.velocidad
    } else if (direction === 'atras') {
      this.x -= this.velocidad
    }
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  /*jump() {
    this.y -= this.jumpSpeed
    this.x += this.velocidad
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }*/
}