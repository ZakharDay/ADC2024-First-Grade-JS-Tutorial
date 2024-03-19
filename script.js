function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
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

  circleElement.addEventListener('click', (e) => {
    console.log(`click on ${e.target.innerText}`, width, height)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  // createCircles(100)
  initCircles()
})

// x1 =
//   square.offsetLeft + square.offsetWidth / 2 + wrap.getBoundingClientRect().left

// y1 = square.offsetTop + square.offsetHeight / 2

// const distance = Math.sqrt(
//   Math.pow(pageX - x1, 2) + Math.pow(pageY - screenOffset - y1, 2)
// )

// lineDivs[1].style.left = x1 + 'px'
// lineDivs[1].style.top = y1 + 'px'
// lineDivs[1].style.width = distance + 'px'

// lineDivs[1].style.transform = `rotate(${Math.atan2(
//   pageY - screenOffset - y1,
//   pageX - x1
// )}rad)`
