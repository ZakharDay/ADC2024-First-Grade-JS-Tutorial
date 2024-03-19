const state = {
  mouseDown: false,
  currentCircle: 0,
  linesShow: [false, false, false, false]
}

function resetState() {
  state.mouseDown = false
  state.currentCircle = 0
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function calcAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1)
}

function getElementCors(element) {
  const { x, y, width, height } = element.getBoundingClientRect()

  return {
    x,
    y,
    width,
    height
  }
}

function createCircles(quantity) {
  const circlesSection = document.getElementById('circlesSection')

  for (let index = 0; index < quantity; index++) {
    const circleElement = document.createElement('div')
    circleElement.classList.add('circle')
    circleElement.innerText = index + 1
    circlesSection.appendChild(circleElement)

    initCircle(circleElement)
  }
}

function initDocument() {
  document.addEventListener('mousemove', (e) => {
    if (state.mouseDown === true) {
      drawLine(e)
    }
  })

  document.addEventListener('mouseup', () => {
    resetState()
    eraseLine()
  })
}

function initCircles() {
  const circles = document.getElementsByClassName('circle')

  for (let index = 0; index < circles.length; index++) {
    const circleElement = circles[index]
    initCircle(circleElement)
  }
}

function initCircle(circleElement) {
  const { width, height } = circleElement.getBoundingClientRect()

  const sectionWidth = circlesSection.getBoundingClientRect().width
  const sectionHeight = circlesSection.getBoundingClientRect().height

  circleElement.style.top = `${getRandomArbitrary(0, sectionHeight - height)}px`
  circleElement.style.left = `${getRandomArbitrary(0, sectionWidth - width)}px`

  circleElement.addEventListener('mousedown', (e) => {
    state.mouseDown = true
    state.currentCircle = Number(e.target.id.slice(-1))
  })

  circleElement.addEventListener('mouseup', (e) => {
    if (state.currentCircle + 1 === Number(e.target.id.slice(-1))) {
      state.linesShow[state.currentCircle - 1] = true
    }

    if (state.currentCircle - 1 === Number(e.target.id.slice(-1))) {
      state.linesShow[state.currentCircle - 2] = true
    }

    resetState()
  })
}

function checkAndPaintBackground() {
  if (state.mouseDown === true) {
    document.body.style.backgroundColor = 'lightgrey'
  } else {
    document.body.style.backgroundColor = 'white'
  }
}

function drawLine(e) {
  const currentCircleElement = document.getElementById(
    `circle_${state.currentCircle}`
  )

  const line = document.querySelector('.line')

  const { x, y, width, height } = currentCircleElement.getBoundingClientRect()

  const x1 = x + width / 2
  const y1 = y + height / 2

  const x2 = e.pageX
  const y2 = e.pageY

  const distance = calcDistance(x1, y1, x2, y2)
  const angle = calcAngle(x1, y1, x2, y2)

  line.style.top = `${y1}px`
  line.style.left = `${x1}px`
  line.style.width = `${distance}px`
  line.style.transform = `rotate(${angle}rad)`
}

function eraseLine() {
  const line = document.querySelector('.line')
  line.style.width = 0
}

function drawLines() {
  state.linesShow.forEach((lineState, index) => {
    if (lineState === true) {
      const lineElement = document.getElementById(`line_${index + 1}`)

      const circleFrom = document.getElementById(`circle_${index + 1}`)
      const circleTo = document.getElementById(`circle_${index + 2}`)

      const circleFromCors = getElementCors(circleFrom)
      const circleToCors = getElementCors(circleTo)

      const x1 = circleFromCors.x + circleFromCors.width / 2
      const y1 = circleFromCors.y + circleFromCors.height / 2

      const x2 = circleToCors.x + circleToCors.width / 2
      const y2 = circleToCors.y + circleToCors.height / 2

      const distance = calcDistance(x1, y1, x2, y2)
      const angle = calcAngle(x1, y1, x2, y2)

      lineElement.style.top = `${y1}px`
      lineElement.style.left = `${x1}px`
      lineElement.style.width = `${distance}px`
      lineElement.style.transform = `rotate(${angle}rad)`
    }
  })
}

function cycle() {
  setInterval(() => {
    checkAndPaintBackground()
    drawLines()
  }, 1000 / 60)
}

document.addEventListener('DOMContentLoaded', () => {
  // createCircles(100)
  initCircles()
  initDocument()
  cycle()
})
