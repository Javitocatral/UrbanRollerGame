class Recompensa {
  constructor(positionY, velocidad) {
    this.x = carretera.offsetWidth
    this.y = positionY + this.seleccionarTipo()
    this.h = 50
    this.w = 20
    this.speed = velocidad
    this.yaPuntuo = false

    this.node = document.createElement('img')
    this.node.src = './image/refresco.png'
    carretera.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = 'absolute' // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  seleccionarTipo() {
    const tiposObstaculos = [152, 116, 80, 44, 8]
    return tiposObstaculos[Math.floor(Math.random() * tiposObstaculos.length)]
  }
  automaticMovement() {
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
}
