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
  loop()
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
  setInterval(() => {
    moverCarretera()
  }, Math.round(1000 / 60))
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
pantallaJuego.addEventListener('click', () => {
  roller.jump()
})
