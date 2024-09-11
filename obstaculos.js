class Ostaculos {
  constructor(positionY) {
    this.x = carretera.offsetWidth
    this.y = positionY + this.seleccionarTipo()
    this.h = 250
    this.w = 150
    this.speed = 2
    this.yaPuntuo = false

    this.node = document.createElement('img')
    this.node.src = this.seleccionarImagen()

    carretera.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = 'absolute' // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  seleccionarTipo() {
    const tiposObstaculos = [170, 75, 10]
    return tiposObstaculos[Math.floor(Math.random() * tiposObstaculos.length)]
  }
  seleccionarImagen() {
    const imagenesObstaculos = [
      './image/vieja.png',
      './image/perro.png',
      './image/nino.png',
      './image/caca.png',
    ]
    return imagenesObstaculos[
      Math.floor(Math.random() * imagenesObstaculos.length)
    ]
  }
  automaticMovement() {
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
}
