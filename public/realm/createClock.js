/**
 * 
 * @param {{'x': number, 'y': number}} center 
 * @param {{'horisontal': number, 'vertical': number}} minRad 
 * @param {{'width': number, 'height': number}} blockSize 
 * @param {number} squareLength 
 * @returns Clock block
 */
 const createClock2 = (center, minRad, blockSize, squareLength, globalOffset) => {
  const clockView = document.createElement('div')
  clockView.classList.add('clock-container')

  console.log(globalOffset)
  //0 - horisontal digits
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

        const width = blockSize.width * squareLength
        const height = blockSize.height * squareLength
        a.style.width = width + 'px'
        a.style.height = height + 'px'

        const offset = (1 - j*2) * (n - 1) * Math.tan(Math.PI / 6)
        let top = i ?
          (center.y + minRad.vertical) * j :
          center.y + offset * minRad.vertical
        let left = i ?
          center.x + offset * minRad.horisontal:
          (center.x + minRad.horisontal) * (1 - j)


        console.log(digit, top, left)
        top -= top < squareLength * 0.5 ? top : squareLength * 0.5
        left -= left < squareLength * 0.5 ? left : squareLength * 0.5
        
        top -= top % (squareLength/2)
        left -= left % (squareLength/2)

        let block = [...document.getElementsByTagName('*')].filter(x => x.getAttribute('data-coordinate-x') == Math.floor(left) && x.getAttribute('data-coordinate-y') == Math.floor(top))[0]
        block = block.getBoundingClientRect()

        a.style.top = block.top - globalOffset.top + 'px'
        a.style.left = block.left - globalOffset.left + 'px'
      }
    }
  }

  clockView.style.display = "none"

  return clockView
}