const main = () => {
  createSectorView()
  let interval = setInterval(() => {
    if (document.getElementsByTagName('table')[0].getBoundingClientRect().top !== 0) {
      clearInterval(interval)
      createClockView()
    }
  }, 100)
  registerRotate()
  registerClockViewChangers()
  registerViewChangers()

  ;[...document.getElementsByTagName('*')].filter(x => x.getAttribute('data-coordinate-x') == Math.floor(center.x) && x.getAttribute('data-coordinate-y') == Math.floor(center.y))[0].style.background = "#000"
}
main()