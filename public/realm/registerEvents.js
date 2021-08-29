const registerRotate = () => {
  [...document.getElementsByClassName('rotate')].forEach(x => {
    x.onclick = (e) => {
      let r = rotate
      if ([...e.target.classList].findIndex(x => x === 'rotate-left') !== -1) {
        r += 3
      }
      else {
        r++
      }
      r %= 4
      
      if (r) {
        document.location.search = "?rotate=" + r
      }
      else {
        document.location.href = document.location.origin + document.location.pathname
      }
    }
  })
}

const registerViewChangers = () => {
  const viewChangers = [...document.getElementsByClassName('view-change')]
  viewChangers.forEach(x => {
    x.onclick = (e) => {
      const curr = e.target

      document.getElementsByClassName('sector-container')[0].style.display = 
        [...curr.classList].findIndex(x => x === 'sector-view') !== -1 ?
          'block' :
          'none'
      
      const clockView = [...curr.classList].findIndex(x => x === 'clock-view')
      ;[...document.getElementsByClassName('clock-container')].forEach(x => x.style.display = 'none')
      if (clockView !== -1) {
        [...document.getElementsByClassName('clock-view-change')].filter(x => [...x.classList].findIndex(y => y === 'active') !== -1)[0].click()
      }
      document.getElementsByClassName('clock-view-changers')[0].style.display = 
        clockView !== -1 ? 
          'block':
          'none'


      viewChangers.forEach(y => {
        y.classList.remove('active')
      })
      curr.classList.add('active')
    }
  })
}

const registerClockViewChangers = () => {
  const viewChangers = [...document.getElementsByClassName('clock-view-change')]
  viewChangers.forEach(x => {
    x.onclick = (e) => {
      const curr = e.target

      ;[...document.getElementsByClassName('clock-container')].forEach(x => x.style.display = 'none')

      const a = [...curr.classList].findIndex(x => x.match(/\d+/gi))
      if (a !== -1) {
        document.getElementsByClassName('clock-container')[curr.classList[a].match(/\d+/gi)[0]-1].style.display = 'block'
      }
      else {
        document.getElementsByClassName('clock-manual')[0].style.display = 'block'
      }

      viewChangers.forEach(y => {
        y.classList.remove('active')
      })
      curr.classList.add('active')
    }
  })
}