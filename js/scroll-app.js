// scrollama
// Credit: Adapted from https://github.com/calibro/scrollama-boilerplate */


// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response, id) {
  // response = { element, direction, index }

  // update graphic based on step
  d3.selectAll(id + ' .scroll-graphic-tab').attr('class', function(d,i){
    if(d3.select(this).attr('data-step') == response.index+1){
      return 'scroll-graphic-tab d-block'
    }else{
      return 'scroll-graphic-tab d-none'
    }
  })
}

function handleContainerEnter(response) {
  // response = { direction }
}

function handleContainerExit(response) {
  // response = { direction }
}


function init() {
  //setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.setup({
    container: '#scroll',
    graphic: '#scroll .scroll-graphic',
    step: '#scroll .scroll-text .step',
    debug: false,
    offset: 0.50,
  })
  .onStepEnter(function(response){
      return handleStepEnter(response,'#scroll')
    }
  )
  .onContainerEnter(handleContainerEnter)
  .onContainerExit(handleContainerExit);


  // setup resize event
  window.addEventListener('resize', handleResize);
}

// kick things off
init();
