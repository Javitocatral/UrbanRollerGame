const btnEmpezar = document.querySelector('.btn-empezar')
const pantallaInicio = document.querySelector('.paginaInicio')
const pantallaFinal = document.querySelector('.paginaFinal')
const pantallaJuego = document.querySelector('.paginaGame')

btnEmpezar.addEventListener('click', () => {
  pantallaInicio.style.display = 'none'
  pantallaJuego.style.display = 'flex'
  gameStart()
})
const carreteraFondo = {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  velocidad: 4,
}
let roller = null
let obstaculos = []
let frecuenciaOstaculo = 1500
let obastculoIntervalIn = null
let gameIntervalId = null

//Mover la imgen de fondo
//hacer el loop unfinito
//introducir el jugador y hacer el movimiento
//introducir los obstaculos
// crear la colision
//sitema de puntos
//sistema de niveles
function gameStart() {
  roller = new Roller()
  console.log(roller)
  gameIntervalId = setInterval(() => {
    loop()
  }, Math.round(1000 / 60))
  obastculoIntervalIn = setInterval(() => {
    addObstaculos()
  }, frecuenciaOstaculo)
  cogerNombre()
}

const carretera = document.querySelector('.carretera')
function moverCarretera() {
  carreteraFondo.x -= carreteraFondo.velocidad
  carretera.style.backgroundPositionX = `${carreteraFondo.x}px `
  if (carreteraFondo.x <= window.innerHeight) {
    carreteraFondo.y = 0
  }
}
function loop() {
  obstaculos.forEach((cadaObstaculo) => {
    cadaObstaculo.automaticMovement()
  })
  detectarObstaculos()
  detectarColisonPollitoTiube()
  moverCarretera()
}
let obstaculoAlternator = 0
let obstaculaAltura = 300
function addObstaculos() {
  const randomPositionY = Math.floor(
    Math.random() * (pantallaJuego.offsetHeight * 0.35 - obstaculaAltura) +
      pantallaJuego.offsetHeight * 0.35
  )
  if (obstaculoAlternator % 3 === 0) {
    let newObstaculoArriba = new Ostaculos(randomPositionY + 170, 'arriba')
    obstaculos.push(newObstaculoArriba)
  } else if (obstaculoAlternator % 3 === 1) {
    let newObstaculoAbajo = new Ostaculos(randomPositionY + 10, 'abajo')
    obstaculos.push(newObstaculoAbajo)
  } else {
    let newObstaculoCentro = new Ostaculos(randomPositionY + 75, 'centro')
    obstaculos.push(newObstaculoCentro)
  }
  obstaculoAlternator++
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'x') {
    roller.move('up')
  } else if (event.key === 's') {
    roller.move('down')
  } else if (event.key === 'c') {
    roller.move('recto')
  } else if (event.key === 'z') {
    roller.move('atras')
  }
})
/*pantallaJuego.addEventListener('click', () => {
  roller.jump()
})*/
function detectarObstaculos() {
  if (obstaculos.length === 0) {
    return //sie el arry esta vacio no se ejecuta
  }
  if (obstaculos[0].x + obstaculos[0].w <= 0) {
    // tuberiasArray.splice(0, 1)
    obstaculos[0].node.remove() // 1. Sacar del DOM
    obstaculos.shift() // 2. Sacarlo de JS
  }
}
function detectarColisonPollitoTiube() {
  obstaculos.forEach((cadaObstaculo) => {
    const rollerPies = roller.y + roller.h
    const obstaculoPies = cadaObstaculo.y + cadaObstaculo.h

    if (
      rollerPies > obstaculoPies - 2 &&
      rollerPies < obstaculoPies + 2 &&
      roller.x + roller.w > cadaObstaculo.x &&
      roller.x < cadaObstaculo.x + cadaObstaculo.w
    ) {
      gameOver()
      console.log('cataplun')
    }
    if (
      roller.y < cadaObstaculo.y &&
      roller.x + roller.w > cadaObstaculo.x &&
      roller.x < cadaObstaculo.x + cadaObstaculo.w
    ) {
      roller.node.style.zIndex = 0
    } else if (
      roller.y > cadaObstaculo.y &&
      roller.x + roller.w > cadaObstaculo.x &&
      roller.x < cadaObstaculo.x + cadaObstaculo.w
    ) {
      roller.node.style.zIndex = 1
    }
  })
}
function gameOver() {
  clearInterval(gameIntervalId)
  clearInterval(obastculoIntervalIn)
  //gameBoxNode.innerHTML = ''
  //reiniciar
  //pollitoObj = null
  //tuberiasArray = []
  pantallaJuego.style.display = 'none'
  pantallaFinal.style.display = 'flex'
}
function cogerNombre() {
  const nombreDelJugador = document.querySelector('#inputName').value

  if (nombreDelJugador) {
    console.log(nombreDelJugador)
  }
}
