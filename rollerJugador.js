let puntos = 0
class Roller {
  constructor() {
    this.x = 20
    this.y = 400
    this.h = 300
    this.w = 200
    this.velocidad = 6
    this.colisiones = 0
    this.limitUp = false
    this.limitdown = false

    this.node = document.createElement('img')
    this.node.src = './image/patinadora.png'
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
    if (direction === 'up' && !this.limitUp) {
      this.y -= this.velocidad
    } else if (direction === 'down' && !this.limitdown) {
      this.y += this.velocidad
    } else if (direction === 'recto') {
      this.x += this.velocidad
    } else if (direction === 'atras') {
      this.x -= this.velocidad
    }
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  puntuar(num) {
    puntos += num
    return puntos
  }
}
