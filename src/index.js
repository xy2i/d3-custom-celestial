const config = {
  width: 1000,
  center: [0, 0, 0], // Coordinates
  location: false,
  interactive: false,
  controls: false,
  form: true,
  formFields: {
    location: false, // Set visiblity for each group of fields with the respective id
    general: false,
    stars: false,
    dsos: false,
    constellations: false,
    lines: false,
    other: false,
    download: true,
  },
  projection: 'airy',
  datapath: 'data/',
  planets: {
    show: false,
  },
  zoomlevel: 1,
  zoomextend: 1,
  stars: {
    show: true,
    names: false,
    colors: false,
    style: {
      fill: '#000',
      opacity: 1,
    },
    size: 5,
  },
  dsos: {
    show: false,
  },
  constellations: {
    names: false,
    show: true,
    color: '#000',
    linestyle: {
      stroke: 'black',
      width: 0.5,
      opacity: 1,
    },
  },
  horizon: {
    show: false,
  },
  mw: {
    show: false,
  },
  lines: {
    graticule: {
      show: true,
      stroke: '#7e838c',
      width: 0.5,
      opacity: 0.5,
      lon: {
        pos: [''],
        fill: '#fff',
        font: '10px Helvetica, Arial, sans-serif',
      },
      lat: {
        pos: [''],
        fill: '#fff',
        font: '10px Helvetica, Arial, sans-serif',
      },
    },
    equatorial: {
      show: true,
      stroke: 'black',
      width: 0.5,
      opacity: 1,
    },
    ecliptic: {
      show: false,
    },
    galactic: {
      show: false,
    },
    supergalactic: {
      show: false,
    },
  },
  background: {
    fill: 'transparent',
    opacity: 1,
    stroke: 'lightgray',
    width: 1,
  },
}

// Display map with the configuration above or any subset thereof
Celestial.display(config)

const autocomplete = new google.maps.places.Autocomplete($('#address')[0], {})

google.maps.event.addListener(autocomplete, 'place_changed', () => {
  const place = autocomplete.getPlace()
  const coords = [place.geometry.location.lat(), place.geometry.location.lng()]
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  const zenith = Celestial.getPoint(
    Celestial.horizontal.inverse(d, [90, 0], coords),
    'equatorial'
  )
  console.log(zenith)
  window.Celestial.rotate({
    center: zenith,
    horizon: false,
  })
})
