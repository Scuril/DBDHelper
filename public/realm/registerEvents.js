const registerRotate = () => {
  [...document.getElementsByClassName('rotate')].forEach(x => {
    x.onclick = (e) => {
      let r = rotate
      if ([...e.target.classList].includes('rotate-left')) {
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
        [...curr.classList].includes('sector-view') ?
          'block' :
          'none'
      
      const clockView = [...curr.classList].includes('clock-view')
      ;[...document.getElementsByClassName('clock-container')].forEach(x => x.style.display = 'none')
      if (clockView) {
        [...document.getElementsByClassName('clock-view-change')].filter(x => [...x.classList].includes('active'))[0].click()
      }
      document.getElementsByClassName('clock-view-changers')[0].style.display = 
        clockView ? 
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