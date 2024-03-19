function createCircles(quantity) {
  const circlesSection = document.getElementById('circlesSection')

  for (let index = 0; index < quantity; index++) {
    const circleElement = document.createElement('div')

    circleElement.classList.add('circle')
    circleElement.innerText = index + 1

    circleElement.addEventListener('click', (e) => {
      console.log(`click on ${e.target.innerText}`)
    })

    circlesSection.appendChild(circleElement)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createCircles(5)
})
