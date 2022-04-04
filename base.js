new fullpage('#fullpage', {
  //options here
  // autoScrolling: true,
  scrollHorizontally: true,
  // continuousHorizontal: true,
  navigation: true,
  // slidesNavigation: true,
  // afterSlideLoad: function (section, origin, destination, direction) { }
  // navigationTooltips: ['Who we are', 'Our team', 'Lorem', 'Ipsum'],
  // showActiveTooltip: true,
  afterSlideLoad: function (section, origin, destination, direction) {
    console.log({
      section: section,
      origin: origin,
      destination: destination,
      direction: direction
    });
  },
  onSlideLeave: function (section, origin, destination, direction) {
    console.log({
      section: section,
      origin: origin,
      destination: destination,
      direction: direction
    });
  }
});

//methods
// fullpage_api.setAllowScrolling(true);