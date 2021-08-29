const createSectorView = () => {
  const table = document.getElementsByTagName('table')[0]
  const sectors = document.createElement('div')
  sectors.classList.add('sector-container')
  sectors.classList.add('view-container')
  table.after(sectors)
  for(let i = 0; i < 9; i++) {
    const a = document.createElement('div')
    a.classList.add('sector')
    a.innerHTML = `<span class="sector-text">${i+1}</span>`
    sectors.append(a)
  }
  sectors.style.width = table.offsetWidth + "px"
  sectors.style.height = table.offsetHeight + "px"
  sectors.style.top = table.offsetTop + "px"
  sectors.style.left = table.offsetLeft + "px"

  sectors.style.display = "none"
}

const createClockView = () => {
  const table = document.getElementsByTagName('table')[0]
  const clockViews = document.createElement('div')
  clockViews.classList.add('view-container')
  table.after(clockViews)
  clockViews.style.width = table.offsetWidth + "px"
  clockViews.style.height = table.offsetHeight + "px"
  clockViews.style.top = table.offsetTop + "px"
  clockViews.style.left = table.offsetLeft + "px"

  
  const blockSize = getBlockSize()
	const maxCoors = getMaxCoordinates()
	const minRadiuses = getMinRadiuses(center, maxCoors)
  const globalOffset = clockViews.getBoundingClientRect()

	const c1 = createClock1(maxCoors, blockSize, window.squareLength, globalOffset)
  const c2 = createClock2(window.center, minRadiuses, blockSize, window.squareLength, globalOffset)
	const c3 = createClock3()
	const c4 = createClock4()

	clockViews.append(c1)
  clockViews.append(c2)
	clockViews.append(c3)
  clockViews.append(c4)
}
