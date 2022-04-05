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
  responsiveSlides: true,
  responsiveWidth: 900,

  // onLeave: function (origin, destination, direction) {
  //   console.log('1')
  // },
  afterLoad: function (origin, destination, direction) {
    if (destination.index < 2) {
      var videoElement = document.getElementById('video');
      videoElement.play()
    }
  },
  // afterRender: function () {
  //   console.log('3')
  // },
  // afterResize: function (width, height) {
  //   console.log('4')
  // },
  // afterReBuild: function () {
  //   console.log('5')
  // },
  // afterResponsive: function (isResponsive) {
  //   console.log('6')
  // },
  // afterSlideLoad: function (section, origin, destination, direction) {
  //   console.log('7')
  // },
  // onSlideLeave: function (section, origin, destination, direction) {
  //   console.log('8')
  // }
});

//methods
// fullpage_api.setAllowScrolling(true);