const btnEmpezar = document.querySelector('.btn-empezar')
const pantallaInicio = document.querySelector('.paginaInicio')
const pantallaFinal = document.querySelector('.paginaFinal')
const pantallaJuego = document.querySelector('.paginaGame')
const btnTerminaar = document.querySelector('.btn-reempezar')

btnEmpezar.addEventListener('click', () => {
  pantallaInicio.style.display = 'none'
  pantallaJuego.style.display = 'flex'
  gameStart()
})
btnTerminaar.addEventListener('click', () => {
  pantallaInicio.style.display = 'flex'
  pantallaFinal.style.display = 'none'
  mySong.pause()
  mySong.currentTime = 0
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

  gameIntervalId = setInterval(() => {
    loop()
  }, Math.round(1000 / 60))
  obastculoIntervalIn = setInterval(() => {
    addObstaculos()
  }, frecuenciaOstaculo)

  actualizarPuntosEnPantalla()
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
  detectorColisionRollerObjetos()
  detectarObstaculos()
  moverCarretera()
}
let obstaculoAlternator = 0
let obstaculaAltura = 250
function addObstaculos() {
  const randomPositionY = Math.floor(
    Math.random() * (carretera.offsetHeight * 0.2 - obstaculaAltura) +
      carretera.offsetHeight * 0.4
  )
  const espaciadoAdicional = Math.floor(Math.random() * 100)
  const tipoSeleccionado = Ostaculos.seleccionarTipo()
  const imagenSeleccionada = Ostaculos.seleccionarImagen()
  if (tipoSeleccionado === 'arriba') {
    let newObstaculoArriba = new Ostaculos(
      randomPositionY + 170 + espaciadoAdicional,
      imagenSeleccionada
    )
    obstaculos.push(newObstaculoArriba)
  } else if (obstaculoAlternator === 'abajo') {
    let newObstaculoAbajo = new Ostaculos(
      randomPositionY + 10 + espaciadoAdicional,
      imagenSeleccionada
    )
    obstaculos.push(newObstaculoAbajo)
  } else {
    let newObstaculoCentro = new Ostaculos(
      randomPositionY + 75 + espaciadoAdicional,
      imagenSeleccionada
    )
    obstaculos.push(newObstaculoCentro)
  }
  obstaculoAlternator++
}

window.addEventListener('keydown', (event) => {
  if (event.key === 's') {
    roller.move('up')
  } else if (event.key === 'w') {
    roller.move('down')
  } else if (event.key === 'd') {
    roller.move('recto')
  } else if (event.key === 'a') {
    roller.move('atras')
  }
})

function detectarObstaculos() {
  if (obstaculos.length === 0) {
    return //sie el arry esta vacio no se ejecuta
  }
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    if (obstaculos[i].x + obstaculos[i].w <= 0) {
      obstaculos[i].node.remove()
      obstaculos.splice(i, 1)
    }
  }
}
function detectorColisionRollerObjetos() {
  obstaculos.forEach((cadaObstaculo) => {
    // El 0.3 es la parte frontal y el 0.7 es la parte trasera  el .0.9 es la parte inferios se refiere a los porcentajes
    if (
      roller.x + roller.w * 0.3 < cadaObstaculo.x + cadaObstaculo.w * 0.7 &&
      roller.x + roller.w * 0.7 > cadaObstaculo.x + cadaObstaculo.w * 0.3 &&
      roller.y + roller.h * 0.9 < cadaObstaculo.y + cadaObstaculo.h &&
      roller.y + roller.h > cadaObstaculo.y + cadaObstaculo.h * 0.9
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
  pantallaJuego.style.display = 'none'
  pantallaFinal.style.display = 'flex'
  carretera.innerHTML = ''
  roller = null
  obstaculos = []
}
function cogerNombre() {
  const nombreDelJugador = document.querySelector('#inputName').value

  if (nombreDelJugador) {
    console.log(nombreDelJugador)
  }
}

const playMusicBtn = document.getElementById('playSong')
const mySong = document.getElementById('mySong')

playMusicBtn.addEventListener('click', function () {
  if (mySong.paused) {
    mySong.play()
    playMusicBtn.textContent = 'Pausar música'
  } else {
    mySong.pause()
    playMusicBtn.textContent = 'Reproducir música'
  }
})

const actualizarPuntosEnPantalla = () => {
  const puntuarElemento = document.querySelector('.puntos')
  if (puntuarElemento) {
    puntuarElemento.innerText = `Puntos:${roller.puntuar()}`
  }
}
