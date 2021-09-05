/**
 * Create default with callback-customization clock
 * @param {{'x': number, 'y': number}} center Center of the map
 * @param {{'horizontal': number, 'vertical': number}} radiuses Clock radiuses
 * @param {{'width': number, 'height': number}} blockPxSize Block size in px
 * @param {number} squareLength Square length in blocks count
 * @param {{'top': number, 'left': number}} globalOffset Global clock offset
 * @param {Function} digitCallback Callback that will be executed every digit creation with arguments: digit, element, top, left
 * @returns Customized clock block
 */
const createDefClock = (center, radiuses, blockPxSize, squareLength, globalOffset, digitCallback) => {
  const clockView = document.createElement('div')
  clockView.classList.add('clock-container')

  //0 - horizontal digits
  //1 - vertical digits
  for(let i = 0; i < 2; i++) {
    //0 - left/top
    //1 - right/bottom
    for(let j = 0; j < 2; j++) {
      //just digits
      for(let n = 0; n < 3; n++) {
        const digit = ((2 + i * 9 + j * 6 + n) % 12) || 12
        const a = document.createElement('div')
        a.classList.add('digit')
        a.innerHTML = `<span class="digit-text">${digit}</span>`
        clockView.append(a)

        const width = blockPxSize.width * squareLength
        const height = blockPxSize.height * squareLength
        a.style.width = width + 'px'
        a.style.height = height + 'px'

        const offset = (1 - j*2) * (n - 1) * Math.tan(Math.PI / 6)
        let top = i ?
          (center.y + radiuses.vertical) * j :
          center.y + offset * radiuses.vertical
        let left = i ?
          center.x + offset * radiuses.horizontal:
          (center.x + radiuses.horizontal) * (1 - j)

        top -= top < squareLength * 0.5 ? top : squareLength * 0.5
        left -= left < squareLength * 0.5 ? left : squareLength * 0.5
        
        top -= top % (squareLength/2)
        left -= left % (squareLength/2)

        if (digitCallback !== undefined) {
          const newPos = digitCallback(digit, top, left)
          if (newPos && newPos.top !== undefined && newPos.left !== undefined) {
            top = newPos.top
            left = newPos.left
          }
        }
        
        let block = [...document.getElementsByTagName('*')].filter(x => x.getAttribute('data-coordinate-x') == Math.floor(left) && x.getAttribute('data-coordinate-y') == Math.floor(top))[0]
        if (block === undefined) {
          console.error('Block is undefined', digit, top, left)
          continue
        }
        block = block.getBoundingClientRect()

        a.style.top = block.top - globalOffset.top + 'px'
        a.style.left = block.left - globalOffset.left + 'px'
      }
    }
  }

  clockView.style.display = "none"

  return clockView
}

const createClock1 = (maxCoors, blockPxSize, squareLength, globalOffset) => {
  const center = {
    'x': maxCoors.x / 2,
    'y': maxCoors.y / 2
  }
  const radiuses = {
    'vertical': center.y,
    'horizontal': center.x
  }
  
  return createDefClock(center, radiuses, blockPxSize, squareLength, globalOffset)
}

const createClock2 = (center, minRad, blockPxSize, squareLength, globalOffset) => {
  return createDefClock(center, minRad, blockPxSize, squareLength, globalOffset)
}

const createClock3 = () => {
  const clockView = document.createElement('div')
  clockView.classList.add('clock-container')
  clockView.style.fontSize = "128px"
  clockView.innerText = "Idi svoey dorogoy sralker"
  clockView.style.display = "none"
  return clockView
}

const createClock4 = () => {
  const clockView = document.createElement('div')
  clockView.classList.add('clock-manual')
  clockView.style.fontSize = "128px"
  clockView.innerText = "Idi svoey dorogoy sralker"
  clockView.style.display = "none"
  return clockView
}