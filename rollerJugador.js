let puntos = 0
class Roller {
  constructor() {
    this.x = 20
    this.y = 400
    this.h = 300
    this.w = 200
    this.velocidad = 5
    this.jumpSpeed = 30
    this.colisiones = 0
    // al crear el pollito:

    // 1. añadir el pollito al DOM
    this.node = document.createElement('img')
    this.node.src = './image/roller.png'
    carretera.append(this.node)

    // 2. ajustamos sus dimensiones y posiciones
    this.node.style.width = `${this.w}px`

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
  puntuar() {
    puntos += 0.5
    return puntos
  }
}
