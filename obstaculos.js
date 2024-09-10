class Ostaculos {
  static imagenesObstaculos = [
    './image/señora.png',
    './image/perrito.png',
    './image/niño.png',
    './image/caca.png',
  ]

  constructor(positionY, imageSrc) {
    this.x = carretera.offsetWidth
    this.y = positionY
    this.h = 250
    this.w = 100
    this.speed = 2

    this.node = document.createElement('img')
    this.node.src = imageSrc

    carretera.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = 'absolute' // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  static seleccionarTipo() {
    const tiposObstaculos = ['arriba', 'abajo', 'centro']
    return tiposObstaculos[Math.floor(Math.random() * tiposObstaculos.length)]
  }
  static seleccionarImagen() {
    return Ostaculos.imagenesObstaculos[
      Math.floor(Math.random() * Ostaculos.imagenesObstaculos.length)
    ]
  }
  automaticMovement() {
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
}
