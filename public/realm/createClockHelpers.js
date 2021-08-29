/**
 * Get element size in pixels
 * @param {Element} element DOM element
 * @returns {{'width': number, 'height': number}} Size
 */
const getElementSize = (element) => {
  const width = +window.getComputedStyle(element).width.replace('px', '')
  const height = +window.getComputedStyle(element).height.replace('px', '')
	return { width, height }
}

/**
 * Sets element's position based on it's center
 * @param {Element} element Element to set new position 
 */
const setElementPosCenter = (element) => {
  const size = getElementSize(element)
  
  if (size.width === 0 || size.height === 0) {
    console.warn(`Element wasn't added, but trying to reset it's position.`)
    console.warn(element)
    return
  }

  element.style.top = element.style.top.replace('px', '') - size.height / 2 + 'px'
  element.style.left = element.style.left.replace('px', '') - size.width / 2 + 'px'
}

/**
 * Get block size in pixels
 * @returns {{'width': number, 'height': number}} Size
 */
 const getBlockSize = () => {
	const firstBlock = document.getElementsByClassName('clear-area')[0]
	return getElementSize(firstBlock)
}

/**
 * Get max block's coordinates
 * @returns {{'x': number, 'y': number}} Coordinates
 */
const getMaxCoordinates = () => {
	const x = [...document.getElementsByTagName('*')].reduce((a, v) => +v.getAttribute('data-coordinate-x') > a ? +v.getAttribute('data-coordinate-x') : a, -1)
	const y = [...document.getElementsByTagName('*')].reduce((a, v) => +v.getAttribute('data-coordinate-y') > a ? +v.getAttribute('data-coordinate-y') : a, -1)
	return { x, y }
}

/**
 * Get minimal radiuses of clock based on parameters
 * @param {{'x': number, 'y': number}} center Center of the map
 * @param {{'width': number, 'height': number}} maxCoors Max coordinates of the map
 * @returns {{'horisontal': number, 'vertical': number}} Minimal radiuses of clock
 */
const getMinRadiuses = (center, maxCoors) => {
	const blocksNothing = [...document.getElementsByTagName('*')].filter(x => x.getAttribute('data-coordinate-x')).filter(x => [...x.classList].findIndex(y => y === 'nothing') !== -1)

  const horisontal = [...blocksNothing.filter(x => x.getAttribute('data-coordinate-y') == Math.floor(center.y)).map(x => Math.abs(x.getAttribute('data-coordinate-x')-center.x)),
    center.x, maxCoors.x - center.x].reduce((a, v) => a > v ? v : a, maxCoors.x * 10)
  const vertical = [...blocksNothing.filter(x => x.getAttribute('data-coordinate-x') == Math.floor(center.x)).map(x => Math.abs(x.getAttribute('data-coordinate-y')-center.y)),
    center.y, maxCoors.y - center.y].reduce((a, v) => a > v ? v : a, maxCoors.y * 10)

	return { horisontal, vertical }
}