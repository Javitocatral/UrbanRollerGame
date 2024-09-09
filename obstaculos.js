class Ostaculos {
  constructor(positionY, type) {
    this.x = pantallaJuego.offsetWidth
    this.y = positionY
    this.h = 300
    this.w = 150
    this.speed = 2
    // 1. añadir el tuberia al DOM
    this.node = document.createElement('img')
    if (type === 'arriba') {
      this.node.src = './image/señora.png'
    } else if (type === 'abajo') {
      this.node.src = './image/perrito.png'
    } else if (type === 'centro') {
      this.node.src = './image/niño.png'
    }
    pantallaJuego.append(this.node)
    // 2. ajustamos sus dimensiones y posiciones
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = 'absolute' // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  automaticMovement() {
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
}
