const btnEmpezar = document.querySelector('.btn-empezar')
const pantallaInicio = document.querySelector('.paginaInicio')
const pantallaFinal = document.querySelector('.paginaFinal')
const pantallaJuego = document.querySelector('.paginaGame')
const btnTerminaar = document.querySelector('.btn-reempezar')
const mySong = document.getElementById('mySong')

btnEmpezar.addEventListener('click', () => {
  pantallaInicio.style.display = 'none'
  pantallaJuego.style.display = 'flex'

  mySong.play()
  mySong.volume = 0.05

  gameStart()
  recuperarPuntuciones()
})
btnTerminaar.addEventListener('click', () => {
  pantallaInicio.style.display = 'flex'
  pantallaFinal.style.display = 'none'
  mySong.pause()
  mySong.currentTime = 0
  puntuarElemento.innerText = `Puntos: 0`
  recuperarPuntuciones()
})

const carreteraFondo = {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  velocidad: 3,
}
let roller = null
let obstaculos = []
let frecuenciaOstaculo = 1500
let obastculoIntervalIn = null
let gameIntervalId = null
let recompensaArray = []

//Mover la imgen de fondo
//hacer el loop unfinito
//introducir el jugador y hacer el movimiento
//introducir los obstaculos
// crear la colision
//sitema de puntos
//sistema de niveles

function gameStart() {
  roller = new Roller()
  roller.colisiones = 0

  addVidas()
  gameIntervalId = setInterval(() => {
    loop()
  }, Math.round(1000 / 60))
  obastculoIntervalIn = setInterval(() => {
    addObstaculos()
    addRecompensa()
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
  recompensaArray.forEach((cadaRecompesa) => {
    cadaRecompesa.automaticMovement()
  })
  moverCarretera()
  colisonGameOver()
  detectarCruces()
  detectarCrucePuntuar()
  detectarObstaculos()
  detectionBorderLimit()
  detectarRecompensa()
}
let obstaculoAlternator = 0
let obstaculaAltura = 250

function addObstaculos() {
  const randomPositionY = Math.floor(
    Math.random() * (carretera.offsetHeight * 0.25 - obstaculaAltura) +
      carretera.offsetHeight * 0.4
  )
  const espaciadoAdicional = Math.floor(Math.random() * 100)
  let nuevoObastaculo = new Ostaculos(randomPositionY + espaciadoAdicional)
  obstaculos.push(nuevoObastaculo)
  obstaculoAlternator++
}
function addRecompensa() {
  const randomPositionY = Math.floor(
    Math.random() * (carretera.offsetHeight * 0.5 - obstaculaAltura) +
      carretera.offsetHeight * 0.5
  )
  const espaciadoAdicional = Math.floor(Math.random() * 50)
  let nuevaRecompensa = new Recompensa(randomPositionY + espaciadoAdicional)
  recompensaArray.push(nuevaRecompensa)
}

window.addEventListener('keydown', (event) => {
  if (event.key === 's') {
    roller.move('down')
  } else if (event.key === 'w') {
    roller.move('up')
  } else if (event.key === 'd') {
    roller.move('recto')
  } else if (event.key === 'a') {
    roller.move('atras')
  }
})
function detectionBorderLimit() {
  if (roller.y >= pantallaJuego.offsetHeight - roller.h) {
    roller.limitdown = true
  } else {
    roller.limitdown = false
  }
  if (roller.y <= pantallaJuego.offsetHeight * 0.3) {
    roller.limitUp = true
  } else {
    roller.limitUp = false
  }
}

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

function detectarCrucePuntuar() {
  obstaculos.forEach((cadaObstaculo) => {
    if (
      roller.y < cadaObstaculo.y &&
      roller.x + roller.w > cadaObstaculo.x &&
      roller.x < cadaObstaculo.x + cadaObstaculo.w &&
      !cadaObstaculo.yaPuntuo
    ) {
      roller.puntuar()
      actualizarPuntosEnPantalla()
      cadaObstaculo.yaPuntuo = true
    } else if (
      roller.y > cadaObstaculo.y &&
      roller.x + roller.w > cadaObstaculo.x &&
      roller.x < cadaObstaculo.x + cadaObstaculo.w &&
      !cadaObstaculo.yaPuntuo
    ) {
      roller.puntuar()
      actualizarPuntosEnPantalla()
      cadaObstaculo.yaPuntuo = true
    }
  })
}
function detectarCruces() {
  obstaculos.forEach((cadaObstaculo) => {
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
function detectarRecompensa() {
  recompensaArray.forEach((cadaRecompesa, index) => {
    if (
      roller.x + roller.w * 0.3 < cadaRecompesa.x + cadaRecompesa.w * 0.7 &&
      roller.x + roller.w * 0.7 > cadaRecompesa.x + cadaRecompesa.w * 0.3 &&
      roller.y + roller.h * 0.9 < cadaRecompesa.y + cadaRecompesa.h &&
      roller.y + roller.h > cadaRecompesa.y + cadaRecompesa.h * 0.9
    ) {
      cadaRecompesa.node.remove()
      roller.puntuar()
    }
  })
}
const collisionSound = new Audio('./audios/grito.wav')
function colisonGameOver() {
  obstaculos.forEach((cadaObstaculo, index) => {
    // El 0.3 es la parte frontal y el 0.7 es la parte trasera  el .0.9 es la parte inferios se refiere a los porcentajes

    if (
      roller.x + roller.w * 0.3 < cadaObstaculo.x + cadaObstaculo.w * 0.7 &&
      roller.x + roller.w * 0.7 > cadaObstaculo.x + cadaObstaculo.w * 0.3 &&
      roller.y + roller.h * 0.9 < cadaObstaculo.y + cadaObstaculo.h &&
      roller.y + roller.h > cadaObstaculo.y + cadaObstaculo.h * 0.9
    ) {
      roller.colisiones += 1
      cambiarImagenJugador()
      obstaculos.splice(index, 1)
      cadaObstaculo.node.remove()

      collisionSound.play()
      if (roller.colisiones <= 3) {
        arraVidas[roller.colisiones - 1].remove()
      }

      if (roller.colisiones >= 3) {
        gameOver()
        console.log('cataplun')
      }
    }
  })
}
const contenedorPuntos = document.querySelector('.contenedorFinal')
function gameOver() {
  // puntos = roller.puntos
  //nombreDelJugador = cogerNombre()
  //contenedorPuntos.innerHTML = `<h5 style="margin:0">${nombreDelJugador} .............. puntos:${puntos}</h5>`
  clearInterval(gameIntervalId)
  clearInterval(obastculoIntervalIn)
  pantallaJuego.style.display = 'none'
  pantallaFinal.style.display = 'flex'
  carretera.innerHTML = ''
  roller = null
  obstaculos = []
  guardarLocalStorage()
  recuperarPuntuciones()
}

function cogerNombre() {
  const nombreDelJugador = document.querySelector('#inputName').value

  if (!nombreDelJugador) {
    return 'Pringao'
  }
  return nombreDelJugador
}

const playMusicBtn = document.getElementById('playSong')
playMusicBtn.addEventListener('click', function () {
  if (!mySong.paused) {
    mySong.pause()
    mySong.volume = 0.05
    playMusicBtn.textContent = 'OFF'
  } else {
    mySong.play()
    playMusicBtn.textContent = 'ON'
    mySong.volume = 0.05
  }
})

const puntuarElemento = document.querySelector('.puntos')
const actualizarPuntosEnPantalla = () => {
  if (puntuarElemento) {
    puntuarElemento.innerText = `Puntos:${roller.puntuar()}`
  }
}

function cambiarImagenJugador() {
  roller.node.src = './image/crahs.png'
  roller.node.classList.add('imagenaumenta')
  setTimeout(() => {
    roller.node.src = './image/patinadora.png'
    roller.node.classList.remove('imagenaumenta')
  }, 500)
}
const vidas = document.querySelector('.vidas')
let arraVidas = []
let vidasMax = 3
function addVidas() {
  vidas.innerHTML = ''
  arraVidas = []
  for (let i = 0; i < vidasMax; i++) {
    const imgVida = document.createElement('img')
    imgVida.src = './image/vidas.png'
    imgVida.alt = 'Vida'
    vidas.appendChild(imgVida)
    arraVidas.push(imgVida)
  }
}

addVidas()

function guardarLocalStorage() {
  let nombre = cogerNombre()
  let puntosJugador = puntos
  console.log(puntosJugador)

  let nuevaPuntuacion = { nombre, puntosJugador }
  console.log('Guardando puntuación:', nuevaPuntuacion)
  let puntuaciones = JSON.parse(localStorage.getItem('puntuaciones')) || []
  puntuaciones.push(nuevaPuntuacion)
  localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones))
}
function recuperarPuntuciones() {
  contenedorPuntos.innerHTML = ''
  const puntuaciones = JSON.parse(localStorage.getItem('puntuaciones')) || []
  puntuaciones.sort((a, b) => b.puntosJugador - a.puntosJugador)
  const top5 = puntuaciones.slice(0, 5)
  top5.forEach((puntuacion) => {
    const li = document.createElement('li')
    li.textContent = `${puntuacion.nombre} .......... ${puntuacion.puntosJugador} puntos`
    contenedorPuntos.appendChild(li)
  })
}
