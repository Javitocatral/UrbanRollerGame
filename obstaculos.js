class Ostaculos {
  constructor(positionY, velodidad) {
    this.x = carretera.offsetWidth
    this.y = positionY + this.seleccionarTipo()
    this.h = 250
    this.w = 200
    this.speed = velodidad
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
    const tiposObstaculos = [170, 134, 98, 62, 26]
    return tiposObstaculos[Math.floor(Math.random() * tiposObstaculos.length)]
  }
  seleccionarImagen() {
    const imagenesObstaculos = [
      './image/vieja.png',
      './image/perro.png',
      './image/nino.png',
      './image/caca.png',
      './image/basura.png',
      './image/gato.png',
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
